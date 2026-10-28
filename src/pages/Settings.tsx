import { useI18n } from '../i18n';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { updateState, useProgress } from '../lib/store';
import type { Locale } from '../content/types';
import { COUNTRIES } from '../lib/countries';

export function Settings() {
  const { t, locale, setLocale } = useI18n();
  const { theme, country } = useProgress();
  const reduceMotion = document.documentElement.classList.contains('reduce-motion');

  return (
    <div>
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('settings.title') }]} />
      <div className="page-head">
        <h1>{t('settings.title')}</h1>
      </div>
      <div className="stack" style={{ maxWidth: 640 }}>
        <section className="card">
          <h2>{t('settings.language')}</h2>
          <select aria-label={t('settings.language')} value={locale} onChange={(e) => setLocale(e.target.value as Locale)}>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </section>
        <section className="card">
          <h2>{t('settings.theme')}</h2>
          <select
            aria-label={t('settings.theme')}
            value={theme}
            onChange={(e) => updateState((s) => ({ ...s, theme: e.target.value as 'system' | 'light' | 'dark' }))}
          >
            <option value="system">{t('settings.themeSystem')}</option>
            <option value="light">{t('settings.themeLight')}</option>
            <option value="dark">{t('settings.themeDark')}</option>
          </select>
        </section>
        <section className="card">
          <h2>{t('settings.motion')}</h2>
          <p className="muted">{t('settings.motionText')}</p>
          <label>
            <input
              type="checkbox"
              checked={reduceMotion}
              onChange={(e) => {
                document.documentElement.classList.toggle('reduce-motion', e.target.checked);
                try { window.localStorage.setItem('se-study-lab:reduce-motion', e.target.checked ? '1' : '0'); } catch { /* ignore */ }
              }}
            />{' '}
            {t('settings.reduceMotion')}
          </label>
        </section>
        <section className="card">
          <h2>{t('settings.country')}</h2>
          <p className="muted">{t('settings.countryText')}</p>
          <select
            aria-label={t('settings.country')}
            value={country}
            onChange={(e) => updateState((s) => ({ ...s, country: e.target.value }))}
          >
            <option value="auto">{t('settings.countryAuto')}</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.name[locale === 'es' ? 'es' : 'en']}</option>
            ))}
          </select>
        </section>
        <section className="card">
          <h2>{t('settings.privacy')}</h2>
          <p className="muted">{t('settings.privacyText')}</p>
        </section>
      </div>
    </div>
  );
}
