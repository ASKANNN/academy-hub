import { useLayoutEffect } from 'react';
import { Outlet, useOutletContext, useLocation } from 'react-router-dom';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { PageIntro } from './PageIntro.jsx';
import { AccessibilityWidget } from './AccessibilityWidget.jsx';
import { BackToTop } from './BackToTop.jsx';
import { useTheme } from '../hooks/useTheme.js';
import { useLocale } from '../hooks/useLocale.js';
import { useIntro } from '../hooks/useIntro.js';
import { getStrings } from '../i18n/strings.js';

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLocale();
  const { done, finish } = useIntro();
  const t = getStrings(lang);
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      {!done && <PageIntro onComplete={finish} />}
      <div className={`page-content${done ? ' is-revealed' : ''}`}>
        <a href="#main-content" className="skip-link">{t.skipLink}</a>
        <Header theme={theme} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} />
        <main id="main-content">
          <div key={location.pathname} className="page-transition">
            <Outlet context={{ theme, lang }} />
          </div>
        </main>
        <Footer lang={lang} />
      </div>
      <AccessibilityWidget lang={lang} />
      <BackToTop lang={lang} />
    </>
  );
}

export function usePageContext() {
  return useOutletContext();
}
