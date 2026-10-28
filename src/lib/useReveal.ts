import { useEffect } from 'react';

// Only compact blocks: very tall elements (whole lessons) would need too much of
// their area on screen before revealing, so they are never hidden.
const SELECTOR = '.card, .res-card, .activity, .story, .map-node, .exercise, .section-card:not(.overview > .two-col *)';

/**
 * Fades sections in as they scroll into view. Elements already visible are
 * left alone, and nothing is hidden when IntersectionObserver is missing or
 * the user prefers reduced motion, so content can never get stuck invisible.
 */
export function useReveal(key: string) {
  useEffect(() => {
    let reduced = false;
    try {
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('reduce-motion');
    } catch {
      reduced = true;
    }
    if (reduced || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target;
            el.classList.add('is-revealed');
            observer.unobserve(el);
            // Drop the helper classes afterwards so hover effects work normally.
            window.setTimeout(() => el.classList.remove('reveal', 'is-revealed'), 900);
          }
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0 },
    );

    // Wait a frame so the new route has rendered.
    const raf = window.requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) return; // already on screen
        el.classList.add('reveal');
        el.style.setProperty('--reveal-delay', `${(i % 4) * 60}ms`);
        observer.observe(el);
      });
    });

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [key]);
}
