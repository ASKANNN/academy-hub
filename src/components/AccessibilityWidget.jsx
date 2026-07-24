import { useEffect, useRef, useState } from 'react';
import { useAccessibility, TOGGLE_KEYS } from '../hooks/useAccessibility.js';
import { getStrings } from '../i18n/strings.js';

const A11yIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="8" r="1.6" fill="currentColor" />
    <path
      d="M6.5 10.5c3.6 1.1 7.4 1.1 11 0M12 10.5V18M12 14l-2.6 4M12 14l2.6 4"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const TEXT_SIZES = ['normal', 'large', 'xlarge'];

export function AccessibilityWidget({ lang }) {
  const t = getStrings(lang).accessibility;
  const { settings, setTextSize, toggle, reset } = useAccessibility();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (panelRef.current?.contains(e.target) || buttonRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector('button, [href], input')?.focus();
  }, [open]);

  const textSizeLabels = {
    normal: t.textSizeNormal,
    large: t.textSizeLarge,
    xlarge: t.textSizeXLarge,
  };

  return (
    <div className="a11y-widget">
      <button
        ref={buttonRef}
        type="button"
        className="a11y-widget__toggle"
        aria-label={t.toggle}
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <A11yIcon />
      </button>

      {open && (
        <div
          id="a11y-panel"
          className="a11y-widget__panel"
          role="dialog"
          aria-modal="true"
          aria-label={t.panelTitle}
          ref={panelRef}
        >
          <div className="a11y-widget__panel-header">
            <span className="a11y-widget__panel-title">{t.panelTitle}</span>
            <button
              type="button"
              className="a11y-widget__close"
              aria-label={t.close}
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
            >
              ×
            </button>
          </div>

          <div className="a11y-widget__group">
            <span className="a11y-widget__group-label">{t.textSize}</span>
            <div className="a11y-widget__segmented" role="group" aria-label={t.textSize}>
              {TEXT_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  className="a11y-widget__segment"
                  aria-pressed={settings.textSize === size}
                  onClick={() => setTextSize(size)}
                >
                  {textSizeLabels[size]}
                </button>
              ))}
            </div>
          </div>

          <div className="a11y-widget__group">
            {TOGGLE_KEYS.map((key) => (
              <ToggleRow key={key} label={t[key]} checked={settings[key]} onChange={() => toggle(key)} />
            ))}
          </div>

          <button type="button" className="a11y-widget__reset" onClick={reset}>
            {t.reset}
          </button>
        </div>
      )}
    </div>
  );
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <label className="a11y-widget__toggle-row">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </label>
  );
}
