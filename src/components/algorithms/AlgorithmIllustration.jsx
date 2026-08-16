import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { imageFor } from '../../utils/algorithmImages.js';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function AlgorithmIllustration({ category, slug, alt, t }) {
  const src = imageFor(category, slug);
  const ref = useRef(null);
  const heroImgRef = useRef(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const lightboxImgRef = useRef(null);
  const originRectRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [phase, setPhase] = useState('closed'); // closed | opening | open | closing

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
    if (heroImgRef.current?.complete) setIsLoaded(true);
  }, [src]);

  function openLightbox() {
    originRectRef.current = triggerRef.current.getBoundingClientRect();
    setPhase(prefersReducedMotion() ? 'open' : 'opening');
  }

  function closeLightbox() {
    if (prefersReducedMotion()) {
      setPhase('closed');
      triggerRef.current?.focus();
      return;
    }
    const img = lightboxImgRef.current;
    const origin = triggerRef.current?.getBoundingClientRect();
    if (img && origin) {
      const target = img.getBoundingClientRect();
      const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
      const dy = origin.top + origin.height / 2 - (target.top + target.height / 2);
      const sx = origin.width / target.width;
      const sy = origin.height / target.height;
      img.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      img.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    }
    setPhase('closing');
  }

  function handleTransitionEnd() {
    if (phase === 'closing') {
      setPhase('closed');
      triggerRef.current?.focus();
    }
  }

  useLayoutEffect(() => {
    if (phase !== 'opening') return;
    const img = lightboxImgRef.current;
    const origin = originRectRef.current;
    if (!img || !origin) return;

    const target = img.getBoundingClientRect();
    const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
    const dy = origin.top + origin.height / 2 - (target.top + target.height / 2);
    const sx = origin.width / target.width;
    const sy = origin.height / target.height;

    img.style.transition = 'none';
    img.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    img.offsetHeight;

    requestAnimationFrame(() => {
      img.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      img.style.transform = 'none';
      setPhase('open');
    });
  }, [phase]);

  const isOpenish = phase !== 'closed';

  useEffect(() => {
    if (!isOpenish) return undefined;
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
  }, [isOpenish]);

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
          onClick={openLightbox}
          aria-label={t.illustrationExpand}
        >
          <img
            ref={heroImgRef}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`algorithm-illustration__img${isLoaded ? ' is-loaded' : ''}`}
          />
        </button>
      </div>
      {isOpenish && createPortal(
        <div
          className={`illustration-lightbox${phase === 'open' ? ' is-open' : ''}`}
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
            ref={lightboxImgRef}
            src={src}
            alt={alt}
            className="illustration-lightbox__img"
            onClick={(e) => e.stopPropagation()}
            onTransitionEnd={handleTransitionEnd}
          />
        </div>,
        document.body
      )}
    </>
  );
}
