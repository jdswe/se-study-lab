import { useState, useSyncExternalStore, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import { LocalTime } from './LocalTime';
import { Backdrop, variantForPath } from './Backdrop';
import { findTerm } from '../content/curriculum';

/** Hue of the term in the current path, used to tint the term backdrop. */
function termHue(path: string): number | undefined {
  const m = path.match(/^\/term\/(\d+)/);
  return m ? findTerm(Number(m[1]))?.hue : undefined;
}
import { useReveal } from '../lib/useReveal';
import type { Locale } from '../content/types';
import { updateState, useProgress } from '../lib/store';

const links = [
  { to: '/', key: 'home', end: true },
  { to: '/flashcards', key: 'flashcards' },
  { to: '/quizzes', key: 'quizzes' },
  { to: '/playground', key: 'playground' },
  { to: '/labs', key: 'labs' },
  { to: '/planner', key: 'planner' },
  { to: '/progress', key: 'progress' },
  { to: '/resources', key: 'resources' },
  { to: '/settings', key: 'settings' },
] as const;

const LANGS: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
];

/** Global chrome: skip link, navigation, language selector, theme toggle, and footer. */
export function Layout({ children }: { children: ReactNode }) {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme } = useProgress();

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(location.pathname);
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname);
    setOpen(false);
  }

  useReveal(location.pathname);

  // The switch flips the theme you can see right now. "Match system" lives in Settings.
  const prefersDark = useSystemDark();
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark);

  function toggleTheme() {
    updateState((s) => ({ ...s, theme: isDark ? 'light' : 'dark' }));
  }

  return (
    <>
      <Backdrop variant={variantForPath(location.pathname)} hue={termHue(location.pathname)} />
      <a className="skip-link" href="#main">{t('nav.skip')}</a>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label={t('appName')}>
            <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
              <rect width="32" height="32" rx="7" style={{ fill: 'var(--panel-2)' }} />
              <circle cx="10" cy="8" r="3" style={{ fill: 'var(--accent)' }} />
              <circle cx="10" cy="24" r="3" style={{ fill: 'var(--accent)' }} />
              <circle cx="22" cy="16" r="3" style={{ fill: 'var(--accent-2)' }} />
              <path d="M10 11v10M10 13c0 3 12 0 12 3" stroke="var(--accent)" strokeWidth="2" fill="none" />
            </svg>
            <span>{t('appName')}</span>
          </Link>

          <nav id="main-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={'end' in l ? l.end : false}>
                {t(`nav.${l.key}`)}
              </NavLink>
            ))}
          </nav>

          <div className="header-tools">
            <div className="segmented" role="group" aria-label={t('settings.language')}>
              {LANGS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  aria-pressed={locale === l.value}
                  lang={l.value}
                  onClick={() => setLocale(l.value)}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-small btn-ghost theme-switch"
              onClick={toggleTheme}
              aria-label={isDark ? t('settings.toLight') : t('settings.toDark')}
              title={isDark ? t('settings.toLight') : t('settings.toDark')}
            >
              {isDark ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4.5" />
                  <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="btn btn-small menu-button"
              aria-expanded={open}
              aria-controls="main-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {t('nav.open')}
            </button>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>{children}</main>

      <footer className="site-footer">
        <div className="footer-row">
          <span className="footer-brand">{t('appName')}</span>
          <span className="faint">{t('footer.tagline')}</span>
        </div>
        <LocalTime />
      </footer>
    </>
  );
}


/** Tracks the operating system's dark-mode preference, updating live when it changes. */
function useSystemDark(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      try {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
      } catch {
        return () => {};
      }
    },
    () => {
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch {
        return false;
      }
    },
    () => false,
  );
}
