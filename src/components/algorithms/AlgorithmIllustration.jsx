import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { imageFor } from '../../utils/algorithmImages.js';

export function AlgorithmIllustration({ slug, alt, t }) {
  const src = imageFor(slug);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!src) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    if (!isExpanded) return undefined;
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  function closeLightbox() {
    setIsExpanded(false);
    triggerRef.current?.focus();
  }

  if (!src) return null;

  return (
    <>
      <div
        ref={ref}
        className={`algorithm-illustration${isVisible ? ' is-visible' : ''}`}
      >
        <button
          ref={triggerRef}
          type="button"
          className="algorithm-illustration__trigger"
          onClick={() => setIsExpanded(true)}
          aria-label={t.illustrationExpand}
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="algorithm-illustration__img"
          />
        </button>
      </div>
      {isExpanded && createPortal(
        <div
          className="illustration-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={closeLightbox}
        >
          <button
            ref={closeRef}
            type="button"
            className="illustration-lightbox__close"
            onClick={closeLightbox}
            aria-label={t.illustrationClose}
          >
            ×
          </button>
          <img
            src={src}
            alt={alt}
            className="illustration-lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}
