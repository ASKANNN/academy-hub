import { useEffect, useRef, useState } from 'react';
import { useAccessibility, TEXT_SIZES, CONTRAST_VALUES, TOGGLE_KEYS } from '../hooks/useAccessibility.js';
import { getStrings } from '../i18n/strings.js';

const DOCK_DELAY = 1400;
const IDLE_REDOCK_DELAY = 2200;

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

const ArrowIcon = () => (
  <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
    <path d="M8 1 2 7l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FOCUSABLE_SELECTOR = 'button, [href], input, [tabindex]:not([tabindex="-1"])';

export function AccessibilityWidget({ lang }) {
  const t = getStrings(lang).accessibility;
  const { settings, setTextSize, setContrast, toggle, reset } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [docked, setDocked] = useState(false);
  const [focused, setFocused] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const tabRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const openRef = useRef(open);
  const focusedRef = useRef(focused);
  openRef.current = open;
  focusedRef.current = focused;

  // Docking behavior is identical on every device: undocking happens only via a
  // click on the tab (is-docked class toggle), never via :hover, so touch works
  // the same as desktop without needing to disable any of this on touch devices.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!openRef.current && !focusedRef.current) setDocked(true);
    }, DOCK_DELAY);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (docked || open || focused) return undefined;
    const id = window.setTimeout(() => setDocked(true), IDLE_REDOCK_DELAY);
    return () => window.clearTimeout(id);
  }, [docked, open, focused]);

  useEffect(() => {
    const onScroll = () => {
      if (!open) setDocked(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    if (open) setDocked(false);
  }, [open]);

  function onDockFocus() {
    setFocused(true);
    setDocked(false);
  }

  function onDockBlur(e) {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setFocused(false);
  }

  function openPanel() {
    lastFocusedRef.current = document.activeElement;
    setDocked(false);
    setOpen(true);
  }

  function closePanel() {
    setOpen(false);
    (lastFocusedRef.current instanceof HTMLElement ? lastFocusedRef.current : triggerRef.current)?.focus();
  }

  useEffect(() => {
    if (!open) return undefined;
    // Double rAF: the panel's visibility transition needs a frame to settle before
    // a still-hidden-at-commit-time element becomes focusable.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panelRef.current?.querySelector('#a11y-close')?.focus();
      });
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePanel();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onPointerDown = (e) => {
      if (panelRef.current?.contains(e.target) || triggerRef.current?.contains(e.target)) return;
      closePanel();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const textSizeLabels = { normal: t.textSizeNormal, large: t.textSizeLarge, xlarge: t.textSizeXLarge };
  const contrastLabels = { normal: t.contrastNormal, high: t.contrastHigh, invert: t.contrastInvert };
  const toggleLabels = { monochrome: t.monochrome, readableFont: t.readableFont, underlineLinks: t.underlineLinks };

  return (
    <>
      <div
        className={`a11y-dock${docked ? ' is-docked' : ''}`}
        id="a11y-dock"
        onFocus={onDockFocus}
        onBlur={onDockBlur}
      >
        <button
          ref={triggerRef}
          type="button"
          id="a11y-trigger"
          className="a11y-widget__trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="a11y-panel"
          aria-label={t.toggle}
          onClick={() => (open ? closePanel() : openPanel())}
        >
          <A11yIcon />
        </button>
        <button
          ref={tabRef}
          type="button"
          id="a11y-dock-tab"
          className="a11y-dock__tab"
          aria-expanded={!docked}
          aria-label={t.dockTab}
          onClick={() => setDocked(false)}
        >
          <ArrowIcon />
        </button>
      </div>

      <div
        id="a11y-panel"
        className={`a11y-widget__panel${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-panel-title"
        aria-hidden={!open}
        ref={panelRef}
      >
        <div className="a11y-widget__header">
          <h2 id="a11y-panel-title" className="a11y-widget__title">{t.panelTitle}</h2>
          <button type="button" id="a11y-close" className="a11y-widget__close" aria-label={t.close} onClick={closePanel}>
            ×
          </button>
        </div>

        <div className="a11y-widget__body">
          <fieldset className="a11y-widget__group">
            <legend className="a11y-widget__group-label">{t.textSize}</legend>
            <div className="a11y-widget__segmented" role="radiogroup" aria-label={t.textSize}>
              {TEXT_SIZES.map((size) => (
                <RadioSegment
                  key={size}
                  checked={settings.textSize === size}
                  label={textSizeLabels[size]}
                  onSelect={() => setTextSize(size)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="a11y-widget__group">
            <legend className="a11y-widget__group-label">{t.contrast}</legend>
            <div className="a11y-widget__segmented" role="radiogroup" aria-label={t.contrast}>
              {CONTRAST_VALUES.map((value) => (
                <RadioSegment
                  key={value}
                  checked={settings.contrast === value}
                  label={contrastLabels[value]}
                  onSelect={() => setContrast(value)}
                />
              ))}
            </div>
          </fieldset>

          <div className="a11y-widget__group">
            {TOGGLE_KEYS.map((key) => (
              <SwitchRow key={key} label={toggleLabels[key]} checked={settings[key]} onChange={() => toggle(key)} />
            ))}
          </div>

          <button type="button" id="a11y-reset" className="a11y-widget__reset" onClick={reset}>
            {t.reset}
          </button>
        </div>
      </div>
    </>
  );
}

function RadioSegment({ checked, label, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      tabIndex={checked ? 0 : -1}
      className="a11y-widget__segment"
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const group = e.currentTarget.closest('[role="radiogroup"]');
        const options = Array.from(group.querySelectorAll('[role="radio"]'));
        const index = options.indexOf(e.currentTarget);
        const next = options[(index + (e.key === 'ArrowRight' ? 1 : options.length - 1)) % options.length];
        next.focus();
        next.click();
      }}
    >
      {label}
    </button>
  );
}

function SwitchRow({ label, checked, onChange }) {
  return (
    <label className="a11y-widget__switch-row">
      <span>{label}</span>
      <input type="checkbox" role="switch" checked={checked} onChange={onChange} />
    </label>
  );
}
