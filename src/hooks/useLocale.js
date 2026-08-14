import { useEffect, useState } from 'react';

const STORAGE_KEY = 'academy-hub-lang';

function getInitialLang() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'ru' || stored === 'en') return stored;
  return 'en';
}

export function useLocale() {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === 'ru' ? 'en' : 'ru'));

  return { lang, toggleLang };
}
