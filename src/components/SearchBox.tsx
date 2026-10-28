import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { weeks } from '../content/index';
import { useI18n } from '../i18n';

/** Searches week titles, lesson titles, takeaways, and flashcards in the current language. */
export function SearchBox() {
  const { t, pick } = useI18n();
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const matches = useMemo(() => {
    if (q.length < 2) return [];
    return weeks.flatMap((w) => [
      ...w.lessons
        .filter((l) => pick(l.title).text.toLowerCase().includes(q) || l.takeaways.some((k) => pick(k).text.toLowerCase().includes(q)))
        .map((l) => ({ id: `${w.id}-${l.id}`, label: pick(l.title).text, kind: t('week.lessons'), to: `/week/${w.id}/lessons?lesson=${l.id}` })),
      ...w.flashcards
        .filter((c) => pick(c.front).text.toLowerCase().includes(q))
        .map((c) => ({ id: c.id, label: pick(c.front).text, kind: t('week.flashcards'), to: `/week/${w.id}/flashcards` })),
    ]).slice(0, 8);
  }, [q, pick, t]);

  return (
    <div className="search">
      <label className="sr-only" htmlFor="search">{t('common.search')}</label>
      <input id="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('common.searchPlaceholder')} autoComplete="off" />
      {q.length >= 2 && (
        <ul className="search-results" role="list">
          {matches.length === 0 ? <li className="faint">{t('common.noResults')}</li> : matches.map((m) => (
            <li key={m.id}>
              <Link to={m.to}><span>{m.label}</span><span className="badge">{m.kind}</span></Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
