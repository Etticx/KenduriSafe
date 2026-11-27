'use client';
import { useEffect, useRef } from 'react';

const WORDS = ['kenduri', 'wedding', 'majlis', 'aqiqah', 'dinner', 'reunion'];

// Headline word that swaps every 2.6s: the old word drops out below, the next drops in from above.
// The words are set with innerHTML so React never re-renders the spans the swap replaces.
export default function Rotator() {
  const ref = useRef(null);
  useEffect(() => {
    const rot = ref.current;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let i = 0;
    // width in em, so it still fits when the headline font scales on resize
    const width = el => el.offsetWidth / parseFloat(getComputedStyle(rot).fontSize) + 'em';
    rot.style.width = width(rot.firstElementChild);
    const id = setInterval(() => {
      if (document.hidden || rot.querySelector('.in')) return; // never stack swaps (animations pause in background tabs)
      const old = rot.firstElementChild, next = document.createElement('span');
      next.textContent = WORDS[i = (i + 1) % WORDS.length];
      next.className = 'in';
      rot.append(next);
      old.className = 'out';
      rot.style.width = width(next);
      next.addEventListener('animationend', () => { old.remove(); next.className = ''; }, { once: true });
    }, 2600);
    return () => clearInterval(id);
  }, []);
  return <span className="b rot" ref={ref} dangerouslySetInnerHTML={{ __html: `<span>${WORDS[0]}</span>` }} />;
}
