import { useI18n } from '../i18n';
import type { ExternalResource } from '../content/types';

const KIND_ICON: Record<string, string> = { pdf: 'PDF', docx: 'DOC', pptx: 'PPT', article: '↗', book: '▤', tutorial: '✎', video: '▶' };

/** A downloadable document with preview and download buttons. */
export function DocumentCard({ title, file, kind }: { title: string; file: string; kind: string }) {
  const { t, locale } = useI18n();
  // Documents exist in every locale; the one shown follows the selected language.
  const href = `./downloads/${locale}/${file}`;
  return (
    <article className="res-card">
      <span className={`res-icon kind-${kind}`} aria-hidden="true">{KIND_ICON[kind] ?? '•'}</span>
      <div className="res-body">
        <h3>{title}</h3>
        <span className="badge">{kind.toUpperCase()}</span>
      </div>
      <div className="res-actions">
        {kind === 'pdf' && (
          <a className="btn btn-small" href={href} target="_blank" rel="noopener noreferrer">{t('resources.preview')}</a>
        )}
        <a className="btn btn-small btn-primary" href={href} download={`se-study-lab-${locale}-${file}`}>{t('common.download')}</a>
      </div>
    </article>
  );
}

/** An external link card. The button opens the page in a new tab. */
export function LinkCard({ resource, note, verified }: { resource: ExternalResource; note: string; verified: string }) {
  const { t } = useI18n();
  return (
    <article className="res-card">
      <span className="res-icon kind-link" aria-hidden="true">{KIND_ICON[resource.kind] ?? '•'}</span>
      <div className="res-body">
        <h3>{resource.title}</h3>
        <p className="faint">{note}</p>
        <span className="badge">{verified}</span>
      </div>
      <div className="res-actions">
        <a className="btn btn-small btn-primary" href={resource.url} target="_blank" rel="noopener noreferrer">
          {t('common.go')} ↗
        </a>
      </div>
    </article>
  );
}
