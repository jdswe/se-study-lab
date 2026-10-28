import { lazy, Suspense, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import type { ExternalResource } from '../content/types';

// PDF.js is large: it loads only when a preview is opened.
const PdfViewer = lazy(() => import('./PdfViewer'));

const KIND_ICON: Record<string, string> = { pdf: 'PDF', docx: 'DOC', pptx: 'PPT', article: '↗', book: '▤', tutorial: '✎', video: '▶' };

/** Office's online viewer needs a public URL, so it is offered only on the published site. */
function officeViewerUrl(href: string): string | undefined {
  try {
    const { protocol, hostname } = window.location;
    if (protocol !== 'https:' || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(hostname)) return undefined;
    const absolute = new URL(href, window.location.href).href;
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(absolute)}`;
  } catch {
    return undefined;
  }
}

/**
 * A downloadable document. Every document previews inside the page: PDFs
 * directly, Word and PowerPoint files through a generated PDF twin. Office's
 * online viewer is only a fallback for files without a twin on a public site.
 */
export function DocumentCard({ weekId, title, file, kind, preview }: { weekId: string; title: string; file: string; kind: string; preview?: string }) {
  const { t, locale } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  // Documents exist in every locale; the one shown follows the selected language.
  const href = `./downloads/${locale}/${weekId}/${file}`;
  // Every document previews in the page: PDFs directly, Word and PowerPoint through their PDF twin.
  const previewHref = kind === 'pdf' ? href : preview ? `./downloads/${locale}/${weekId}/${preview}` : undefined;
  const office = previewHref ? undefined : officeViewerUrl(href);

  return (
    <article className="res-card">
      <span className={`res-icon kind-${kind}`} aria-hidden="true">{KIND_ICON[kind] ?? '•'}</span>
      <div className="res-body">
        <h3>{title}</h3>
        <span className="badge">{kind.toUpperCase()}</span>
      </div>
      <div className="res-actions">
        {previewHref && (
          <button type="button" className="btn btn-small" onClick={() => { setOpen(true); dialog.current?.showModal(); }}>{t('resources.preview')}</button>
        )}
        {office && (
          <a className="btn btn-small" href={office} target="_blank" rel="noopener noreferrer">{t('resources.preview')} ↗</a>
        )}
        <a className="btn btn-small btn-primary" href={href} download={`se-study-lab-${locale}-${weekId}-${file}`}>{t('common.download')}</a>
      </div>
      {previewHref && (
        <dialog ref={dialog} className="pdf-dialog" aria-label={title} onClose={() => setOpen(false)} onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}>
          <div className="pdf-dialog-bar">
            <strong>{title}</strong>
            <span className="pdf-dialog-actions">
              <a className="btn btn-small" href={previewHref} target="_blank" rel="noopener noreferrer">{t('resources.openTab')} ↗</a>
              <button type="button" className="btn btn-small btn-primary" onClick={() => dialog.current?.close()}>{t('resources.close')}</button>
            </span>
          </div>
          {open && (
            <Suspense fallback={<p className="faint pdf-status">{t('common.loading')}</p>}>
              <PdfViewer src={previewHref} />
            </Suspense>
          )}
        </dialog>
      )}
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
