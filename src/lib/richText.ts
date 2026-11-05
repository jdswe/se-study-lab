/**
 * Light markup for content strings, shared by the site and the document
 * generator:
 *   $…$    inline math (TeX), using pandoc's rules so prices like "$12 or $15"
 *          stay plain text: the opening $ must be followed by a non-space, the
 *          closing $ must follow a non-space and must not be followed by a digit.
 *   $$…$$  display math.
 *   `…`    inline code.
 *   **…**  bold.
 *   \$     a literal dollar sign.
 */
export type RichToken =
  | { kind: 'text'; value: string }
  | { kind: 'math'; value: string }
  | { kind: 'display'; value: string }
  | { kind: 'code'; value: string }
  | { kind: 'bold'; value: string };

export function tokenizeRich(src: string): RichToken[] {
  const out: RichToken[] = [];
  let buf = '';
  const flush = () => {
    if (buf) out.push({ kind: 'text', value: buf });
    buf = '';
  };
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '\\' && src[i + 1] === '$') {
      buf += '$';
      i += 2;
      continue;
    }
    if (c === '$' && src[i + 1] === '$') {
      const end = src.indexOf('$$', i + 2);
      if (end > i + 2) {
        flush();
        out.push({ kind: 'display', value: src.slice(i + 2, end).trim() });
        i = end + 2;
        continue;
      }
    }
    if (c === '$' && src[i + 1] && !/\s/.test(src[i + 1])) {
      let j = i + 1;
      let end = -1;
      while (j < src.length) {
        if (src[j] === '\\') { j += 2; continue; }
        if (src[j] === '$') {
          if (!/\s/.test(src[j - 1]) && !/\d/.test(src[j + 1] ?? '')) end = j;
          break;
        }
        j++;
      }
      if (end > i + 1) {
        flush();
        out.push({ kind: 'math', value: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    if (c === '`') {
      const end = src.indexOf('`', i + 1);
      if (end > i + 1) {
        flush();
        out.push({ kind: 'code', value: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    if (c === '*' && src[i + 1] === '*') {
      const end = src.indexOf('**', i + 2);
      if (end > i + 2) {
        flush();
        out.push({ kind: 'bold', value: src.slice(i + 2, end) });
        i = end + 2;
        continue;
      }
    }
    buf += c;
    i++;
  }
  flush();
  return out;
}

const SYMBOLS: Record<string, string> = {
  le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', approx: '≈', pm: '±', mp: '∓', cdot: '·', times: '×', div: '÷',
  to: '→', rightarrow: '→', leftarrow: '←', Rightarrow: '⇒', Leftarrow: '⇐', leftrightarrow: '↔', Leftrightarrow: '⇔', iff: '⇔', implies: '⇒', mapsto: '↦',
  neg: '¬', lnot: '¬', land: '∧', wedge: '∧', lor: '∨', vee: '∨', oplus: '⊕', top: '⊤', bot: '⊥', vdash: '⊢', models: '⊨',
  forall: '∀', exists: '∃', in: '∈', notin: '∉', subset: '⊂', subseteq: '⊆', supset: '⊃', supseteq: '⊇', cup: '∪', cap: '∩', emptyset: '∅', varnothing: '∅', setminus: '∖',
  infty: '∞', pi: 'π', alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', Delta: 'Δ', theta: 'θ', lambda: 'λ', mu: 'μ', sigma: 'σ', Sigma: 'Σ', phi: 'φ', omega: 'ω', varepsilon: 'ε', epsilon: 'ε',
  sum: 'Σ', prod: 'Π', int: '∫', partial: '∂', nabla: '∇', circ: '∘', equiv: '≡', mid: '|', ldots: '…', cdots: '⋯', dots: '…', quad: ' ', qquad: '  ',
  lfloor: '⌊', rfloor: '⌋', lceil: '⌈', rceil: '⌉', langle: '⟨', rangle: '⟩', sim: '∼', propto: '∝', angle: '∠', degree: '°',
};
/** Symbols written next to what follows them; every other symbol gets a space on each side. */
const UNARY = new Set(['neg', 'lnot', 'forall', 'exists', 'infty', 'pi', 'alpha', 'beta', 'gamma', 'delta', 'Delta', 'theta', 'lambda', 'mu', 'sigma', 'Sigma', 'phi', 'omega', 'varepsilon', 'epsilon', 'sum', 'prod', 'int', 'partial', 'nabla', 'emptyset', 'varnothing', 'ldots', 'cdots', 'dots', 'quad', 'qquad', 'lfloor', 'rfloor', 'lceil', 'rceil', 'langle', 'rangle', 'angle', 'degree', 'top', 'bot']);
const BB: Record<string, string> = { R: 'ℝ', N: 'ℕ', Z: 'ℤ', Q: 'ℚ', C: 'ℂ', P: 'ℙ' };
const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', n: 'ⁿ', i: 'ⁱ', x: 'ˣ', k: 'ᵏ', m: 'ᵐ', c: 'ᶜ', T: 'ᵀ', '−': '⁻' };
const SUB: Record<string, string> = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎', n: 'ₙ', i: 'ᵢ', k: 'ₖ', m: 'ₘ', x: 'ₓ', j: 'ⱼ', a: 'ₐ', e: 'ₑ', o: 'ₒ', r: 'ᵣ', t: 'ₜ' };

/** Reads a {group} or a single character starting at s[i]; returns [content, next index]. */
function group(s: string, i: number): [string, number] {
  if (s[i] !== '{') return [s[i] ?? '', i + 1];
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    if (s[j] === '{') depth++;
    else if (s[j] === '}' && --depth === 0) return [s.slice(i + 1, j), j + 1];
  }
  return [s.slice(i + 1), s.length];
}

function script(text: string, map: Record<string, string>, mark: string): string {
  const plain = texToUnicode(text);
  return [...plain].every((ch) => map[ch]) ? [...plain].map((ch) => map[ch]).join('') : `${mark}(${plain})`;
}

/** Turns simple TeX into readable Unicode for Word, PowerPoint, and plain contexts: x^2 → x², \le → ≤, \frac{a}{b} → a/b. */
export function texToUnicode(tex: string): string {
  return rawUnicode(tex).replace(/\s+/g, ' ').replace(/\( /g, '(').replace(/ \)/g, ')').trim();
}

function rawUnicode(tex: string): string {
  let out = '';
  let i = 0;
  while (i < tex.length) {
    const c = tex[i];
    if (c === '\\') {
      const m = /^\\([A-Za-z]+|.)/.exec(tex.slice(i));
      const name = m ? m[1] : '';
      i += name.length + 1;
      // TeX ignores spaces after a control word.
      if (/^[A-Za-z]+$/.test(name)) while (tex[i] === ' ') i++;
      if (name === 'frac' || name === 'dfrac' || name === 'tfrac') {
        const [a, j] = group(tex, i); const [b, k] = group(tex, j); i = k;
        const A = texToUnicode(a); const B = texToUnicode(b);
        out += `${/^[\w.²³]+$/.test(A) ? A : `(${A})`}/${/^[\w.²³]+$/.test(B) ? B : `(${B})`}`;
      } else if (name === 'sqrt') {
        let root = '';
        if (tex[i] === '[') { const e = tex.indexOf(']', i); root = tex.slice(i + 1, e); i = e + 1; }
        const [a, j] = group(tex, i); i = j;
        const A = texToUnicode(a);
        out += `${root ? script(root, SUP, '^') : ''}√${/^[\w.]+$/.test(A) ? A : `(${A})`}`;
      } else if (name === 'mathbb') {
        const [a, j] = group(tex, i); i = j; out += BB[a] ?? a;
      } else if (['text', 'mathrm', 'textbf', 'mathbf', 'mathit', 'operatorname', 'textit', 'mbox'].includes(name)) {
        const [a, j] = group(tex, i); i = j; out += name.startsWith('text') || name === 'mbox' ? a : texToUnicode(a);
      } else if (name === 'left' || name === 'right' || name === 'big' || name === 'Big' || name === 'displaystyle') {
        // sizing commands: drop
      } else if (name === 'overline' || name === 'bar') {
        const [a, j] = group(tex, i); i = j; out += [...texToUnicode(a)].map((ch) => `${ch}̅`).join('');
      } else if (name === ',' || name === ';' || name === ':' || name === '!' || name === ' ') {
        out += name === '!' ? '' : ' ';
      } else if (name === '{' || name === '}' || name === '%' || name === '$' || name === '#' || name === '&' || name === '_') {
        out += name;
      } else if (['sin', 'cos', 'tan', 'log', 'ln', 'exp', 'lim', 'max', 'min', 'gcd', 'mod', 'deg'].includes(name)) {
        out += name;
      } else {
        const sym = SYMBOLS[name] ?? name;
        out += UNARY.has(name) ? sym : ` ${sym} `;
      }
    } else if (c === '^' || c === '_') {
      const [a, j] = group(tex, i + 1); i = j;
      out += script(a, c === '^' ? SUP : SUB, c);
    } else if (c === '{' || c === '}') {
      i++;
    } else if (c === '-') {
      out += '−'; i++;
    } else {
      out += c; i++;
    }
  }
  return out;
}

/** The text with markup removed and math turned into Unicode, for places that cannot render it (titles, aria labels, search, Word, PowerPoint). */
export function plainRich(src: string): string {
  return tokenizeRich(src).map((t) => (t.kind === 'math' || t.kind === 'display' ? texToUnicode(t.value) : t.value)).join('');
}
