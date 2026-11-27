'use client';
import { useEffect, useRef } from 'react';
import { dither } from '@/lib/dither';
import { ARTS } from '@/lib/arts';

// A canvas that draws one of the dot-art shapes. With `animate`, it redraws at ~20fps
// while on screen (and never when the visitor prefers reduced motion).
// `param` is passed through to the shape (e.g. which way the eKYC face is turned).
export default function DitherArt({ art, animate = false, param, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, f = ARTS[art];
    let t = 0, on = false, last = 0, raf = 0, io;
    const draw = () => dither(cv, (x, y, w, h) => f(x, y, w, h, t, param));
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(cv);
    if (animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const tick = now => {
        if (!on) return;
        if (now - last > 50) { last = now; t = now / 1000; draw(); }
        raf = requestAnimationFrame(tick);
      };
      io = new IntersectionObserver(([e]) => { on = e.isIntersecting; cancelAnimationFrame(raf); if (on) raf = requestAnimationFrame(tick); });
      io.observe(cv);
    }
    return () => { on = false; cancelAnimationFrame(raf); ro.disconnect(); io?.disconnect(); };
  }, [art, animate, param]);
  return <canvas ref={ref} aria-hidden="true" {...props} />;
}
