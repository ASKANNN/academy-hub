import { useEffect, useState } from 'react';

const STORAGE_KEY = 'academy-hub-a11y';

export const TOGGLE_KEYS = ['highContrast', 'invert', 'monochrome', 'readableFont', 'underlineLinks'];

const DEFAULT_SETTINGS = {
  textSize: 'normal',
  highContrast: false,
  invert: false,
  monochrome: false,
  readableFont: false,
  underlineLinks: false,
};

const CLASS_MAP = {
  textSize: { large: 'a11y-text-large', xlarge: 'a11y-text-xlarge' },
  highContrast: 'a11y-high-contrast',
  invert: 'a11y-invert',
  monochrome: 'a11y-monochrome',
  readableFont: 'a11y-readable-font',
  underlineLinks: 'a11y-underline-links',
};

function getInitialSettings() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_SETTINGS;
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useAccessibility() {
  const [settings, setSettings] = useState(getInitialSettings);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('a11y-text-large', 'a11y-text-xlarge');
    if (settings.textSize !== 'normal') {
      root.classList.add(CLASS_MAP.textSize[settings.textSize]);
    }

    for (const key of TOGGLE_KEYS) {
      root.classList.toggle(CLASS_MAP[key], settings[key]);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const setTextSize = (textSize) => setSettings((s) => ({ ...s, textSize }));

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  const reset = () => setSettings(DEFAULT_SETTINGS);

  return { settings, setTextSize, toggle, reset };
}
