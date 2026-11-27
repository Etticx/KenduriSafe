'use client';
import { useState } from 'react';
import './planner.css';

// Example amounts per pax; a caterer would set their own per menu.
const ITEMS = [
  ['Beras (nasi minyak)', .12, 'kg'],
  ['Ayam (masak merah)', .25, 'kg'],
  ['Daging (rendang)', .1, 'kg'],
  ['Sayur (acar)', .08, 'kg'],
  ['Air sirap', .3, 'L'],
];
const MAX = 1000, TOP = Math.max(...ITEMS.map(i => i[1])) * MAX; // bars are relative to the biggest amount at 1,000 pax
const fmt = n => n.toLocaleString('en-MY', { maximumFractionDigits: 1 });

// Headcount planner demo: drag the guests, the shopping list and its dotted bars rescale.
export default function Planner({ initial = 300 }) {
  const [pax, setPax] = useState(initial);
  return (
    <div className="planner">
      <label className="pax" htmlFor="pax"><span className="mono">Guests</span><output id="pax-out" htmlFor="pax">{fmt(pax)}</output><span className="mono">pax</span></label>
      <input id="pax" type="range" min="50" max={MAX} step="10" value={pax} onChange={e => setPax(+e.target.value)} />
      <ul id="list">
        {ITEMS.map(([name, per, unit]) => (
          <li key={name} style={{ '--w': (pax * per / TOP) * 100 + '%' }}><span>{name}</span><b>{fmt(pax * per)} {unit}</b></li>
        ))}
      </ul>
      <p className="note mono">Example amounts per pax. You set your own.</p>
    </div>
  );
}
