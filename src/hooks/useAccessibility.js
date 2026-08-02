import { useEffect, useState } from 'react';

const STORAGE_KEY = 'academy-hub-a11y';

export const TEXT_SIZES = ['normal', 'large', 'xlarge'];
export const CONTRAST_VALUES = ['normal', 'high', 'invert'];
export const TOGGLE_KEYS = ['monochrome', 'readableFont', 'underlineLinks'];

const DEFAULT_SETTINGS = {
  textSize: 'normal',
  contrast: 'normal',
  monochrome: false,
  readableFont: false,
  underlineLinks: false,
};

const TEXT_SIZE_CLASS = { large: 'a11y-text-large', xlarge: 'a11y-text-xlarge' };
const CONTRAST_CLASS = { high: 'a11y-contrast-high', invert: 'a11y-contrast-invert' };

const CLASS_MAP = {
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
      root.classList.add(TEXT_SIZE_CLASS[settings.textSize]);
    }

    root.classList.remove('a11y-contrast-high', 'a11y-contrast-invert');
    if (settings.contrast !== 'normal') {
      root.classList.add(CONTRAST_CLASS[settings.contrast]);
    }

    for (const key of TOGGLE_KEYS) {
      if (CLASS_MAP[key]) root.classList.toggle(CLASS_MAP[key], settings[key]);
    }

    document.querySelector('.page-content')?.classList.toggle('a11y-monochrome', settings.monochrome);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const setTextSize = (textSize) => setSettings((s) => ({ ...s, textSize }));

  const setContrast = (contrast) => setSettings((s) => ({ ...s, contrast }));

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  const reset = () => setSettings(DEFAULT_SETTINGS);

  return { settings, setTextSize, setContrast, toggle, reset };
}
