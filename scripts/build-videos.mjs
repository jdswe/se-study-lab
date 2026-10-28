// Renders the one-minute concept videos, one MP4 per language, from the video
// scripts in the content (Week.videos). Pipeline per video and language:
//   1. draw one frame per scene (SVG → PNG with headless Chrome),
//   2. narrate each scene with ElevenLabs text-to-speech (cached on disk),
//   3. animate each frame with a slow zoom and soft fades (ffmpeg),
//   4. join the scenes, mix in quiet background music, write captions (WebVTT).
//
// Usage:
//   npm run videos                 all videos, both languages (needs ELEVENLABS_API_KEY)
//   npm run videos -- --dry-run    no API calls: silent narration, preview in .cache/videos-preview
//   npm run videos -- --only=video-git-areas --locale=es
//
// The API key is read from the environment or from .env.local (never committed).
// Optional: ELEVENLABS_VOICE_EN / ELEVENLABS_VOICE_ES to force specific voices.
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const ONLY = argv.find((a) => a.startsWith('--only='))?.split('=')[1];
const LOCALES = (argv.find((a) => a.startsWith('--locale='))?.split('=')[1] ?? 'en,es,pt').split(',');
const CHROME = process.env.CHROME_BIN || 'google-chrome';
const WORK = join(ROOT, '.cache/videos');
const TTS_CACHE = join(ROOT, '.cache/elevenlabs');
const OUT = DRY ? join(ROOT, '.cache/videos-preview') : join(ROOT, 'public/media');
const MANIFEST = join(ROOT, 'src/content/generated/videoManifest.json');

const W = 1280;
const H = 720;
const FPS = 30;
const LEAD_IN = 0.45; // seconds of silence before each scene's narration
const TAIL = 0.6; // seconds after it

// Warm, friendly delivery: a little more expressive than the defaults, slightly slower.
const MODEL = 'eleven_multilingual_v2';
const VOICE_SETTINGS = { stability: 0.45, similarity_boost: 0.8, style: 0.3, use_speaker_boost: true, speed: 0.95 };
const MUSIC_PROMPT = 'Warm, gentle lo-fi background for a friendly study video: soft piano, light acoustic guitar, mellow pads, relaxed slow tempo, instrumental, no vocals, unobtrusive.';

const C = { ink: '#1F2A36', soft: '#4E5A66', faint: '#7A828C', cream: '#F6F2EA', paper: '#FFFDF8', sand: '#EEE7D8', line: '#DDD3C0',
  teal: '#2F6F73', sage: '#5E8C7A', terracotta: '#C0704F', mauve: '#7A6A8C', ochre: '#B98A3E', navy: '#3A4E74' };
const LANES = [C.teal, C.terracotta, C.navy, C.mauve, C.sage, C.ochre];

// ---------- environment ----------
function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const p = join(ROOT, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
}

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: ['ignore', 'ignore', 'pipe'] });
}

function duration(file) {
  return Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' }).trim());
}

const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 24);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pick = (loc) => (t) => t[loc] ?? t.en;

// ---------- ElevenLabs ----------
const API = 'https://api.elevenlabs.io/v1';

