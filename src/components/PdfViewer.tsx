import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';

/**
 * Renders a PDF page by page with PDF.js, so previews work in every browser,
 * including mobile browsers that cannot show PDFs inside a page. Pages render
 * lazily as they scroll into view. PDF.js loads only when a preview opens.
 */
export default function PdfViewer({ src }: { src: string }) {
  const { t } = useI18n();
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [pages, setPages] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let destroy: (() => void) | undefined;

    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        const task = pdfjs.getDocument({ url: src });
        destroy = () => void task.destroy();
        const doc = await task.promise;
        if (cancelled || !host.current) return;
        setPages(doc.numPages);
        setStatus('ready');
        const container = host.current;
        container.innerHTML = '';
        const width = Math.min(container.clientWidth || 800, 1000);

        const renderPage = async (canvas: HTMLCanvasElement) => {
          const n = Number(canvas.dataset.page);
          const page = await doc.getPage(n);
          const base = page.getViewport({ scale: 1 });
          const scale = width / base.width;
          const ratio = Math.min(window.devicePixelRatio || 1, 2);
          const viewport = page.getViewport({ scale: scale * ratio });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = `${viewport.width / ratio}px`;
          canvas.style.height = `${viewport.height / ratio}px`;
          await page.render({ canvas, viewport }).promise;
        };

        observer = new IntersectionObserver((entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const canvas = e.target as HTMLCanvasElement;
            observer?.unobserve(canvas);
            void renderPage(canvas);
          }
        }, { root: container, rootMargin: '400px 0px' });

        for (let n = 1; n <= doc.numPages; n++) {
          const first = await doc.getPage(n);
          const vp = first.getViewport({ scale: width / first.getViewport({ scale: 1 }).width });
          const canvas = document.createElement('canvas');
          canvas.dataset.page = String(n);
          canvas.className = 'pdf-page';
          canvas.style.width = `${vp.width}px`;
          canvas.style.height = `${vp.height}px`;
          canvas.setAttribute('role', 'img');
          canvas.setAttribute('aria-label', `${n} / ${doc.numPages}`);
          container.appendChild(canvas);
          observer.observe(canvas);
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      destroy?.();
    };
  }, [src]);

  return (
    <div className="pdf-viewer">
      {status === 'loading' && <p className="faint pdf-status">{t('common.loading')}</p>}
      {status === 'error' && (
        <p className="pdf-status">{t('resources.previewError')} <a href={src} target="_blank" rel="noopener noreferrer">{t('resources.openTab')} ↗</a></p>
      )}
      {status === 'ready' && <p className="faint pdf-status">{t('resources.pages', { n: pages })}</p>}
      <div ref={host} className="pdf-pages" />
    </div>
  );
}
