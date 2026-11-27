'use client';
import { useEffect, useState } from 'react';
import DitherArt from '@/components/DitherArt';
import { useProto, Bar, Foot, Field, Icon, MoneyBar } from './ui';
import { catererById, rm } from './data';
import { total } from './reducer';

const day = (iso, minus = 0) => { const t = new Date(iso + 'T00:00'); t.setDate(t.getDate() - minus); return t.toLocaleDateString('en-MY', { day: 'numeric', month: 'short' }); };
const STATUS = { agreed: 'Deposit due', active: 'Protected', received: 'Food received', complete: 'Complete', dispute: 'In dispute' };
const PHOTOS = [['/assets/buffet.jpg', '11:42'], ['/assets/rendang.jpg', '11:44'], ['/assets/beriyani.jpg', '11:47']];

export function Tracker() {
  const [s, d, go] = useProto();
  const b = s.booking;
  const [party, setParty] = useState(false);
  useEffect(() => { if (party) { const t = setTimeout(() => setParty(false), 2800); return () => clearTimeout(t); } }, [party]);
  if (!b) return (
    <><Bar title="My booking" /><div className="body"><h1 className="t-title">No booking yet.</h1><p className="t-sub">Find a verified caterer to start one.</p>
      <button className="btn btn-primary mono" style={{ marginTop: 20 }} onClick={() => go('search')}>Find a caterer</button></div></>
  );
  const c = catererById(b.catererId), sum = total(b), paidUp = b.paid >= sum;
  const st = (done, now) => (done ? 'done' : now ? 'now' : '');
  return (
    <>
      <Bar title="My booking" right={<button className="icon-btn" onClick={() => go('search')} aria-label="Home"><Icon name="home" /></button>} />
      <div className="body">
        <div className="trk-head">
          <span className={`chip mono st-${b.status}`}>{STATUS[b.status]}</span>
          <h1 className="t-title">{c.name}</h1>
          <p className="t-sub">{day(b.date)} &middot; {b.pax} pax &middot; {rm(sum)}</p>
        </div>

        <div className="card rv"><MoneyBar total={sum} paid={b.paid} released={b.released} /></div>

        {b.status === 'dispute' && (
          <div className="notice warn rv" role="status">
            <Icon name="alert" size={18} />
            <p><b>Dispute open: {b.dispute.reason}.</b> {rm(sum - b.released)} is frozen. {c.name} has 3 days to send evidence, and our team decides within 7 days. If it&rsquo;s still unresolved, it goes to the Consumer Claims Tribunal.</p>
          </div>
        )}

        <div className="card pax-card rv">
          <span><b>{b.pax}</b> guests<small>{s.phase ? 'Locked 14 days before. Extra guests are a paid top-up.' : `You can change this until ${day(b.date, 14)}.`}</small></span>
          {!s.phase && (
            <span className="stepper">
              <button onClick={() => d({ type: 'pax', pax: b.pax - 10 })} aria-label="10 fewer guests"><Icon name="minus" size={16} /></button>
              <button onClick={() => d({ type: 'pax', pax: b.pax + 10 })} aria-label="10 more guests"><Icon name="plus" size={16} /></button>
            </span>
          )}
        </div>

        <ol className="tl">
          <li className={`rv ${st(b.paid > 0, b.status === 'agreed')}`}>
            <p className="mono tl-when">At booking</p>
            <h3>50% deposit, held by Curlec</h3>
            {b.paid ? <p>{rm(sum / 2)} paid. None of it went straight to the caterer.</p>
              : <><p>Pay within 3 days of the caterer accepting, or the date is freed.</p><button className="btn btn-primary mono" onClick={() => go('checkout', { kind: 'deposit' })}>Pay {rm(sum / 2)}</button></>}
          </li>

          <li className={`rv ${st(b.receipts.length > 0 && !b.pending, b.paid > 0 && !paidUp)}`}>
            <p className="mono tl-when">Any time after</p>
            <h3>Ingredient receipts</h3>
            {b.receipts.length ? (
              <ul className="rcpts">
                {b.receipts.map((r, i) => <li key={i}><Icon name="receipt" size={16} /><span>{r.supplier}</span><b>{rm(r.amount)}</b><small>{r.released === r.amount ? 'Released' : `${rm(r.released)} released`}</small></li>)}
              </ul>
            ) : <p>{c.name} uploads market receipts as they buy. You see every one, and only that exact amount is released.</p>}
            {b.pending > 0 && !paidUp && (
              <><p className="pending">{rm(b.pending)} of receipts is waiting. It releases when you pay the balance.</p>
                <button className="btn btn-ghost mono" onClick={() => go('checkout', { kind: 'balance' })}>Top up early</button></>
            )}
          </li>

          <li className={`rv ${st(paidUp, s.phase >= 1 && !paidUp && b.paid > 0)}`}>
            <p className="mono tl-when">{day(b.date, 14)} &middot; 14 days before</p>
            <h3>Headcount locks, 100% secured</h3>
            {paidUp ? <p>Fully paid. {c.name} can cook knowing the money is there.</p> : (
              <><p>Pay the remaining {rm(sum - b.paid)}. Reminders go out 21, 17 and 15 days before. Unpaid bookings auto-cancel.</p>
                {b.paid > 0 && <button className={s.phase >= 1 ? 'btn btn-primary mono' : 'btn btn-ghost mono'} onClick={() => go('checkout', { kind: 'balance' })}>{s.phase >= 1 ? `Pay ${rm(sum - b.paid)}` : 'Pay early'}</button>}</>
            )}
          </li>

          <li className={`rv ${st(['received', 'complete', 'dispute'].includes(b.status), s.phase === 2 && b.status === 'active')}`}>
            <p className="mono tl-when">{day(b.date)} &middot; Event day</p>
            <h3>Confirm the food arrived</h3>
            {s.phase < 2 ? <p>The caterer uploads timestamped delivery photos. You tap <i>Makanan Diterima</i> and 80% is released.</p>
              : b.photos ? (
                <>
                  <div className="dphotos">{PHOTOS.map(([src, t]) => <figure key={t}><img src={src} alt="" /><figcaption className="mono">{t}</figcaption></figure>)}</div>
                  {b.status === 'active' && <p>Delivered by {c.name}. If you don&rsquo;t confirm by midnight, the main payment releases automatically.</p>}
                </>
              ) : <p>Waiting for {c.name}&rsquo;s delivery photos. <span className="demo-tip">Demo: switch to Caterer to upload them.</span></p>}
            {b.status === 'received' && <p className="ok-line"><Icon name="check" size={16} /> You confirmed delivery. {rm(sum * .8)} released.</p>}
          </li>

          <li className={`rv ${st(b.status === 'complete', b.status === 'received')}`}>
            <p className="mono tl-when">48 hours after</p>
            <h3>Final 20%, automatically</h3>
            {b.status === 'complete' ? <p>All {rm(sum)} released. Thank you for booking safely.</p>
              : b.status === 'dispute' ? <p>Frozen while the dispute is reviewed.</p>
              : <p>Releases on its own if nobody raises a dispute. Nobody can hold the caterer&rsquo;s money hostage.</p>}
            {b.status === 'received' && <button className="link-btn" onClick={() => go('dispute')}>Something wrong? Raise a dispute</button>}
          </li>
        </ol>

        {b.status === 'complete' && <Review />}
      </div>
      {s.phase === 2 && b.status === 'active' && b.photos && (
        <Foot><button className="btn btn-primary btn-block mono diterima" onClick={() => { d({ type: 'received' }); setParty(true); }}><Icon name="check" size={18} /> Makanan Diterima</button></Foot>
      )}
      {party && (
        <button className="party" onClick={() => setParty(false)} aria-label="Close">
          <DitherArt className="party-art" art="burst" animate />
          <span className="t-title">Terima kasih!</span>
          <span className="t-sub">{rm(sum * .8)} released to {c.name}.<br />The last 20% follows in 48 hours.</span>
        </button>
      )}
    </>
  );
}

