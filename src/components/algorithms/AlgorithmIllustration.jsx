import { useEffect, useRef, useState } from 'react';
import { imageFor } from '../../utils/algorithmImages.js';

export function AlgorithmIllustration({ slug, alt }) {
  const src = imageFor(slug);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  if (!src) return null;

  return (
    <div
      ref={ref}
      className={`algorithm-illustration${isVisible ? ' is-visible' : ''}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="algorithm-illustration__img"
      />
    </div>
  );
}
