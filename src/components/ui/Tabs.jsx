import { useEffect, useRef, useState } from 'react';

export function Tabs({ items, defaultIndex = 0, className = '', panelClassName = '', label }) {
  const [active, setActive] = useState(defaultIndex);
  const [scrollState, setScrollState] = useState({ left: false, right: false });
  const listRef = useRef(null);
  const tabRefs = useRef([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = list;
      setScrollState({
        left: scrollLeft > 1,
        right: scrollLeft < scrollWidth - clientWidth - 1,
      });
    };

    updateScrollState();
    list.addEventListener('scroll', updateScrollState, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(list);

    return () => {
      list.removeEventListener('scroll', updateScrollState);
      resizeObserver.disconnect();
    };
  }, [items]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    tabRefs.current[active]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [active]);

  function handleKeyDown(e, i) {
    let next;
    if (e.key === 'ArrowRight') next = (i + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;

    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const listClassName = [
    'tabs__list',
    scrollState.left && 'is-scrollable-left',
    scrollState.right && 'is-scrollable-right',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`tabs ${className}`}>
      <div className={listClassName} role="tablist" aria-label={label} ref={listRef}>
        {items.map((item, i) => (
          <button
            key={item.key}
            ref={el => (tabRefs.current[i] = el)}
            type="button"
            role="tab"
            className={`tabs__tab ${i === active ? 'is-active' : ''}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={e => handleKeyDown(e, i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={`tabs__panel ${panelClassName}`} role="tabpanel" tabIndex={0}>
        {items[active]?.content}
      </div>
    </div>
  );
}
