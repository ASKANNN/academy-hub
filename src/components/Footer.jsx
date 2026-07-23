import { ACADEMIES } from '../data/academies.js';

const ArrowUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12Z" />
  </svg>
);

const TEXTS = {
  ru: {
    desc: 'База знаний из отдельных разделов по темам программирования.',
    sections: 'Разделы',
    contacts: 'Контакты',
    mit: 'Открытый исходный код, лицензия MIT.',
    backTop: 'Наверх',
  },
  en: {
    desc: 'A knowledge base of individual sections on programming topics.',
    sections: 'Sections',
    contacts: 'Contacts',
    mit: 'Open source, MIT license.',
    backTop: 'Top',
  },
};

export function Footer({ lang = 'ru' }) {
  const t = TEXTS[lang] ?? TEXTS.ru;

  return (
    <footer className="footer">
      <div className="container footer__main">
        <div className="footer__brand">
          <p className="footer__brand-name">Askan Academy</p>
          <p className="footer__brand-desc">{t.desc}</p>
        </div>

        <div className="footer__col">
          <p className="footer__col-label">{t.sections}</p>
          <ul className="footer__nav">
            {ACADEMIES.map((a) => (
              <li key={a.id}>
                {a.status === 'live' ? (
                  <a href={a.url} target="_blank" rel="noreferrer" className="footer__nav-link">
                    {a.name}
                  </a>
                ) : (
                  <span className="footer__nav-item">{a.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <p className="footer__col-label">{t.contacts}</p>
          <ul className="footer__nav">
            <li>
              <a
                href="https://github.com/ASKANNN/academy-hub"
                target="_blank"
                rel="noreferrer"
                className="footer__nav-link footer__nav-link--icon"
              >
                <GitHubIcon />
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:asaevnatan@gmail.com" className="footer__nav-link">
                asaevnatan@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__copy">© 2026 Askan Academy. {t.mit}</span>
          <button
            type="button"
            className="footer__back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={lang === 'ru' ? 'Прокрутить наверх' : 'Scroll to top'}
          >
            {t.backTop}
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}
