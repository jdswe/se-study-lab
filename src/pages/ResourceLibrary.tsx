import { useI18n } from '../i18n';
import { weeks } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { DocumentCard, LinkCard } from '../components/ResourceCards';

/** Library of every original document and verified external resource across weeks. */
export function ResourceLibrary() {
  const { t, pick } = useI18n();
  return (
    <div>
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('resources.title') }]} />
      <div className="page-head">
        <h1>{t('resources.title')}</h1>
        <p>{t('resources.subtitle')}</p>
      </div>
      <section style={{ marginBottom: 32 }}>
        <h2>{t('resources.originals')}</h2>
        <p className="muted">{t('resources.previewNote')}</p>
        <div className="res-grid">
          {weeks.flatMap((w) => w.documents.map((d) => (
            <DocumentCard key={`${w.id}-${d.file}`} title={pick(d.title).text} file={d.file} kind={d.kind} />
          )))}
        </div>
      </section>
      <section>
        <h2>{t('resources.external')}</h2>
        <div className="res-grid">
          {weeks.flatMap((w) => w.resources).map((r) => (
            <LinkCard
              key={r.id}
              resource={r}
              note={pick(r.note).text}
              verified={r.verifiedOn ? t('resources.verified', { date: r.verifiedOn }) : t('resources.unverified')}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
