'use client';
import { useState } from 'react';
import { useProto, Bar, Foot, Field, Icon, Row, Steps, Working, Money } from './ui';
import { catererById, CATERERS, rm } from './data';
import { total } from './reducer';

const fmtDate = iso => new Date(iso + 'T00:00').toLocaleDateString('en-MY', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

// digital booking agreement: menu, pax, price, delivery time, venue, payment schedule and cancellation policy
export function Agreement() {
  const [s, d, go] = useProto();
  const p = s.params.id ? s.params : { id: 'mak-long', pkg: 'b', pax: 500, date: '2027-03-14' };
  const c = catererById(p.id) || CATERERS[0], k = c.packages.find(x => x.id === p.pkg) || c.packages[0];
  const [time, setTime] = useState('11:00'), [venue, setVenue] = useState(''), [agree, setAgree] = useState(false);
  const [tried, setTried] = useState(false), [sending, setSending] = useState(false);
  const sum = p.pax * k.price, ok = agree && venue.trim();
  const send = () => {
    if (!ok) return setTried(true);
    d({ type: 'book', catererId: c.id, pkg: k.id, price: k.price, pax: p.pax, date: p.date, venue: `${venue.trim()}, ${time}` });
    setSending(true);
  };
  if (sending) return (
    <>
      <Bar title="Booking agreement" back={false} />
      <div className="body"><Working label={`Sending to ${c.name}`} ms={1400} done={() => go('checkout', { kind: 'deposit' })} /></div>
    </>
  );
  return (
    <>
      <Bar title="Booking agreement" />
      <div className="body">
        <Steps n={1} of={2} label="Agree" />
        <h1 className="t-title" style={{ marginTop: 14 }}>Everything in writing, before any money moves.</h1>

        <p className="label mono">What you&rsquo;re booking</p>
        <div className="card">
          <Row k="Caterer" v={c.name} />
          <Row k="Package" v={k.name} />
          <Row k="Date" v={fmtDate(p.date)} />
          <Row k="Guests" v={`${p.pax} pax`} />
          <Row k="Price" v={`${rm(k.price)} / pax`} />
          <Row k="Total" v={<b className="big-num">{rm(sum)}</b>} />
        </div>
        <p className="menu-line">{k.menu.join(' · ')}</p>

        <Field label="Food delivered by"><select value={time} onChange={e => setTime(e.target.value)}>{['10:00', '11:00', '12:00', '18:00'].map(t => <option key={t}>{t}</option>)}</select></Field>
        <Field label="Venue address" error={tried && !venue.trim() ? 'Enter where the food should be delivered.' : ''}>
          <input value={venue} onChange={e => setVenue(e.target.value)} placeholder="e.g. Dewan Seri Melati, Seksyen 7, Shah Alam" />
        </Field>

        <p className="label mono">How you pay</p>
        <ol className="sched">
          <li><b>{rm(sum / 2)} now</b><span>50% deposit, held by Curlec. Not paid to the caterer.</span></li>
          <li><b>{rm(sum / 2)} by 14 days before</b><span>Headcount locks the same day. 100% is then secured.</span></li>
          <li><b>Released in stages</b><span>Ingredient receipts first, 80% when you confirm the food arrived, the last 20% after 48 hours.</span></li>
        </ol>

        <p className="label mono">If you cancel</p>
        <div className="card cancel-t">
          <Row k="More than 30 days before" v="Receipts or 10%" />
          <Row k="14 to 30 days before" v="Receipts or 30%" />
          <Row k="Less than 14 days before" v="Receipts or 50%" />
        </div>
        <p className="field-hint">The caterer keeps whichever is higher: ingredient receipts already uploaded, or the fee.</p>

        <label className={tried && !agree ? 'agree bad' : 'agree'}>
          <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
          <span>I agree to this booking agreement. {c.name} confirms it when they accept.</span>
        </label>
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={send}>Agree and send &rarr;</button></Foot>
    </>
  );
}
Agreement.title = 'Host: booking agreement';

// mock payment sheet in the style of a payment gateway checkout (no real payment)
export function Checkout() {
  const [s, d, go] = useProto();
  const b = s.booking;
  const [method, setMethod] = useState('fpx'), [bank, setBank] = useState('Maybank2u'), [stage, setStage] = useState('pick');
  const [paidNow, setPaidNow] = useState(0); // what this payment was, before the booking totals change
  if (!b) return <><Bar title="Payment" /><div className="body"><p className="t-sub">Make a booking first.</p></div></>;
  const c = catererById(b.catererId), deposit = s.params.kind !== 'balance';
  const due = deposit ? (b.paid ? 0 : total(b) / 2) : total(b) - b.paid;
  const amount = stage === 'done' ? paidNow : due;
  if (stage === 'pick' && due <= 0) return (
    <><Bar title="Payment" /><div className="body"><p className="t-sub">Nothing to pay right now. {deposit ? 'Your deposit is already paid.' : 'Your booking is fully paid.'}</p>
      <button className="btn btn-ghost mono" style={{ marginTop: 16 }} onClick={() => d({ type: 'jump', screen: 'tracker' })}>View my booking</button></div></>
  );
  if (stage === 'paying') return (
    <><Bar title="Payment" back={false} /><div className="body"><Working label="Processing with Curlec (mock)" ms={1700} done={() => { d({ type: 'pay', amount: due }); setPaidNow(due); setStage('done'); }} /></div></>
  );
  if (stage === 'done') return (
    <>
      <Bar title="Payment" back={false} />
      <div className="body paid">
        <span className="paid-mark"><Icon name="lock" size={30} /></span>
        <p className="mono label">Payment received</p>
        <h1 className="t-title"><Money value={amount} /> <span className="b">held by Curlec.</span></h1>
        <p className="t-sub">{deposit
          ? `Not paid to ${c.name} yet. It is released only against their ingredient receipts and, later, the delivery you confirm.`
          : '100% of your booking is now secured. The caterer can start cooking with confidence.'}</p>
        <div className="card receipt rv">
          <Row k="Booking" v={`${c.name}, ${b.pax} pax`} />
          <Row k="Paid now" v={rm(amount)} />
          <Row k="Paid so far" v={`${rm(b.paid)} of ${rm(total(b))}`} />
          <Row k="Method" v={method === 'fpx' ? `FPX · ${bank}` : method === 'duitnow' ? 'DuitNow QR' : 'Card'} />
        </div>
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={() => d({ type: 'jump', screen: 'tracker' })}>View my booking &rarr;</button></Foot>
    </>
  );
  return (
    <>
      <Bar title="Payment" />
      <div className="body">
        {deposit && <Steps n={2} of={2} label="Pay deposit" />}
        {deposit && <p className="accepted rv"><Icon name="check" size={16} /> {c.name} accepted your booking. Pay the deposit within 3 days to lock the date.</p>}
        <div className="pay-sheet rv">
          <p className="mono pay-by">Payment by Razorpay Curlec &middot; mock</p>
          <p className="pay-amt"><Money value={amount} /></p>
          <p className="muted pay-what">{deposit ? '50% deposit' : 'Remaining 50%'} &middot; {c.name}, {b.pax} pax</p>
          <fieldset className="methods">
            <legend className="mono field-label">Pay with</legend>
            {[['fpx', 'FPX online banking'], ['duitnow', 'DuitNow QR'], ['card', 'Debit / credit card']].map(([id, t]) => (
              <label key={id} className={method === id ? 'method on' : 'method'}>
                <input type="radio" name="method" checked={method === id} onChange={() => setMethod(id)} /> {t}
              </label>
            ))}
          </fieldset>
          {method === 'fpx' && <Field label="Bank"><select value={bank} onChange={e => setBank(e.target.value)}>{['Maybank2u', 'CIMB Clicks', 'Bank Islam', 'RHB Now', 'Public Bank'].map(x => <option key={x}>{x}</option>)}</select></Field>}
        </div>
        <p className="safe-note"><Icon name="shield" size={16} /> SecureKenduri never holds your money. Curlec, a regulated Malaysian payment gateway, holds it and releases each stage only when the booking milestone is met.</p>
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={() => setStage('paying')}>Pay {rm(amount)} &rarr;</button></Foot>
    </>
  );
}
Checkout.title = 'Host: payment';