async function api(path, init = {}) {
  const res = await fetch(API + path, { ...init, headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY, ...(init.headers ?? {}) } });
  if (!res.ok) throw new Error(`ElevenLabs ${path} → ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res;
}

/** Scores voices for a warm, friendly, conversational sound in the target language. */
function chooseVoice(voices, loc) {
  const forced = process.env[`ELEVENLABS_VOICE_${loc.toUpperCase()}`];
  if (forced) return voices.find((v) => v.voice_id === forced) ?? { voice_id: forced, name: forced };
  const spanish = /spanish|español|espanol|latin|mexic|colombia|castilian|argentin|chile|peru/;
  const scored = voices.map((v) => {
    const text = [v.name, v.description, ...Object.values(v.labels ?? {})].join(' ').toLowerCase();
    let score = 0;
    if (/friendly|warm|conversational|casual|soft|calm|gentle|pleasant/.test(text)) score += 4;
    if (/narrat|educat|informative|social|conversation/.test(text)) score += 2;
    if (/deep|intense|dramatic|news|announcer|authoritative|serious|villain|whisper/.test(text)) score -= 3;
    const isSpanish = spanish.test(text) || v.labels?.language === 'es';
    const isPortuguese = /portugu|brazil|brasil/.test(text) || v.labels?.language === 'pt';
    const native = loc === 'es' ? isSpanish : loc === 'pt' ? isPortuguese : !isSpanish && !isPortuguese;
    if (loc === 'en') score += isSpanish || isPortuguese ? -4 : /american|british|english/.test(text) ? 1 : 0;
    else score += native ? 6 : 0;
    return { v, score, isSpanish: native };
  }).sort((a, b) => b.score - a.score);
  const best = scored[0];
  if (loc !== 'en' && !best.isSpanish) {
    console.warn(`  No native ${loc === 'es' ? 'Spanish' : 'Portuguese'} voice in your account; the multilingual model will use the best friendly voice found. Add one from the Voice Library or set ELEVENLABS_VOICE_${loc.toUpperCase()}.`);
  }
  return best.v;
}

async function narrate(text, voiceId, loc) {
  mkdirSync(TTS_CACHE, { recursive: true });
  const file = join(TTS_CACHE, `${sha([MODEL, voiceId, loc, JSON.stringify(VOICE_SETTINGS), text].join('|'))}.mp3`);
  if (existsSync(file)) return file; // cached: no credits spent
  const res = await api(`/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({ text, model_id: MODEL, voice_settings: VOICE_SETTINGS }),
  });
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

