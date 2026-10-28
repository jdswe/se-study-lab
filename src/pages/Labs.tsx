import { useI18n } from '../i18n';
import { weeks } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { LabList } from '../components/LabList';

export function Labs() {
  const { t } = useI18n();
  const labs = weeks.flatMap((w) => w.labs);
  return (
    <div>
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('labs.title') }]} />
      <div className="page-head">
        <h1>{t('labs.title')}</h1>
        <p>{t('labs.subtitle')}</p>
      </div>
      <LabList labs={labs} />
    </div>
  );
}
