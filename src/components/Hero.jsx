import { useEffect, useRef } from 'react';

function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let dots = [];

    function initDots(w, h) {
      const count = Math.max(50, Math.min(Math.floor((w * h) / 10000), 110));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: Math.random() * 1.6 + 0.8,
      }));
    }

    function resize() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
      initDots(w, h);
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const MAX_DIST = 160;

    function draw() {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.55;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(196, 181, 253, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(221, 214, 254, 0.85)';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}

const TEXTS = {
  ru: {
    eyebrow: 'Software Engineering Platform',
    title: 'Askan Academy',
    subtitle:
      'База знаний из отдельных разделов по темам программирования. Design Patterns Academy уже открыта — остальные ветви дерева заполняются по мере готовности.',
  },
  en: {
    eyebrow: 'Software Engineering Platform',
    title: 'Askan Academy',
    subtitle:
      'A knowledge base of individual sections on programming topics. Design Patterns Academy is open — other branches fill in as they become ready.',
  },
};

export function Hero({ lang = 'ru' }) {
  const t = TEXTS[lang] ?? TEXTS.ru;

  return (
    <section className="hero-wrapper">
      <NeuralCanvas />
      <div className="hero container">
        <span className="hero__eyebrow">{t.eyebrow}</span>
        <h1 className="hero__title">{t.title}</h1>
        <p className="hero__subtitle">{t.subtitle}</p>
      </div>
    </section>
  );
}