// verified review: only a completed booking can leave one
function Review() {
  const [s, d] = useProto();
  const [stars, setStars] = useState(0), [text, setText] = useState('');
  const r = s.booking.review;
  if (r) return (
    <div className="card review rv" style={{ marginTop: 20 }}>
      <span className="stars">{'★'.repeat(r.stars)}<span className="muted">{'★'.repeat(5 - r.stars)}</span></span>
      <blockquote>{r.text || 'No comment.'}</blockquote>
      <p className="mono" style={{ marginTop: 10, fontSize: 10, color: 'var(--ok)' }}>Posted as a verified booking review</p>
    </div>
  );
  return (
    <div className="card rv" style={{ marginTop: 20 }}>
      <p className="label mono" style={{ marginTop: 0 }}>Rate your caterer</p>
      <div className="rate" role="radiogroup" aria-label="Stars">
        {[1, 2, 3, 4, 5].map(n => <button key={n} role="radio" aria-checked={stars === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} className={n <= stars ? 'on' : ''} onClick={() => setStars(n)}>★</button>)}
      </div>
      <Field label="What should other hosts know?"><textarea value={text} onChange={e => setText(e.target.value)} /></Field>
      <button className="btn btn-primary mono" style={{ marginTop: 12 }} disabled={!stars} onClick={() => d({ type: 'review', review: { stars, text: text.trim() } })}>Post review</button>
    </div>
  );
}

