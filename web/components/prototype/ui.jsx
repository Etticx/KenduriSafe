'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { rm } from './data';

export const Store = createContext(null);
// [state, dispatch, go]: go(screen, params) pushes a screen, go(-1) goes back
export function useProto() {
  const [s, d] = useContext(Store);
  const go = (screen, params) => d(screen === -1 ? { type: 'back' } : { type: 'go', screen, params });
  return [s, d, go];
}

export const reduced = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// Lucide-style line icons, one stroke weight everywhere
const P = {
  back: 'M15 18l-6-6 6-6', next: 'M9 18l6-6-6-6', check: 'M20 6 9 17l-5-5', x: 'M18 6 6 18M6 6l12 12',
  shield: 'M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6zM8.5 12l2.5 2.5 4.5-5',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  pin: 'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  calendar: 'M3 5h18v16H3zM16 3v4M8 3v4M3 10h18', users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  star: 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z',
  camera: 'M3 7h4l2-3h6l2 3h4v13H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
  receipt: 'M5 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1zM9 8h6M9 12h6M9 16h4',
  bank: 'M3 21h18M5 18v-7M10 18v-7M14 18v-7M19 18v-7M12 3l9 5H3z', file: 'M14 2H6v20h12V8zM14 2v6h6M9 13h6M9 17h6',
  chef: 'M6 13.9A4 4 0 0 1 7.8 6a5 5 0 0 1 8.4 0A4 4 0 0 1 18 13.9V21H6zM6 17h12', home: 'M3 10l9-7 9 7v11h-6v-6H9v6H3z',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2', plus: 'M12 5v14M5 12h14', minus: 'M5 12h14',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', logout: 'M9 21H5V3h4M16 17l5-5-5-5M21 12H9',
  scan: 'M3 7V3h4M17 3h4v4M21 17v4h-4M7 21H3v-4M7 12h10',
};
export function Icon({ name, size = 20, label }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}><path d={P[name]} /></svg>
  );
}

// top app bar: back button (when there is somewhere to go back to), title, optional right slot
export function Bar({ title, right, back = true }) {
  const [s, , go] = useProto();
  return (
    <header className="bar">
      {back && s.history.length ? <button className="icon-btn" onClick={() => go(-1)} aria-label="Back"><Icon name="back" /></button> : <span className="icon-gap" />}
      <p className="bar-title">{title}</p>
      {right || <span className="icon-gap" />}
    </header>
  );
}

// fixed bottom action area, so the main button is always under the thumb
export const Foot = ({ children }) => <div className="foot">{children}</div>;

export function Field({ label, hint, error, children }) {
  return (
    <label className={error ? 'field bad' : 'field'}>
      <span className="field-label mono">{label}</span>
      {children}
      {(error || hint) && <span className="field-hint" role={error ? 'alert' : undefined}>{error || hint}</span>}
    </label>
  );
}

// RM amount that counts up to its new value (instant with reduced motion)
export function Money({ value, className }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduced() || from.current === value) { from.current = value; setShown(value); return; }
    const a = from.current, t0 = performance.now(); let raf;
    const step = now => {
      const k = Math.min(1, (now - t0) / 700), e = 1 - (1 - k) ** 3;
      setShown(a + (value - a) * e);
      if (k < 1) raf = requestAnimationFrame(step); else from.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); from.current = value; };
  }, [value]);
  return <span className={className}>{rm(shown)}</span>;
}

// released (solid blue) / held by Curlec (soft blue) / not paid yet (grey); segments scale in with transform
export function MoneyBar({ total, paid, released }) {
  const pct = v => (total ? v / total : 0);
  return (
    <div className="mbar">
      <div className="mbar-track" role="img" aria-label={`${rm(released)} released to caterer, ${rm(paid - released)} held by Curlec, ${rm(total - paid)} not paid yet`}>
        <span className="mbar-held" style={{ transform: `scaleX(${pct(paid)})` }} />
        <span className="mbar-paid" style={{ transform: `scaleX(${pct(released)})` }} />
      </div>
      <dl className="mbar-legend">
        <div><dt className="mono"><i className="sw sw-paid" />Released</dt><dd><Money value={released} /></dd></div>
        <div><dt className="mono"><i className="sw sw-held" />Held by Curlec</dt><dd><Money value={paid - released} /></dd></div>
        <div><dt className="mono"><i className="sw" />Not paid yet</dt><dd><Money value={total - paid} /></dd></div>
      </dl>
    </div>
  );
}

export function Steps({ n, of, label }) {
  return (
    <div className="steps">
      <p className="mono">Step {n} of {of} · {label}</p>
      <div className="steps-bar" aria-hidden="true">{Array.from({ length: of }, (_, i) => <i key={i} className={i < n ? 'on' : ''} />)}</div>
    </div>
  );
}

// ASCII progress for simulated waits (code check, payment, face match): [#####.....] then done()
export function Working({ label, ms = 1600, done }) {
  const [k, setK] = useState(0);
  const cb = useRef(done); cb.current = done;
  useEffect(() => {
    const n = 18, id = setInterval(() => setK(v => Math.min(n, v + 1)), ms / n);
    const t = setTimeout(() => cb.current?.(), ms + 250);
    return () => { clearInterval(id); clearTimeout(t); };
  }, [ms]);
  return (
    <div className="working" role="status" aria-live="polite">
      <pre className="ascii" aria-hidden="true">[{'#'.repeat(k)}{'.'.repeat(18 - k)}] {String(Math.round(k / 18 * 100)).padStart(3)}%</pre>
      <p className="mono">{label}</p>
    </div>
  );
}

// small labelled row used in summaries
export const Row = ({ k, v }) => <div className="row"><span>{k}</span><b>{v}</b></div>;
