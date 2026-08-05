import { useEffect, useRef, useState } from 'react';

export function Tabs({ items, defaultIndex = 0, className = '', panelClassName = '', label }) {
  const [active, setActive] = useState(defaultIndex);
  const [scrollState, setScrollState] = useState({ left: false, right: false });
  const listRef = useRef(null);

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
    const activeTab = listRef.current?.children[active];
    activeTab?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [active]);

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
            type="button"
            role="tab"
            className={`tabs__tab ${i === active ? 'is-active' : ''}`}
            aria-selected={i === active}
            onClick={() => setActive(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={`tabs__panel ${panelClassName}`} role="tabpanel">
        {items[active]?.content}
      </div>
    </div>
  );
}
