import type { Video } from '../content/types';
import manifest from '../content/generated/videoManifest.json';
import { useI18n } from '../i18n';

type Manifest = Record<string, Partial<Record<'en' | 'es' | 'pt', { duration: number; bytes: number }>>>;
const LANG_NAMES = { en: 'English', es: 'Español', pt: 'Português' } as const;
const rendered = manifest as Manifest;

/** Videos that have been rendered in at least one language, so the page never shows a broken player. */
export function renderedVideos(videos: Video[]): Video[] {
  return videos.filter((v) => rendered[v.id] && Object.keys(rendered[v.id]).length > 0);
}

const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/**
 * One-minute concept video. The file, narration voice, and captions follow the
 * selected language; when a language has not been rendered yet, the other one
 * plays and a note says so.
 */
export function VideoPlayer({ video }: { video: Video }) {
  const { t, pick, locale } = useI18n();
  const info = rendered[video.id] ?? {};
  // Fall back to English, then to any rendered language.
  const lang = info[locale] ? locale : info.en ? 'en' : (Object.keys(info)[0] as 'en' | 'es' | 'pt' | undefined) ?? 'en';
  const meta = info[lang];
  if (!meta) return null;
  const base = `./media/${lang}/${video.id}`;
  return (
    <figure className="video-card">
      <video key={base} controls preload="none" playsInline poster={`${base}.jpg`}>
        <source src={`${base}.mp4`} type="video/mp4" />
        <track kind="captions" src={`${base}.vtt`} srcLang={lang} label={LANG_NAMES[lang]} default />
      </video>
      <figcaption>
        <div className="video-head">
          <span className="story-badge">▶ {t('video.label')}</span>
          <span className="badge">{clock(meta.duration)}</span>
        </div>
        <h3>{pick(video.title).text}</h3>
        <p className="faint">{pick(video.summary).text}</p>
        {lang !== locale && <span className="translation-note">{t('video.otherLanguage')}</span>}
      </figcaption>
    </figure>
  );
}