const REASONS = ['Food ran short', 'Arrived late', 'Food quality or hygiene', 'Not what the menu said', 'Caterer did not show up'];

// raise a dispute within 48 hours: freeze what's left, both sides send evidence, decision within 7 days
export function Dispute() {
  const [s, d] = useProto();
  const [reason, setReason] = useState(''), [note, setNote] = useState(''), [photos, setPhotos] = useState(0), [tried, setTried] = useState(false);
  const b = s.booking;
  if (!b) return <><Bar title="Raise a dispute" /><div className="body"><p className="t-sub">No booking to dispute.</p></div></>;
  const frozen = total(b) - b.released;
  return (
    <>
      <Bar title="Raise a dispute" />
      <div className="body">
        <h1 className="t-title">Tell us what went wrong.</h1>
        <p className="t-sub">The remaining <b>{rm(frozen)}</b> is frozen as soon as you send this.</p>
        <fieldset className="methods" style={{ marginTop: 20 }}>
          <legend className="mono field-label">What happened?</legend>
          {REASONS.map(r => <label key={r} className={reason === r ? 'method on' : 'method'}><input type="radio" name="reason" checked={reason === r} onChange={() => setReason(r)} /> {r}</label>)}
        </fieldset>
        {tried && !reason && <p className="field-hint" role="alert" style={{ color: '#b3261e' }}>Choose what happened.</p>}
        <Field label="Details" hint="Times, how many guests went without, anything the caterer said."><textarea value={note} onChange={e => setNote(e.target.value)} /></Field>
        <p className="field-label mono" style={{ marginTop: 16 }}>Evidence</p>
        <div className="evid">
          {Array.from({ length: photos }, (_, i) => <span key={i} className="evid-tile mono">IMG_{2041 + i}</span>)}
          {photos < 4 && <button className="evid-add" onClick={() => setPhotos(photos + 1)}><Icon name="camera" /> <span>Add photo</span></button>}
        </div>
        <ol className="sched" style={{ marginTop: 24 }}>
          <li><b>Within 3 days</b><span>Both sides send evidence. A side that doesn&rsquo;t submit loses.</span></li>
          <li><b>Within 7 days</b><span>Our team decides, using the agreement, chat, photos and receipts.</span></li>
          <li><b>If still unresolved</b><span>Consumer Claims Tribunal or a police report, with the full evidence trail.</span></li>
        </ol>
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={() => {
        if (!reason) return setTried(true);
        d({ type: 'dispute', dispute: { reason, note: note.trim(), photos } }); d({ type: 'jump', screen: 'tracker' });
      }}>Freeze {rm(frozen)} and send</button></Foot>
    </>
  );
}
Dispute.title = 'Host: raise a dispute';
Tracker.title = 'Host: booking tracker';
