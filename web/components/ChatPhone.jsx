'use client';
import { useEffect, useRef, useState } from 'react';
import DitherArt from './DitherArt';

// Dotted phone with a one-sided chat; the bubbles play in once, when it scrolls into view (CSS keys off .play).
export default function ChatPhone({ children }) {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPlay(true); io.disconnect(); } }, { threshold: .4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={play ? 'chat play' : 'chat'} role="img"
      aria-label="A host's chat with a caterer: the deposit is sent, then the host's messages go unanswered the night before the event.">
      <DitherArt id="phone" art="phone" />
      {children}
    </div>
  );
}
