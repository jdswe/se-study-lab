import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { COUNTRIES, countryForZone, flagFor } from '../lib/countries';
import { useProgress } from '../lib/store';

/**
 * Local legal time and flag. Automatic mode uses the browser's time zone, which
 * needs no location permission. A chosen country in Settings overrides it.
 */
export function LocalTime() {
  const { locale, t } = useI18n();
  const { country } = useProgress();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const chosen = country !== 'auto' ? COUNTRIES.find((c) => c.code === country) : undefined;
  const info = chosen ?? countryForZone(detectedZone);
  const zone = chosen ? chosen.zone : detectedZone;
  const lang = locale === 'es' ? 'es' : 'en';

  // Always 24-hour format, whatever the locale.
  const time = new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: zone }).format(now);
  const zoneName = new Intl.DateTimeFormat(lang, { timeZoneName: 'long', timeZone: zone })
    .formatToParts(now).find((p) => p.type === 'timeZoneName')?.value ?? zone;
  const place = info ? info.name[lang] : zone;

  return (
    <p className="local-time">
      {info && <span className="flag" aria-hidden="true">{flagFor(info.code)}</span>}
      <span>{t('footer.localTime')}: <strong>{time}</strong></span>
      <span className="faint">· {place} · {zoneName}</span>
    </p>
  );
}
