'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// Main nav with the Caterers mega menu: opens on hover (short delay, so passing over it doesn't flash it),
// on click/tap and from the keyboard; Escape, a click outside or focus leaving closes it.
export default function Nav({ current }) {
  const [open, setOpen] = useState(false);
  const dd = useRef(null), btn = useRef(null), timer = useRef(0);
  const set = v => { clearTimeout(timer.current); setOpen(v); };
  const later = (v, ms) => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(v), ms); };
  const hover = () => matchMedia('(hover: hover)').matches;

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) return;
    const key = e => { if (e.key === 'Escape') { set(false); btn.current.focus(); } };
    const click = e => { if (!dd.current.contains(e.target)) set(false); };
    document.addEventListener('keydown', key);
    document.addEventListener('click', click);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('click', click); };
  }, [open]);

  const here = name => (current === name ? 'page' : undefined);
  return (
    <nav aria-label="Main">
      <Link className="logo" href="/">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>
        SecureKenduri
      </Link>
      <div className="links">
        <div className={open ? 'dd open' : 'dd'} ref={dd}
          onMouseEnter={() => hover() && later(true, 120)}
          onMouseLeave={() => hover() && later(false, 160)}
          onBlur={e => { if (!dd.current.contains(e.relatedTarget)) set(false); }}>
          <button ref={btn} className="dd-btn" type="button" aria-expanded={open} aria-controls="dd-caterers" onClick={() => set(!open)}>
            Caterers<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="m2 4 3 3 3-3" stroke="currentColor" fill="none" strokeWidth="1.4"/></svg>
          </button>
          <div className="dd-panel" id="dd-caterers" role="region" aria-label="Browse caterers">
          <div className="dd-grid">
          <div className="dd-col"><p className="dd-h mono">By occasion</p><ul><li><a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg><span><b>Weddings</b><small>Majlis perkahwinan &middot; 300&ndash;2,000 pax</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg><span><b>Aqiqah &amp; doa selamat</b><small>Family events at home</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg><span><b>Corporate &amp; office</b><small>Lunches, launches, annual dinners</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg><span><b>Open house &amp; Raya</b><small>Rumah terbuka, all-day buffets</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg><span><b>Tahlil &amp; small gatherings</b><small>30&ndash;150 pax, quick setup</small></span><i aria-hidden="true">&rarr;</i></a></li></ul></div>
          <div className="dd-col"><p className="dd-h mono">By menu</p><ul><li><a href="#"><span><b>Nasi minyak &amp; beriani</b><small>Classic wedding rice sets</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><span><b>Traditional Malay</b><small>Kampung lauk, gulai, masak lemak</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><span><b>Buffet &amp; BBQ</b><small>Live stations, satay, kambing golek</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><span><b>Dulang / hidang</b><small>Shared trays served to the table</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><span><b>Kuih &amp; desserts</b><small>Kuih muih, pengat, bubur</small></span><i aria-hidden="true">&rarr;</i></a></li></ul></div>
          <div className="dd-col"><p className="dd-h mono">By area</p><ul><li><a href="#"><span><b>Klang Valley</b><small>Selangor, KL, Putrajaya</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><span><b>Johor</b><small>JB, Batu Pahat, Muar</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><span><b>Penang</b><small>Island, Seberang Perai</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><span><b>Perak</b><small>Ipoh, Taiping, Teluk Intan</small></span><i aria-hidden="true">&rarr;</i></a></li><li><a href="#"><span><b>All states</b><small>Browse the whole map</small></span><i aria-hidden="true">&rarr;</i></a></li></ul></div>
          <a className="dd-feature" href="#"><span className="dd-photo"><img src="/assets/buffet.jpg" alt="Buffet dishes kept warm in food warmers" loading="lazy" /></span><span className="mono">Top rated this month</span><b>Dapur Mak Long</b><small>Shah Alam &middot; 4.9 &#9733; (212 reviews)</small><span className="go">Browse all caterers &rarr;</span></a>
          </div>
          </div>
        </div>
        <Link href="/#how">How it works</Link>
        <Link href="/for-caterers" aria-current={here('caterers')}>For caterers</Link>
        <Link href="/about" aria-current={here('about')}>About</Link>
        <Link className="btn btn-primary btn-sm mono" href="/prototype">Book now <span aria-hidden="true">&rarr;</span></Link>
      </div>
    </nav>
  );
}
