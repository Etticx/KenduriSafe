'use client';
import { useEffect, useReducer, useRef, useState } from 'react';
import { reducer, START, total } from './reducer';
import { Store, Icon } from './ui';
import { PHASES } from './data';
import { SCREENS } from './screens';

const KEY = 'securekenduri-prototype';

// who each "View as" button signs in as
const PERSONAS = {
  host: { user: { role: 'host', name: 'Nur Aisyah', phone: '012-345 6789' }, screen: s => (s.booking ? 'tracker' : 'search') },
  caterer: { user: { role: 'caterer', name: 'Dapur Mak Long', phone: '013-222 1010', catererId: 'mak-long' }, screen: () => 'cdash' },
  admin: { user: { role: 'admin', name: 'Admin' }, screen: () => 'admin' },
};

export default function Shell() {
  const [s, d] = useReducer(reducer, START);
  const [ready, setReady] = useState(false);
  const scroller = useRef(null);

  // per-viewer convenience: keep the demo where it was after a refresh.
  // Saving waits for `ready`, so the empty first render never overwrites the saved demo.
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem(KEY)); if (saved) d({ type: 'load', state: saved }); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }, [s, ready]);

  // each new screen starts at the top, and its .rv blocks rise in once they reach the visible part of the screen
  // (checked on scroll rather than with an observer, so blocks skipped past by a fast scroll still appear)
  useEffect(() => {
    const body = scroller.current?.querySelector('.body');
    if (!body) return;
    body.scrollTo(0, 0);
    let i = 0;
    const show = () => {
      const bottom = body.getBoundingClientRect().bottom - 24;
      body.querySelectorAll('.rv:not(.in)').forEach(el => {
        if (el.getBoundingClientRect().top < bottom) { el.style.setProperty('--d', `${Math.min(i++, 6) * 60}ms`); el.classList.add('in'); }
      });
      i = 0;
    };
    show();
    // re-check when layout settles: web fonts loading, the window resizing, the tab becoming visible
    const raf = requestAnimationFrame(show), ro = new ResizeObserver(show);
    ro.observe(body);
    document.fonts?.ready.then(show);
    body.addEventListener('scroll', show, { passive: true });
    return () => { cancelAnimationFrame(raf); ro.disconnect(); body.removeEventListener('scroll', show); };
  }, [s.screen, s.params, s.booking]);

  const Screen = SCREENS[s.screen] || SCREENS.welcome;
  const b = s.booking, paidUp = b && b.paid >= total(b);
  const nextSkip = ['Skip to 14 days before', 'Skip to event day', 'Skip 48 hours'][s.phase];
  const blocked = !b || b.status === 'agreed' ? 'Book and pay a deposit first.'
    : s.phase === 1 && !paidUp ? 'Pay the balance first. Unpaid bookings auto-cancel 14 days before.' : '';
  const viewAs = role => d({ type: 'login', user: PERSONAS[role].user, screen: PERSONAS[role].screen(s) });

  return (
    <Store.Provider value={[s, d]}>
      <div className="stage">
        <div className="phone" ref={scroller}>
          <div className="status" aria-hidden="true"><span>9:41</span><span className="mono">SecureKenduri</span><span className="batt" /></div>
          <div className="scr" key={s.screen + JSON.stringify(s.params)}><Screen /></div>
        </div>

        <aside className="demo" aria-label="Demo controls">
          <p className="eyebrow mono">Prototype controls</p>
          <p className="demo-note">Clickable prototype. No real accounts, codes or payments: any phone number and any 6-digit code work.</p>

          <section>
            <p className="mono demo-h">View as</p>
            <div className="seg">
              {['host', 'caterer', 'admin'].map(r => (
                <button key={r} className={s.user?.role === r && (r !== 'caterer' || s.user.catererId) ? 'on' : ''} onClick={() => viewAs(r)}>
                  {r === 'host' ? 'Host' : r === 'caterer' ? 'Caterer' : 'Admin'}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="mono demo-h">Demo clock</p>
            <p className="clock"><Icon name="clock" size={16} /> {PHASES[s.phase]}</p>
            {nextSkip && <button className="btn btn-ghost mono demo-btn" disabled={!!blocked} onClick={() => d({ type: 'skip' })}>{nextSkip} <span aria-hidden="true">&rarr;</span></button>}
            {nextSkip && blocked && <p className="demo-hint">{blocked}</p>}
          </section>

          <section>
            <label className="mono demo-h" htmlFor="jump">Jump to screen</label>
            <select id="jump" value={s.screen} onChange={e => d({ type: 'jump', screen: e.target.value })}>
              {Object.entries(SCREENS).map(([id, C]) => <option key={id} value={id}>{C.title || id}</option>)}
            </select>
          </section>

          <button className="demo-reset mono" onClick={() => { try { localStorage.removeItem(KEY); } catch {} d({ type: 'reset' }); }}>Reset demo</button>
        </aside>
      </div>
    </Store.Provider>
  );
}