function silence(text, file) {
  const seconds = Math.max(2.5, text.split(/\s+/).length / 2.4); // ~144 words per minute
  run('ffmpeg', ['-y', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-t', seconds.toFixed(2), '-q:a', '9', file]);
  return file;
}

/** A soft two-chord pad, synthesised locally. Used when the music API is unavailable. */
function synthPad(seconds, file) {
  const chord = (f) => f.map((hz, i) => `${(0.05 - i * 0.008).toFixed(3)}*sin(2*PI*${hz}*t)`).join('+');
  const a = chord([261.63, 329.63, 392.0, 493.88]); // Cmaj7
  const b = chord([220.0, 261.63, 329.63, 392.0]); // Am7
  const expr = `(0.5+0.5*sin(2*PI*t/16))*(${a})+(0.5-0.5*sin(2*PI*t/16))*(${b})`;
  run('ffmpeg', ['-y', '-f', 'lavfi', '-i', `aevalsrc='${expr}|${expr}':s=44100:d=${seconds}`,
    '-af', 'lowpass=f=1600,aecho=0.8:0.7:60:0.25,volume=0.9', '-q:a', '5', file]);
  return file;
}

async function backgroundMusic(seconds) {
  mkdirSync(TTS_CACHE, { recursive: true });
  const file = join(TTS_CACHE, `music-${sha(MUSIC_PROMPT + seconds)}.mp3`);
  if (existsSync(file)) return file;
  if (!DRY) {
    try {
      const res = await api('/music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
        body: JSON.stringify({ prompt: MUSIC_PROMPT, music_length_ms: seconds * 1000 }),
      });
      writeFileSync(file, Buffer.from(await res.arrayBuffer()));
      console.log('  Background music generated with ElevenLabs.');
      return file;
    } catch (err) {
      console.warn(`  Music API unavailable (${err.message.split('\n')[0]}). Using a soft synthesised pad instead.`);
    }
  }
  return synthPad(seconds, join(WORK, `pad-${seconds}.mp3`));
}

// ---------- frames ----------
function txt(x, y, s, size, opts = '') {
  return `<text x="${x}" y="${y}" font-size="${size}" font-family="Poppins, Arial, sans-serif" ${opts}>${esc(s)}</text>`;
}

function visualSvg(v, loc, headline) {
  const l = (en, es, pt) => ({ en, es, pt })[loc] ?? en;
  const mid = (x, y, s, size, extra = '') => txt(x, y, s, size, `text-anchor="middle" ${extra}`);
  switch (v.kind) {
    case 'title': {
      const ribbon = [0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${240 + i * 133}" cy="560" r="16" fill="${C.paper}" stroke="${LANES[i % LANES.length]}" stroke-width="6"/>`).join('');
      return `<path d="M 240 560 L 1040 560" stroke="${C.line}" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round"/>${ribbon}`
        + mid(640, 380, headline, 76, `font-weight="800" fill="${C.ink}"`);
    }
    case 'timeline': {
      const slots = 6;
      let out = `<path d="M 170 420 L 1110 420" stroke="${C.line}" stroke-width="6" stroke-linecap="round"/>`;
      out += `<path d="M 170 420 L ${170 + (Math.max(1, v.commits) - 1) * 188} 420" stroke="${C.teal}" stroke-width="8" stroke-linecap="round"/>`;
      for (let i = 0; i < slots; i++) {
        const x = 170 + i * 188;
        const done = i < v.commits;
        const hl = v.highlight === i;
        if (hl) out += `<circle cx="${x}" cy="420" r="44" fill="none" stroke="${C.terracotta}" stroke-width="5" stroke-opacity="0.45"/>`;
        out += `<circle cx="${x}" cy="420" r="${done ? 26 : 18}" fill="${done ? C.paper : C.cream}" stroke="${hl ? C.terracotta : done ? C.teal : C.line}" stroke-width="${done ? 8 : 4}" ${done ? '' : 'stroke-dasharray="6 6"'}/>`;
        if (done) out += mid(x, 500, ['a1f3', '9c2e', '47bd', 'e05a', '3f81', 'b62c'][i], 24, `font-family="monospace" fill="${C.faint}"`);
      }
      if (v.commits > 0) out += `<rect x="${170 + (v.commits - 1) * 188 - 54}" y="318" width="108" height="40" rx="20" fill="${C.teal}"/>` + mid(170 + (v.commits - 1) * 188, 346, 'main', 22, `font-weight="700" fill="${C.paper}"`);
      return out;
    }
    case 'distributed': {
      let out = `<rect x="500" y="250" width="280" height="120" rx="60" fill="${C.sand}" stroke="${C.teal}" stroke-width="5"/>` + mid(640, 322, 'GitHub', 34, `font-weight="700" fill="${C.ink}"`);
      [[220, 520], [640, 560], [1060, 520]].forEach(([x, y], i) => {
        out += `<path d="M ${x} ${y - 60} L 640 375" stroke="${LANES[i]}" stroke-width="4" stroke-dasharray="10 10"/>`;
        out += `<rect x="${x - 120}" y="${y - 60}" width="240" height="120" rx="18" fill="${C.paper}" stroke="${LANES[i]}" stroke-width="5"/>`;
        out += [0, 1, 2, 3].map((j) => `<circle cx="${x - 75 + j * 50}" cy="${y}" r="11" fill="${C.paper}" stroke="${LANES[i]}" stroke-width="5"/>`).join('');
        out += `<path d="M ${x - 75} ${y} L ${x + 75} ${y}" stroke="${LANES[i]}" stroke-width="3"/>`;
        out += mid(x, y + 92, l(['Ana', 'Luis', 'You'][i], ['Ana', 'Luis', 'Tú'][i], ['Ana', 'Luis', 'Você'][i]), 24, `font-weight="600" fill="${C.soft}"`);
      });
      return out;
    }
    case 'areas': {
      const names = [l('Working directory', 'Directorio de trabajo', 'Diretório de trabalho'), l('Staging area', 'Área de preparación', 'Área de preparação'), l('Repository', 'Repositorio', 'Repositório')];
      const subs = [l('files you edit', 'archivos que editas', 'arquivos que você edita'), l('next snapshot', 'próxima instantánea', 'próxima fotografia'), l('history (.git)', 'historial (.git)', 'histórico (.git)')];
      let out = '';
      names.forEach((n, i) => {
        const x = 70 + i * 400;
        const on = v.active === i;
        out += `<rect x="${x}" y="300" width="340" height="200" rx="28" fill="${on ? LANES[i] : C.paper}" stroke="${LANES[i]}" stroke-width="6"/>`;
        out += mid(x + 170, 392, n, 30, `font-weight="700" fill="${on ? C.paper : C.ink}"`);
        out += mid(x + 170, 440, subs[i], 24, `fill="${on ? C.paper : C.soft}"`);
      });
      [['git add', 410, v.arrow === 'add'], ['git commit', 810, v.arrow === 'commit']].forEach(([label, x, on]) => {
        out += `<path d="M ${x} 400 L ${x + 60} 400" stroke="${on ? C.terracotta : C.faint}" stroke-width="${on ? 8 : 4}" marker-end="url(#arrow)"/>`;
        out += mid(x + 30, 560, label, 28, `font-family="monospace" font-weight="700" fill="${on ? C.terracotta : C.faint}"`);
      });
      return out;
    }
    case 'branch': {
      const y1 = 360;
      const y2 = 540;
      const s = v.step;
      let out = `<path d="M 140 ${y1} L ${s >= 3 ? 860 : 380} ${y1}" stroke="${C.teal}" stroke-width="9" fill="none"/>`;
      if (s >= 2) out += `<path d="M 380 ${y1} C 450 ${y1}, 470 ${y2}, 560 ${y2} L 760 ${y2}" stroke="${C.terracotta}" stroke-width="9" fill="none"/>`;
      if (s >= 4) out += `<path d="M 760 ${y2} C 880 ${y2}, 900 ${y1}, 1040 ${y1} M 860 ${y1} L 1040 ${y1}" stroke="${C.terracotta}" stroke-width="9" fill="none"/><path d="M 860 ${y1} L 1040 ${y1}" stroke="${C.teal}" stroke-width="9"/>`;
      const dot = (x, y, c, r = 22) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.paper}" stroke="${c}" stroke-width="8"/>`;
      out += dot(140, y1, C.teal) + dot(260, y1, C.teal) + dot(380, y1, C.teal);
      if (s >= 2) out += dot(560, y2, C.terracotta) + dot(760, y2, C.terracotta);
      if (s >= 3) out += dot(860, y1, C.teal);
      if (s >= 4) out += dot(1040, y1, C.teal, 28) + `<circle cx="1040" cy="${y1}" r="10" fill="${C.teal}"/>`;
      const mainX = s >= 4 ? 1040 : s >= 3 ? 860 : 380;
      out += `<rect x="${mainX - 60}" y="${y1 - 92}" width="120" height="42" rx="21" fill="${C.teal}"/>` + mid(mainX, y1 - 63, 'main', 24, `font-weight="700" fill="${C.paper}"`);
      if (s >= 1) {
        const fx = s >= 2 ? 760 : 380;
        const fy = s >= 2 ? y2 + 60 : y1 + 50;
        out += `<rect x="${fx - 75}" y="${fy}" width="150" height="42" rx="21" fill="${C.paper}" stroke="${C.terracotta}" stroke-width="4"/>` + mid(fx, fy + 29, 'feature', 24, `font-weight="700" fill="${C.terracotta}"`);
      }
      return out;
    }
    case 'pipeline': {
      const items = v.set === 'lifecycle'
        ? [l('Requirements', 'Requisitos', 'Requisitos'), l('Design', 'Diseño', 'Design'), l('Code', 'Código', 'Código'), l('Tests', 'Pruebas', 'Testes'), l('Release', 'Entrega', 'Entrega'), l('Maintain', 'Mantener', 'Manter')]
        : [l('Inception', 'Inicio', 'Concepção'), l('Elicitation', 'Obtención', 'Elicitação'), l('Elaboration', 'Elaboración', 'Elaboração'), l('Negotiation', 'Negociación', 'Negociação'), l('Specification', 'Especificación', 'Especificação'), l('Validation', 'Validación', 'Validação')];
      let out = '';
      items.forEach((name, i) => {
        const x = 50 + i * 200;
        const on = v.active.includes(i);
        const c = LANES[i % LANES.length];
        out += `<rect x="${x}" y="330" width="180" height="150" rx="26" fill="${on ? c : C.paper}" stroke="${c}" stroke-width="6" ${on ? '' : 'opacity="0.75"'}/>`;
        out += mid(x + 90, 400, String(i + 1), 34, `font-weight="800" fill="${on ? C.paper : c}"`);
        out += mid(x + 90, 445, name, name.length > 12 ? 19 : 22, `font-weight="700" fill="${on ? C.paper : C.ink}"`);
        if (i < items.length - 1) out += `<path d="M ${x + 184} 405 L ${x + 196} 405" stroke="${C.faint}" stroke-width="4"/>`;
      });
      if (v.set === 'lifecycle') out += `<path d="M 1130 500 C 1130 610, 140 610, 140 500" fill="none" stroke="${C.line}" stroke-width="5" stroke-dasharray="10 12" marker-end="url(#arrow)"/>`;
      return out;
    }
    case 'split': {
      const card = (x, title, sub, example, c, shown) => shown
        ? `<rect x="${x}" y="260" width="520" height="330" rx="30" fill="${C.paper}" stroke="${c}" stroke-width="6"/><rect x="${x}" y="260" width="520" height="70" rx="30" fill="${c}"/><rect x="${x}" y="300" width="520" height="30" fill="${c}"/>`
          + txt(x + 36, 307, title, 32, `font-weight="800" fill="${C.paper}"`) + txt(x + 36, 385, sub, 26, `font-weight="600" fill="${c}"`)
          + `<foreignObject x="${x + 36}" y="410" width="450" height="160"><div xmlns="http://www.w3.org/1999/xhtml" style="font:400 26px Poppins,Arial;color:${C.ink};line-height:1.35">${esc(example)}</div></foreignObject>`
        : `<rect x="${x}" y="260" width="520" height="330" rx="30" fill="none" stroke="${C.line}" stroke-width="4" stroke-dasharray="12 12"/>` + txt(x + 260, 440, '?', 90, `text-anchor="middle" font-weight="800" fill="${C.line}"`);
      return card(90, l('Functional', 'Funcional', 'Funcional'), l('behaviour', 'comportamiento', 'comportamento'), l('"The system emails a receipt after each payment."', '"El sistema envía un recibo por correo tras cada pago."', '"O sistema envia um recibo por e-mail após cada pagamento."'), C.teal, true)
        + card(670, l('Non-functional', 'No funcional', 'Não funcional'), l('quality + measure', 'cualidad + medida', 'qualidade + medida'), l('"A page loads in under 2 s with 500 users online."', '"Una página carga en menos de 2 s con 500 usuarios."', '"Uma página carrega em menos de 2 s com 500 usuários."'), C.terracotta, v.reveal >= 2);
    }
    case 'files': {
      const progs = [l('Sales', 'Ventas', 'Vendas'), l('Billing', 'Facturación', 'Faturamento'), l('Shipping', 'Envíos', 'Entregas')];
      let out = '';
      progs.forEach((name, i) => {
        const y = 270 + i * 120;
        const stale = v.step === 1 && i === 1;
        out += `<rect x="90" y="${y}" width="230" height="84" rx="22" fill="${C.paper}" stroke="${C.teal}" stroke-width="5"/>` + mid(205, y + 52, name, 28, `font-weight="700" fill="${C.ink}"`);
        if (v.step < 2) {
          out += `<path d="M320 ${y + 42} L420 ${y + 42}" stroke="${C.faint}" stroke-width="4"/>`;
          out += `<rect x="420" y="${y}" width="300" height="84" rx="10" fill="${stale ? '#F6E3DE' : C.paper}" stroke="${stale ? C.terracotta : C.line}" stroke-width="5"/>`;
          out += txt(445, y + 52, `Ana · ${stale ? '555-0100' : v.step === 1 ? '555-0199' : '555-0100'}`, 26, `font-family="monospace" fill="${stale ? C.terracotta : C.ink}"`);
        } else {
          out += `<path d="M320 ${y + 42} C 520 ${y + 42}, 640 390, 820 390" fill="none" stroke="${C.teal}" stroke-width="5"/>`;
        }
      });
      if (v.step === 1) out += mid(980, 400, '≠', 140, `font-weight="800" fill="${C.terracotta}"`);
      if (v.step === 2) out += `<rect x="820" y="310" width="330" height="170" rx="34" fill="${C.teal}"/>` + mid(985, 385, l('DBMS', 'SGBD', 'SGBD'), 44, `font-weight="800" fill="${C.paper}"`) + mid(985, 435, 'Ana · 555-0199', 26, `font-family="monospace" fill="${C.paper}"`);
      return out;
    }
    case 'tables': {
      const table = (x, y, title, header, rows, keyCol, fkCol, hl) => {
        let out = `<rect x="${x}" y="${y}" width="${header.length * 170}" height="${56 + rows.length * 48}" rx="18" fill="${C.paper}" stroke="${hl ? C.terracotta : C.teal}" stroke-width="5"/>`;
        out += txt(x, y - 16, title, 26, `font-weight="800" fill="${C.teal}"`);
        header.forEach((h, j) => {
          const isKey = j === keyCol, isFk = j === fkCol;
          out += txt(x + 20 + j * 170, y + 38, `${isKey ? '🔑 ' : isFk ? '↗ ' : ''}${h}`, 22, `font-weight="700" fill="${isKey ? C.teal : isFk ? C.ochre : C.ink}" font-family="monospace"`);
        });
        rows.forEach((r, i) => r.forEach((c, j) => { out += txt(x + 20 + j * 170, y + 92 + i * 48, String(c), 24, `font-family="monospace" fill="${C.ink}"`); }));
        return out;
      };
      const s2 = v.step;
      let out = table(70, 270, l('CUSTOMER', 'CLIENTE', 'CLIENTE'), ['id', l('name', 'nombre', 'nome')], [[1, 'Ana'], [2, 'Luis']], s2 >= 1 ? 0 : -1, -1, s2 === 1);
      if (s2 >= 2) {
        out += table(520, 270, l('ORDERS', 'PEDIDO', 'PEDIDO'), ['id', l('customer_id', 'id_cliente', 'id_cliente')], [[101, 1], [102, 2], [103, 1]], 0, 1, s2 === 2);
        out += `<path d="M410 370 C 460 370, 470 420, 520 420" fill="none" stroke="${C.ochre}" stroke-width="5"/>` + mid(465, 360, '1:N', 24, `font-weight="800" fill="${C.ochre}"`);
      }
      if (s2 >= 3) {
        out += table(880, 270, l('ORDER_ITEM', 'DETALLE', 'ITEM'), [l('order', 'pedido', 'pedido'), l('product', 'producto', 'produto')], [[101, 10], [101, 20], [103, 40]], -1, 0, true);
      }
      return out;
    }
    case 'transaction': {
      const steps = ['BEGIN', l('order', 'pedido', 'pedido'), l('item', 'artículo', 'item'), l('stock', 'inventario', 'estoque'), v.failed ? 'ROLLBACK' : 'COMMIT'];
      let out = '';
      steps.forEach((name, i) => {
        const x = 80 + i * 230;
        const done = i <= v.step;
        const isEnd = i === 4;
        const color = isEnd ? (v.failed ? C.terracotta : C.sage) : C.teal;
        const failedHere = v.failed && i === 3;
        out += `<rect x="${x}" y="320" width="190" height="130" rx="26" fill="${done ? (failedHere ? '#F6E3DE' : color) : C.paper}" stroke="${failedHere ? C.terracotta : color}" stroke-width="6" ${done ? '' : 'stroke-dasharray="12 10"'}/>`;
        out += mid(x + 95, 397, name, name.length > 8 ? 24 : 30, `font-weight="800" fill="${done && !failedHere ? C.paper : failedHere ? C.terracotta : C.faint}"`);
        if (failedHere) out += mid(x + 95, 300, '✗', 60, `font-weight="800" fill="${C.terracotta}"`);
        if (i < 4) out += `<path d="M${x + 192} 385 L${x + 228} 385" stroke="${C.faint}" stroke-width="5"/>`;
      });
      if (v.failed) out += `<path d="M 1060 470 C 1060 600, 175 600, 175 470" fill="none" stroke="${C.terracotta}" stroke-width="5" stroke-dasharray="14 10" marker-end="url(#arrow)"/>`;
      return out;
    }
    default:
      return '';
  }
}

function frameSvg(video, scene, index, total, loc) {
  const p = pick(loc);
  const headline = p(scene.onScreen);
  const isTitle = scene.visual.kind === 'title';
  const dots = Array.from({ length: total }, (_, i) => `<circle cx="${640 - (total - 1) * 14 + i * 28}" cy="680" r="${i === index ? 7 : 5}" fill="${i === index ? C.teal : C.line}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <radialGradient id="g1" cx="0.1" cy="0" r="0.9"><stop offset="0" stop-color="#E6EEEA"/><stop offset="1" stop-color="${C.cream}"/></radialGradient>
  <radialGradient id="g2" cx="1" cy="1" r="0.7"><stop offset="0" stop-color="#F4E7DF"/><stop offset="1" stop-color="${C.cream}" stop-opacity="0"/></radialGradient>
  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.faint}"/></marker>
</defs>
<rect width="${W}" height="${H}" fill="url(#g1)"/><rect width="${W}" height="${H}" fill="url(#g2)"/>
${txt(60, 70, `SE Study Lab · ${p(video.title)}`, 22, `font-weight="600" fill="${C.faint}"`)}
${isTitle ? '' : `${txt(60, 170, headline, 52, `font-weight="800" fill="${C.ink}"`)}<rect x="60" y="192" width="90" height="7" rx="3.5" fill="${C.terracotta}"/>`}
${visualSvg(scene.visual, loc, headline)}
${dots}
</svg>`;
}

function renderPng(svg, file) {
  const html = join(WORK, `frame-${sha(svg)}.html`);
  writeFileSync(html, `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=block" rel="stylesheet"><style>html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden}</style></head><body>${svg}</body></html>`);
  run(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=8000', `--window-size=${W},${H}`, `--screenshot=${file}`, pathToFileURL(html).href]);
}

// ---------- assembly ----------
function sceneClip(png, audio, seconds, file) {
  const frames = Math.round(seconds * FPS);
  const vf = [
    `scale=${W * 2}:${H * 2}`,
    `zoompan=z='1+0.035*on/${frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${W}x${H}:fps=${FPS}`,
    `fade=t=in:st=0:d=0.35:color=0xF6F2EA`,
    `fade=t=out:st=${(seconds - 0.35).toFixed(2)}:d=0.35:color=0xF6F2EA`,
    'format=yuv420p',
  ].join(',');
  const ms = Math.round(LEAD_IN * 1000);
  run('ffmpeg', ['-y', '-loop', '1', '-framerate', String(FPS), '-t', seconds.toFixed(3), '-i', png, '-i', audio,
    '-filter_complex', `[0:v]${vf}[v];[1:a]adelay=${ms}|${ms},apad,atrim=0:${seconds.toFixed(3)},aformat=sample_rates=44100:channel_layouts=stereo[a]`,
    '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '24', '-c:a', 'aac', '-b:a', '128k', '-t', seconds.toFixed(3), file]);
}

const vttTime = (s) => {
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = (s % 60).toFixed(3).padStart(6, '0');
  return `${h}:${m}:${sec}`;
};

async function renderVideo(video, loc, voice) {
  const p = pick(loc);
  const dir = join(WORK, video.id, loc);
  mkdirSync(dir, { recursive: true });
  mkdirSync(join(OUT, loc), { recursive: true });
  const clips = [];
  const cues = [];
  let t = 0;
  for (const [i, scene] of video.scenes.entries()) {
    const png = join(dir, `scene-${i}.png`);
    renderPng(frameSvg(video, scene, i, video.scenes.length, loc), png);
    const text = p(scene.narration);
    const audio = DRY ? silence(text, join(dir, `silence-${i}.mp3`)) : await narrate(text, voice.voice_id, loc);
    const spoken = duration(audio);
    const seconds = Math.max(3.5, LEAD_IN + spoken + TAIL);
    const clip = join(dir, `clip-${i}.mp4`);
    sceneClip(png, audio, seconds, clip);
    clips.push(clip);
    cues.push(`${vttTime(t + LEAD_IN)} --> ${vttTime(t + LEAD_IN + spoken)}\n${text}`);
    t += seconds;
  }
  const list = join(dir, 'list.txt');
  writeFileSync(list, clips.map((c) => `file '${c.replace(/'/g, "'\\''")}'`).join('\n'));
  const joined = join(dir, 'joined.mp4');
  run('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', joined]);

  const total = duration(joined);
  const music = await backgroundMusic(Math.ceil(total) + 2);
  const out = join(OUT, loc, `${video.id}.mp4`);
  run('ffmpeg', ['-y', '-i', joined, '-stream_loop', '-1', '-i', music, '-filter_complex',
    `[1:a]volume=0.12,afade=t=in:st=0:d=1.5,afade=t=out:st=${(total - 2.5).toFixed(2)}:d=2.5[m];[0:a][m]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[a]`,
    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '128k', '-t', total.toFixed(3), '-movflags', '+faststart', out]);
  writeFileSync(join(OUT, loc, `${video.id}.vtt`), `WEBVTT\n\n${cues.join('\n\n')}\n`);
  run('ffmpeg', ['-y', '-i', join(dir, 'scene-0.png'), '-q:v', '4', join(OUT, loc, `${video.id}.jpg`)]);
  return { duration: Math.round(total), bytes: statSync(out).size };
}

// ---------- main ----------
loadEnv();
if (!DRY && !process.env.ELEVENLABS_API_KEY) {
  console.error('ELEVENLABS_API_KEY is not set. Put it in .env.local (never committed), or run with --dry-run for a silent preview.');
  process.exit(1);
}
mkdirSync(WORK, { recursive: true });
await build({ entryPoints: [join(ROOT, 'src/content/index.ts')], bundle: true, platform: 'node', format: 'esm', outfile: join(WORK, 'content.mjs'), logLevel: 'error' });
const { weeks } = await import(pathToFileURL(join(WORK, 'content.mjs')).href + `?t=${Date.now()}`);

let voices = [];
if (!DRY) voices = (await (await api('/voices')).json()).voices ?? [];

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
for (const loc of LOCALES) {
  const voice = DRY ? { voice_id: 'dry-run', name: 'silent preview' } : chooseVoice(voices, loc);
  console.log(`[${loc}] voice: ${voice.name} (${voice.voice_id})`);
  for (const week of weeks) {
    for (const video of week.videos ?? []) {
      if (ONLY && video.id !== ONLY) continue;
      const info = await renderVideo(video, loc, voice);
      console.log(`  ${video.id}: ${info.duration}s, ${(info.bytes / 1e6).toFixed(1)} MB`);
      if (!DRY) manifest[video.id] = { ...(manifest[video.id] ?? {}), [loc]: info };
    }
  }
}
if (!DRY) {
  mkdirSync(join(ROOT, 'src/content/generated'), { recursive: true });
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  console.log('Updated src/content/generated/videoManifest.json');
} else {
  console.log(`Preview written to ${OUT}`);
}
