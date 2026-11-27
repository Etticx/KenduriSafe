'use client';
import { useState } from 'react';
import { useProto, Bar, Foot, Field, Icon } from './ui';
import { CATERERS, AREAS, CHECKS, REVIEWS, catererById, rm } from './data';

export function Search() {
  const [s, d, go] = useProto();
  const [f, setF] = useState({ region: 'Klang Valley', date: '2027-03-14', pax: 500, budget: 0 });
  const set = k => e => setF({ ...f, [k]: k === 'pax' || k === 'budget' ? +e.target.value : e.target.value });
  const b = s.booking, c = b && catererById(b.catererId);
  const right = s.user
    ? <button className="icon-btn" onClick={() => d({ type: 'logout' })} aria-label="Log out"><Icon name="logout" /></button>
    : <button className="icon-btn" onClick={() => go('login')} aria-label="Log in"><Icon name="user" /></button>;
  return (
    <>
      <Bar title="Find a caterer" right={right} />
      <div className="body">
        <h1 className="t-title">{s.user ? <>Salam, {s.user.name.split(' ')[0]}.</> : 'Find your caterer.'}<br /><span className="b">Who&rsquo;s feeding your guests?</span></h1>
        {b && (
          <button className="card booking-peek rv" onClick={() => go('tracker')}>
            <span className="mono">Your booking</span>
            <b>{c.name} &middot; {b.pax} pax</b>
            <small>{b.status === 'agreed' ? 'Deposit not paid yet' : `${rm(b.released)} released of ${rm(b.pax * b.price)}`}</small>
            <Icon name="next" />
          </button>
        )}
        <Field label="Area"><select value={f.region} onChange={set('region')}>{AREAS.map(a => <option key={a}>{a}</option>)}</select></Field>
        <Field label="Event date"><input type="date" value={f.date} onChange={set('date')} /></Field>
        <Field label="Guests" hint="You can change this until 14 days before."><input type="number" inputMode="numeric" min="50" step="10" value={f.pax} onChange={set('pax')} /></Field>
        <Field label="Budget per pax">
          <select value={f.budget} onChange={set('budget')}><option value={0}>Any budget</option><option value={15}>Up to RM15</option><option value={20}>Up to RM20</option></select>
        </Field>
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={() => go('list', f)}><Icon name="search" size={16} /> Show verified caterers</button></Foot>
    </>
  );
}
Search.title = 'Host: search';

export function List() {
  const [s, , go] = useProto();
  const p = s.params.region ? s.params : { region: 'Klang Valley', pax: 500, budget: 0, date: '2027-03-14' };
  const from = c => Math.min(...c.packages.map(k => k.price));
  const hits = CATERERS.filter(c => c.region === p.region && c.maxPax >= p.pax && (!p.budget || from(c) <= p.budget));
  return (
    <>
      <Bar title={p.region} />
      <div className="body">
        <p className="mono result-count">{hits.length} verified caterer{hits.length === 1 ? '' : 's'} &middot; {p.pax} pax</p>
        {hits.length ? (
          <div className="stack">
            {hits.map(c => (
              <button key={c.id} className="card cat rv" onClick={() => go('profile', { ...p, id: c.id })}>
                <span className="cat-photo"><img src={c.photo} alt="" /><span className="chip ok mono"><Icon name="shield" size={12} /> Verified</span></span>
                <span className="cat-body">
                  <b>{c.name}</b>
                  <small><Icon name="pin" size={13} /> {c.area}</small>
                  <span className="cat-foot"><span>from <b>{rm(from(c))}</b> / pax</span><span className="muted"><Icon name="star" size={13} /> {c.rating} ({c.reviews})</span></span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty rv">
            <pre className="ascii" aria-hidden="true">{'  .--------.\n  |  0 / 0 |\n  \'--------\''}</pre>
            <p>No verified caterers match yet. Try another area, a smaller headcount or a higher budget.</p>
            <button className="btn btn-ghost mono" onClick={() => go(-1)}>Change search</button>
          </div>
        )}
      </div>
    </>
  );
}
List.title = 'Host: caterer list';

export function Profile() {
  const [s, d, go] = useProto();
  const p = s.params, c = catererById(p.id) || CATERERS[0];
  const [pkg, setPkg] = useState(c.packages.at(-1).id);
  const k = c.packages.find(x => x.id === pkg), pax = p.pax || 500;
  const book = () => {
    const next = { screen: 'agreement', params: { id: c.id, pkg, pax, date: p.date || '2027-03-14' } };
    if (s.user?.role === 'host') go(next.screen, next.params);
    else { d({ type: 'after', after: next }); go('signup-host'); } // guests sign up here, then land back on the agreement
  };
  return (
    <>
      <Bar title={c.name} />
      <div className="body flush">
        <div className="prof-photo"><img src={c.photo} alt={`Food from ${c.name}`} /></div>
        <div className="pad">
          <h1 className="t-title">{c.name}</h1>
          <p className="t-sub"><Icon name="pin" size={14} /> {c.area} &middot; <Icon name="star" size={14} /> {c.rating} ({c.reviews} reviews) &middot; up to {c.maxPax.toLocaleString('en-MY')} pax</p>

          <p className="label mono">Verified by SecureKenduri</p>
          <ul className="checks">
            {CHECKS.map(([t, sub]) => <li key={t} className="rv"><span className="tick"><Icon name="check" size={14} /></span><span><b>{t}</b><small>{sub}</small></span></li>)}
          </ul>

          <p className="label mono">Packages</p>
          <div className="stack" role="radiogroup" aria-label="Package">
            {c.packages.map(x => (
              <button key={x.id} role="radio" aria-checked={pkg === x.id} className={pkg === x.id ? 'card pkg on' : 'card pkg'} onClick={() => setPkg(x.id)}>
                <span className="pkg-top"><b>{x.name}</b><span><b>{rm(x.price)}</b> / pax</span></span>
                <small>{x.menu.join(' · ')}</small>
              </button>
            ))}
          </div>

          <p className="label mono">Reviews from real bookings</p>
          <div className="stack">
            {REVIEWS.map(r => (
              <figure key={r.who} className="card review rv">
                <span className="stars" aria-label={`${r.stars} out of 5`}>{'★'.repeat(r.stars)}<span className="muted">{'★'.repeat(5 - r.stars)}</span></span>
                <blockquote>{r.text}</blockquote>
                <figcaption className="mono">{r.who} &middot; {r.pax} pax &middot; verified booking</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
      <Foot>
        <p className="foot-sum"><span>{pax} pax &times; {rm(k.price)}</span><b>{rm(pax * k.price)}</b></p>
        <button className="btn btn-primary btn-block mono" onClick={book}>Book this package &rarr;</button>
      </Foot>
    </>
  );
}
Profile.title = 'Host: caterer profile';
