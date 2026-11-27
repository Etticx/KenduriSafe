'use client';
import { useState } from 'react';
import Planner from '@/components/Planner';
import { useProto, Bar, Foot, Field, Icon, Working, Money, Row } from './ui';
import { catererById, rm } from './data';
import { total } from './reducer';

const day = iso => new Date(iso + 'T00:00').toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' });

// the booking this caterer can see: only Dapur Mak Long (the demo's verified caterer) receives the host's booking
const myBooking = s => (s.user?.catererId && s.booking?.catererId === s.user.catererId && s.booking.status !== 'agreed' ? s.booking : null);

export function CDash() {
  const [s, d, go] = useProto();
  const own = !!s.user?.catererId, a = s.applicant;
  const verified = own || a?.status === 'verified';
  const name = own ? catererById(s.user.catererId).name : a?.business || s.user?.name || 'Your business';
  const b = myBooking(s);
  return (
    <>
      <Bar title="Dashboard" back={false} right={<button className="icon-btn" onClick={() => d({ type: 'logout' })} aria-label="Log out"><Icon name="logout" /></button>} />
      <div className="body">
        <span className={verified ? 'chip ok mono' : 'chip mono st-agreed'}>{verified ? <><Icon name="shield" size={12} /> Verified</> : 'Under review'}</span>
        <h1 className="t-title" style={{ marginTop: 10 }}>{name}</h1>
        {!verified && (
          <div className="notice warn rv" style={{ color: 'var(--warn)', borderColor: '#f0d2b3', background: '#fdf4ea' }}>
            <Icon name="clock" size={18} />
            <p>You can set up your menu now. Hosts can book you once our team finishes the Semak Mule check and background scan. <button className="link-btn inline" onClick={() => go('applied')}>See status</button></p>
          </div>
        )}

        <div className="earn rv">
          <div><span className="mono">Released to you</span><b><Money value={b ? b.released : 0} /></b></div>
          <div><span className="mono">Held for you by Curlec</span><b><Money value={b ? b.paid - b.released : 0} /></b></div>
        </div>

        <p className="label mono">Bookings</p>
        {b ? (
          <div className="card cbook rv">
            <div className="cbook-head">
              <span><b>{b.pax} pax &middot; {day(b.date)}</b><small>Nur Aisyah &middot; {b.venue}</small></span>
              <span className={`chip mono st-${b.status}`}>{b.paid >= total(b) ? '100% secured' : '50% secured'}</span>
            </div>
            <Row k="Booking value" v={rm(total(b))} />
            <Row k="Receipts uploaded" v={`${b.receipts.length} (${rm(b.receipts.reduce((n, r) => n + r.amount, 0))})`} />
            {b.pending > 0 && <Row k="Waiting for host's balance" v={rm(b.pending)} />}
            <div className="cbook-actions">
              {s.phase < 2 && <button className="btn btn-primary mono" onClick={() => go('invoice')}><Icon name="receipt" size={16} /> Upload receipt</button>}
              {s.phase === 2 && !b.photos && <button className="btn btn-primary mono" onClick={() => go('delivery')}><Icon name="camera" size={16} /> Delivery photos</button>}
              <button className="btn btn-ghost mono" onClick={() => go('cplanner')}>Planner</button>
            </div>
            {b.photos && b.status === 'active' && <p className="field-hint">Photos sent. Waiting for the host to tap <i>Makanan Diterima</i>, or it releases at midnight.</p>}
            {b.status === 'dispute' && <p className="field-hint" style={{ color: '#b3261e' }}>The host raised a dispute: {b.dispute.reason}. Send your evidence within 3 days.</p>}
          </div>
        ) : (
          <div className="empty rv">
            <pre className="ascii" aria-hidden="true">{'  .------------.\n  |  no orders |\n  \'------------\''}</pre>
            <p>{verified ? 'No bookings yet. Hosts can find you in search now.' : 'Bookings appear here once you’re verified.'}</p>
            {own && <p className="demo-tip">Demo: switch to Host and book Dapur Mak Long to see a booking arrive here.</p>}
          </div>
        )}
      </div>
    </>
  );
}
CDash.title = 'Caterer: dashboard';

