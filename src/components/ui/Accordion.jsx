import { useState, useRef, useId } from 'react';

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div className={`accordion__item${isOpen ? ' is-open' : ''}`}>
      <h3 className="accordion__heading">
        <button
          className="accordion__trigger"
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen(o => !o)}
        >
          <span>{title}</span>
          <svg
            className="accordion__icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            focusable="false"
          >
            <polyline points="5 8 10 13 15 8" />
          </svg>
        </button>
      </h3>
      <div
        className="accordion__panel"
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        ref={panelRef}
        style={{ maxHeight: isOpen ? `${panelRef.current?.scrollHeight ?? 9999}px` : '0px' }}
      >
        <div className="accordion__content">
          {content}
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items = [] }) {
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <AccordionItem key={i} title={item.title} content={item.content} />
      ))}
    </div>
  );
}
