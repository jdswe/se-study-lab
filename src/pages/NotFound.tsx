import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export function NotFound() {
  const { t } = useI18n();
  return (
    <div className="empty">
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.text')}</p>
      <Link className="btn btn-primary" to="/">{t('notFound.home')}</Link>
    </div>
  );
}