// upload an ingredient invoice: exactly that amount is released, capped at what the host has paid so far
export function Invoice() {
  const [s, d, go] = useProto();
  const b = myBooking(s);
  const [supplier, setSupplier] = useState(''), [amount, setAmount] = useState(''), [photo, setPhoto] = useState(false), [tried, setTried] = useState(false), [sending, setSending] = useState(false);
  if (!b) return <><Bar title="Upload receipt" /><div className="body"><p className="t-sub">No active booking.</p></div></>;
  const amt = Math.round(+amount || 0), room = b.paid - b.released, now = Math.min(amt, room), later = amt - now;
  const ok = supplier.trim() && amt > 0 && photo;
  if (sending) return <><Bar title="Upload receipt" back={false} /><div className="body"><Working label="Sending to Curlec for release" ms={1300} done={() => { d({ type: 'invoice', supplier: supplier.trim(), amount: amt }); go(-1); }} /></div></>;
  return (
    <>
      <Bar title="Upload receipt" />
      <div className="body">
        <h1 className="t-title">Ingredient money, <span className="b">upfront.</span></h1>
        <p className="t-sub">The host sees every receipt. A fake or inflated one is itself evidence of fraud.</p>
        <button className={photo ? 'rcpt-shot on' : 'rcpt-shot'} onClick={() => setPhoto(true)}>
          {photo ? <><Icon name="check" size={22} /><b>receipt_pasar_borong.jpg</b><small>Tap to retake</small></> : <><Icon name="camera" size={22} /><b>Photo of the receipt</b><small>Tap to take a photo</small></>}
        </button>
        {tried && !photo && <p className="field-hint" style={{ color: '#b3261e' }}>Add a photo of the receipt.</p>}
        <Field label="Supplier" error={tried && !supplier.trim() ? 'Who did you buy from?' : ''}><input value={supplier} onChange={e => setSupplier(e.target.value)} placeholder="e.g. Pasar Borong Selayang" /></Field>
        <Field label="Amount (RM)" error={tried && !(amt > 0) ? 'Enter the receipt total.' : ''}><input inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" /></Field>
        {amt > 0 && (
          <div className="card release rv in">
            <Row k="Released to you now" v={<b style={{ color: 'var(--ok)' }}>{rm(now)}</b>} />
            {later > 0 && <Row k="Waits for the host's balance" v={rm(later)} />}
            <p className="field-hint">You can draw up to {rm(room)} right now: what the host has paid, less what&rsquo;s already released.</p>
          </div>
        )}
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={() => (ok ? setSending(true) : setTried(true))}>Upload and release &rarr;</button></Foot>
    </>
  );
}
Invoice.title = 'Caterer: upload receipt';

// event day: timestamped delivery photos the host sees before tapping "Makanan Diterima"
export function Delivery() {
  const [, d, go] = useProto();
  const [n, setN] = useState(0), [sending, setSending] = useState(false);
  const stamp = i => `11:${String(42 + i * 2).padStart(2, '0')}`;
  if (sending) return <><Bar title="Delivery photos" back={false} /><div className="body"><Working label="Stamping time and location" ms={1100} done={() => { d({ type: 'photos' }); go(-1); }} /></div></>;
  return (
    <>
      <Bar title="Delivery photos" />
      <div className="body">
        <h1 className="t-title">Show the food arrived.</h1>
        <p className="t-sub">Photos are stamped with time and location, so the host and our team can see when it was delivered.</p>
        <div className="evid" style={{ marginTop: 20 }}>
          {Array.from({ length: n }, (_, i) => <span key={i} className="evid-tile mono">{stamp(i)}</span>)}
          {n < 4 && <button className="evid-add" onClick={() => setN(n + 1)}><Icon name="camera" /> <span>Add photo</span></button>}
        </div>
      </div>
      <Foot><button className="btn btn-primary btn-block mono" disabled={n < 2} onClick={() => setSending(true)}>{n < 2 ? 'Add at least 2 photos' : `Send ${n} photos to host`}</button></Foot>
    </>
  );
}
Delivery.title = 'Caterer: delivery photos';

export function CPlanner() {
  const [s] = useProto();
  const b = myBooking(s);
  return (
    <>
      <Bar title="Headcount planner" />
      <div className="body">
        <p className="t-sub" style={{ marginTop: 0 }}>{b ? `Starts at this booking's ${b.pax} guests${s.phase ? ', locked 14 days before.' : '. It updates when the host changes their RSVP.'}` : 'Drag to see what to buy for any headcount.'}</p>
        <div style={{ marginTop: 16 }}><Planner key={b?.pax} initial={b?.pax || 300} /></div>
      </div>
    </>
  );
}
CPlanner.title = 'Caterer: headcount planner';
