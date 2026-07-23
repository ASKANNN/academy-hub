import { BrandMark } from './BrandMark.jsx';

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
      stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
    />
  </svg>
);

export function Header({ theme, onToggleTheme, lang, onToggleLang }) {
  const isDark = theme === 'dark';
  const isRu = lang === 'ru';

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#/" className="header__logo" aria-label={isRu ? 'Askan Academy — на главную' : 'Askan Academy — home'}>
          <BrandMark />
          <span className="header__logo-text">
            <span className="header__logo-name">Askan</span>
            <span className="header__logo-suffix">Academy</span>
          </span>
        </a>

        <div className="header__actions">
          <button
            type="button"
            className="lang-toggle"
            onClick={onToggleLang}
            aria-label={isRu ? 'Switch to English' : 'Переключить на русский'}
          >
            {isRu ? 'RU' : 'EN'}
          </button>

          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDark
              ? (isRu ? 'Включить светлую тему' : 'Switch to light')
              : (isRu ? 'Включить тёмную тему' : 'Switch to dark')}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
