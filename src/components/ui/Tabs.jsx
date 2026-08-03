import { useState } from 'react';

export function Tabs({ items, defaultIndex = 0, className = '', panelClassName = '' }) {
  const [active, setActive] = useState(defaultIndex);

  return (
    <div className={`tabs ${className}`}>
      <div className="tabs__list" role="tablist">
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
