import type { WeekContent } from '../content/weekContent';
import { useI18n } from '../i18n';
import { DocumentCard, LinkCard } from '../components/ResourceCards';

/** Documents and verified links for every week of the subject. */
export function ResourcesSection({ weeks }: { weeks: WeekContent[] }) {
  const { t, pick } = useI18n();
  return (
    <div className="stack" style={{ gap: 32 }}>
      {weeks.map((w) => (
        <section key={w.id} className="stack" style={{ gap: 18 }}>
          <h2>{t('module.weekN', { n: w.week })} · {pick(w.title).text}</h2>
          <div>
            <h3>{t('resources.originals')}</h3>
            <div className="res-grid">
              {w.documents.map((d) => <DocumentCard key={d.file} weekId={w.id} title={pick(d.title).text} file={d.file} kind={d.kind} preview={d.preview} />)}
            </div>
          </div>
          <div>
            <h3>{t('resources.external')}</h3>
            <div className="res-grid">
              {w.resources.map((r) => (
                <LinkCard key={r.id} resource={r} note={pick(r.note).text}
                  verified={r.verifiedOn ? t('resources.verified', { date: r.verifiedOn }) : t('resources.unverified')} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
