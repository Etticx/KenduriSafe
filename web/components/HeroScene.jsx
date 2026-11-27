'use client';
import { useEffect, useRef } from 'react';
import { startHeroScene } from '@/lib/heroScene';

// The landing-page canvas scene; it measures the hero's headline and buttons, so it sits inside the <header>.
export default function HeroScene() {
  const ref = useRef(null);
  useEffect(() => startHeroScene(ref.current), []);
  return <div id="mtn" aria-hidden="true" ref={ref} />;
}
