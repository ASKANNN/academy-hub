import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { AcademyTree } from './components/AcademyTree.jsx';
import { Footer } from './components/Footer.jsx';
import { PageIntro } from './components/PageIntro.jsx';
import { AccessibilityWidget } from './components/AccessibilityWidget.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useLocale } from './hooks/useLocale.js';
import { useIntro } from './hooks/useIntro.js';
import { getStrings } from './i18n/strings.js';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLocale();
  const { done, finish } = useIntro();
  const t = getStrings(lang);

  return (
    <>
      {!done && <PageIntro onComplete={finish} />}
      <div className={`page-content${done ? ' is-revealed' : ''}`}>
        <a href="#main-content" className="skip-link">{t.skipLink}</a>
        <Header theme={theme} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} />
        <main id="main-content">
          <Hero lang={lang} />
          <AcademyTree lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
      <AccessibilityWidget lang={lang} />
    </>
  );
}
