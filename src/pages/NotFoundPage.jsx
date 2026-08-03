import { Link } from 'react-router-dom';
import { usePageContext } from '../components/Layout.jsx';
import { getStrings } from '../i18n/strings.js';

export default function NotFoundPage() {
  const { lang } = usePageContext();
  const t = getStrings(lang).algorithms;

  return (
    <section className="container not-found">
      <h1 className="not-found__title">{t.notFoundTitle}</h1>
      <p className="not-found__subtitle">{t.notFoundSubtitle}</p>
      <Link to="/" className="btn btn--primary">
        {t.notFoundCta}
      </Link>
    </section>
  );
}
