import {useEffect, useRef} from 'react';

const ORION_ASPECT = 0.519;

const STARS = [
    {nx: 0.493, ny: 0.000, r: 1.5, glow: [140, 185, 255], core: [205, 228, 255]}, // Meissa    λ Ori B1
    {nx: 0.000, ny: 0.129, r: 3.8, glow: [255, 85, 25], core: [255, 175, 80]}, // Betelgeuse α Ori M2 ★
    {nx: 0.739, ny: 0.183, r: 2.5, glow: [140, 185, 255], core: [205, 228, 255]}, // Bellatrix  γ Ori B2
    {nx: 0.570, ny: 0.522, r: 2.0, glow: [125, 170, 255], core: [195, 222, 255]}, // Mintaka    δ Ori O9 belt
    {nx: 0.467, ny: 0.568, r: 2.4, glow: [125, 170, 255], core: [195, 222, 255]}, // Alnilam    ε Ori B0 belt
    {nx: 0.354, ny: 0.606, r: 2.3, glow: [125, 170, 255], core: [195, 222, 255]}, // Alnitak    ζ Ori O9 belt
    {nx: 0.182, ny: 1.000, r: 2.1, glow: [130, 175, 255], core: [200, 225, 255]}, // Saiph      κ Ori B0
    {nx: 1.000, ny: 0.925, r: 4.0, glow: [145, 190, 255], core: [235, 244, 255]}, // Rigel      β Ori B8 ★
    {nx: 0.485, ny: 0.808, r: 1.8, glow: [125, 170, 255], core: [195, 222, 255]}, // Hatsya     ι Ori O9 sword
];

const EDGES = [
    [0, 1], [0, 2],
    [1, 5], [2, 3],
    [3, 4], [4, 5],
    [5, 6], [3, 7],
    [4, 8],
];

const easeOutExpo = t => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

const T_APPEAR = 600;
const T_FLY = 1800;
const T_HOLD = 4100;
const T_TOTAL = 4500;
const T_TEXT_START = T_FLY + 150;
const T_TEXT_ZOOM = 600;

