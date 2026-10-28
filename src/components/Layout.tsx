import { useSyncExternalStore, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n';
import { LocalTime } from './LocalTime';
import { Backdrop, backdropForPath } from './Backdrop';
import { useReveal } from '../lib/useReveal';
import type { Locale } from '../content/types';
import { updateState, useProgress } from '../lib/store';

const LANGS: { value: Locale; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
  { value: 'pt', label: 'PT' },
];

/**
 * Global chrome. Only program-wide controls live here: home, language, theme,
 * and settings. Study sections live inside each subject.
 */
export function Layout({ children }: { children: ReactNode }) {
  const { t, locale, setLocale } = useI18n();
  const location = useLocation();
  const { theme } = useProgress();
  const backdrop = backdropForPath(location.pathname);

  useReveal(location.pathname);

  // The switch flips the theme you can see right now. "Match system" lives in Settings.
  const prefersDark = useSystemDark();
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark);

  function toggleTheme() {
    updateState((s) => ({ ...s, theme: isDark ? 'light' : 'dark' }));
  }

  return (
    <>
      <Backdrop variant={backdrop.variant} hue={backdrop.hue} />
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
            <NavLink to="/settings" className="btn btn-small btn-ghost theme-switch" aria-label={t('nav.settings')} title={t('nav.settings')}>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
              </svg>
            </NavLink>
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
