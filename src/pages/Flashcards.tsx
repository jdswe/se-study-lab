import { useI18n } from '../i18n';
import { weeks } from '../content/index';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Deck } from '../components/Deck';

/** All flashcards across published weeks. */
export function Flashcards() {
  const { t } = useI18n();
  const cards = weeks.flatMap((w) => w.flashcards);
  return (
    <div>
      <Breadcrumbs items={[{ label: t('nav.home'), to: '/' }, { label: t('flashcards.title') }]} />
      <div className="page-head">
        <h1>{t('flashcards.title')}</h1>
        <p>{t('flashcards.subtitle')}</p>
      </div>
      <Deck cards={cards} />
    </div>
  );
}