export function PageIntro({onComplete}) {
    const canvasRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            onComplete();
            return;
        }

        const canvas = canvasRef.current;
        const overlay = overlayRef.current;
        if (!canvas || !overlay) return;

        const ctx = canvas.getContext('2d');
        let animId;

        const W = window.innerWidth;
        const H = window.innerHeight;
        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = W * DPR;
        canvas.height = H * DPR;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
        ctx.scale(DPR, DPR);

        const hMargin = W * 0.08;
        const vMargin = H * 0.09;
        const availW = W - hMargin * 2;
        const availH = H - vMargin * 2;
        let cW, cH;
        if (availW / ORION_ASPECT <= availH) {
            cW = availW;
            cH = cW / ORION_ASPECT;
        } else {
            cH = availH;
            cW = cH * ORION_ASPECT;
        }
        const ox = (W - cW) / 2;
        const oy = (H - cH) / 2;

        const cx = ox + cW * 0.5;
        const cy = oy + cH * 0.5;
        const explosionDist = Math.max(W, H) * 1.8;
        const nebX = ox + 0.489 * cW;
        const nebY = oy + 0.782 * cH;
        const textRestX = W / 2;
        const textRestY = cy - 26;

        const stars = STARS.map((s, i) => {
            const tx = ox + s.nx * cW;
            const ty = oy + s.ny * cH;
            let dx = tx - cx, dy = ty - cy;
            if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
                dx = 0;
                dy = -1;
            }
            const len = Math.sqrt(dx * dx + dy * dy);
            return {
                tx, ty,
                sx: (0.05 + Math.random() * 0.90) * W,
                sy: (0.05 + Math.random() * 0.90) * H,
                ex: tx + (dx / len) * explosionDist,
                ey: ty + (dy / len) * explosionDist,
                r: s.r, glow: s.glow, core: s.core,
                delay: i * 52,
            };
        });

        const bgStars = Array.from({length: 480}, () => {
            const distant = Math.random() < 0.12;
            return {
                x: Math.random() * W,
                y: Math.random() * H,
                r: distant ? Math.random() * 1.0 + 0.9 : Math.random() * 0.6 + 0.15,
                op: distant ? Math.random() * 0.32 + 0.32 : Math.random() * 0.28 + 0.05,
                phase: Math.random() * Math.PI * 2,
            };
        });

        const t0 = performance.now();
        let stopped = false;
        let skipped = false;

        function draw(now) {
            if (stopped) return;
            const e = now - t0;
            ctx.clearRect(0, 0, W, H);

            const bgAlpha = e < T_HOLD
                ? Math.min(e / 480, 1)
                : Math.max(0, 1 - easeOutCubic((e - T_HOLD) / (T_TOTAL - T_HOLD)));

            for (const s of bgStars) {
                const tw = 0.70 + 0.30 * Math.sin(now * 0.00082 + s.phase);
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 215, 255, ${s.op * bgAlpha * tw})`;
                ctx.fill();
            }

            const pos = stars.map((s) => {
                const se = Math.max(0, e - s.delay);
                if (e < T_APPEAR) {
                    const t = easeOutExpo(Math.min(se / (T_APPEAR * 0.85), 1));
                    return {x: s.sx, y: s.sy, op: t, sc: 0.5 + t * 0.5};
                }
                if (e < T_FLY) {
                    const t = easeOutCubic((e - T_APPEAR) / (T_FLY - T_APPEAR));
                    return {x: s.sx + (s.tx - s.sx) * t, y: s.sy + (s.ty - s.sy) * t, op: 1, sc: 1};
                }
                if (e < T_HOLD) {
                    const pulse = 1 + 0.18 * Math.sin((e - T_FLY) / (T_HOLD - T_FLY) * Math.PI * 3);
                    return {x: s.tx, y: s.ty, op: 1, sc: pulse};
                }
                const et = easeOutCubic(Math.min((e - T_HOLD) / (T_TOTAL - T_HOLD), 1));
                const lt = Math.min((e - T_HOLD) / (T_TOTAL - T_HOLD), 1);
                return {
                    x: s.tx + (s.ex - s.tx) * et,
                    y: s.ty + (s.ey - s.ty) * et,
                    op: Math.max(0, 1 - lt * 1.6),
                    sc: 1 + et * 1.2,
                };
            });

            if (e > T_APPEAR) {
                const lt = e < T_FLY
                    ? Math.min((e - T_APPEAR) / ((T_FLY - T_APPEAR) * 0.55), 1)
                    : e < T_HOLD ? 1
                        : Math.max(0, 1 - easeOutCubic((e - T_HOLD) / (T_TOTAL - T_HOLD)) * 3);
                if (lt > 0.01) {
                    ctx.save();
                    ctx.globalAlpha = lt * 0.30;
                    ctx.strokeStyle = 'rgba(180, 208, 255, 1)';
                    ctx.lineWidth = 0.8;
                    for (const [i, j] of EDGES) {
                        ctx.beginPath();
                        ctx.moveTo(pos[i].x, pos[i].y);
                        ctx.lineTo(pos[j].x, pos[j].y);
                        ctx.stroke();
                    }
                    ctx.restore();
                }
            }
            if (e > T_FLY && e < T_HOLD + 200) {
                const nb = e < T_FLY + 500
                    ? easeOutExpo((e - T_FLY) / 500)
                    : e < T_HOLD ? 1
                        : Math.max(0, 1 - (e - T_HOLD) / 200);
                if (nb > 0.01) {
                    const nr = Math.min(cW, cH) * 0.13;
                    const ng = ctx.createRadialGradient(nebX, nebY, 0, nebX, nebY, nr);
                    ng.addColorStop(0, `rgba(140, 210, 175, ${0.24 * nb})`);
                    ng.addColorStop(0.5, `rgba( 90, 160, 225, ${0.11 * nb})`);
                    ng.addColorStop(1, 'rgba( 90, 160, 225, 0)');
                    ctx.beginPath();
                    ctx.arc(nebX, nebY, nr, 0, Math.PI * 2);
                    ctx.fillStyle = ng;
                    ctx.fill();
                }
            }

            for (let i = 0; i < pos.length; i++) {
                const p = pos[i];
                const s = stars[i];
                if (p.op < 0.02) continue;

                const gr = s.r * 9 * p.sc;
                const [g0, g1, g2] = s.glow;
                const [c0, c1, c2] = s.core;

                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
                grd.addColorStop(0, `rgba(${g0}, ${g1}, ${g2}, ${0.55 * p.op})`);
                grd.addColorStop(0.45, `rgba(${g0}, ${g1}, ${g2}, ${0.16 * p.op})`);
                grd.addColorStop(1, `rgba(${g0}, ${g1}, ${g2}, 0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, gr, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(p.x, p.y, s.r * p.sc, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${c0}, ${c1}, ${c2}, ${p.op})`;
                ctx.fill();
            }

            if (e > T_TEXT_START) {
                const zt = Math.min((e - T_TEXT_START) / T_TEXT_ZOOM, 1);
                const et = easeOutCubic(zt);
                const fadeIn = Math.min(zt / 0.3, 1);
                const fadeOut = e > T_HOLD ? Math.max(0, 1 - (e - T_HOLD) / 380) : 1;
                const a = fadeIn * fadeOut;
                if (a > 0.01) {
                    const curX = nebX + (textRestX - nebX) * et;
                    const curY = nebY + (textRestY - nebY) * et;
                    const scale = 0.15 + et * 0.85;

                    ctx.save();
                    ctx.globalAlpha = a;
                    ctx.shadowColor = 'rgba(6, 5, 22, 0.85)';
                    ctx.shadowBlur = 22;
                    ctx.translate(curX, curY);
                    ctx.scale(scale, scale);
                    ctx.textAlign = 'center';
                    ctx.letterSpacing = '0.13em';
                    ctx.font = '600 11px Inter, system-ui, sans-serif';
                    ctx.fillStyle = 'rgba(170, 198, 255, 1)';
                    ctx.fillText('WELCOME TO SOFTWARE ENGINEERING PLATFORM', 0, 0);
                    ctx.letterSpacing = '-0.02em';
                    ctx.font = '700 40px Inter, system-ui, sans-serif';
                    ctx.fillStyle = 'rgba(248, 244, 255, 1)';
                    ctx.fillText('Askan Academy', 0, 52);
                    ctx.restore();
                }
            }

            animId = requestAnimationFrame(draw);
        }

        animId = requestAnimationFrame(draw);

        const revealTimer = setTimeout(() => {
            if (overlay) overlay.style.opacity = '0';
            onComplete();
        }, T_HOLD);

        const stopTimer = setTimeout(() => {
            stopped = true;
            cancelAnimationFrame(animId);
        }, T_TOTAL);

        function skip(event) {
            if (skipped) return;
            skipped = true;
            stopped = true;
            event?.preventDefault();
            cancelAnimationFrame(animId);
            clearTimeout(revealTimer);
            clearTimeout(stopTimer);
            if (overlay) overlay.style.opacity = '0';
            onComplete();
        }

        window.addEventListener('pointerdown', skip);
        window.addEventListener('keydown', skip);

        return () => {
            stopped = true;
            cancelAnimationFrame(animId);
            clearTimeout(revealTimer);
            clearTimeout(stopTimer);
            window.removeEventListener('pointerdown', skip);
            window.removeEventListener('keydown', skip);
        };
    }, [onComplete]);

    return (
        <div ref={overlayRef} className="page-intro" aria-hidden="true">
            <canvas ref={canvasRef} className="page-intro__canvas"/>
        </div>
    );
}
