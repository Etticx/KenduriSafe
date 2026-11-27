'use client';
import { useEffect, useState } from 'react';
import DitherArt from '@/components/DitherArt';
import { useProto, Bar, Foot, Field, Icon, Steps, Working, reduced } from './ui';

const norm = v => v.toUpperCase().replace(/\b(BIN|BINTI|A\/L|A\/P)\b/g, '').replace(/[^A-Z]/g, '');
const LABELS = ['Identity', 'Business', 'Bank account', 'Consent'];

// caterer onboarding: 4 steps, then admin review (Semak Mule + background scan) before any booking
export function Verify() {
  const [s, d] = useProto();
  const a = s.applicant;
  if (!a) return <><Bar title="Get verified" /><div className="body"><p className="t-sub">Sign up as a caterer first.</p></div></>;
  const step = a.step || 1, next = patch => d({ type: 'applicant', patch: { ...patch, step: step + 1 } });
  const Step = [Identity, Business, Bank, Consent][step - 1];
  return (
    <>
      <Bar title="Get verified" back={false} />
      <Step a={a} next={next} back={step > 1 ? () => d({ type: 'applicant', patch: { step: step - 1 } }) : null} step={step} />
    </>
  );
}
Verify.title = 'Caterer: get verified';

const Head = ({ step, title, sub }) => (
  <><Steps n={step} of={4} label={LABELS[step - 1]} /><h1 className="t-title" style={{ marginTop: 14 }}>{title}</h1><p className="t-sub">{sub}</p></>
);

// 1. eKYC: IC front and back, then a live face check that follows prompts
function Identity({ next, step }) {
  const [ic, setIc] = useState({ front: false, back: false }), [scanning, setScanning] = useState('');
  const [face, setFace] = useState('idle'); // idle -> straight -> left -> right -> matching -> done
  useEffect(() => {
    const order = ['straight', 'left', 'right', 'matching'];
    const i = order.indexOf(face);
    if (i < 0 || face === 'matching') return;
    const t = setTimeout(() => setFace(order[i + 1]), reduced() ? 600 : 1500);
    return () => clearTimeout(t);
  }, [face]);
  const prompt = { straight: 'Look straight at the camera', left: 'Slowly turn your head left', right: 'Now turn right' }[face];
  const done = ic.front && ic.back && face === 'done';
  return (
    <>
      <div className="body">
        <Head step={step} title="Show us it's really you." sub="Your IC, then a 5-second live face check. This stops anyone using a stolen IC." />
        <div className="ic-row">
          {['front', 'back'].map(side => (
            <button key={side} className={ic[side] ? 'ic on' : 'ic'} disabled={!!scanning}
              onClick={() => setScanning(side)}>
              {scanning === side ? <Working label="Reading IC" ms={900} done={() => { setIc(v => ({ ...v, [side]: true })); setScanning(''); }} />
                : <><Icon name={ic[side] ? 'check' : 'scan'} size={22} /><b>IC {side}</b><small>{ic[side] ? 'Captured' : 'Tap to scan'}</small></>}
            </button>
          ))}
        </div>

        <p className="label mono">Live face check</p>
        <div className={`facecam ${face}`}>
          <DitherArt className="face-art" art="face" animate={face !== 'idle' && face !== 'done'} param={face === 'left' ? -1 : face === 'right' ? 1 : 0} />
          <div className="face-prompt" role="status" aria-live="polite">
            {face === 'idle' && 'Good light, no cap or sunglasses.'}
            {prompt && <><span className="mono">{face === 'left' ? '←' : face === 'right' ? '→' : '•'}</span> {prompt}</>}
            {face === 'matching' && <Working label="Matching face to IC photo" ms={1400} done={() => setFace('done')} />}
            {face === 'done' && <><Icon name="check" size={16} /> Face matches your IC photo</>}
          </div>
        </div>
        {face === 'idle' && <button className="btn btn-ghost btn-block mono" style={{ marginTop: 10 }} disabled={!ic.front || !ic.back} onClick={() => setFace('straight')}>Start face check</button>}
        {face === 'idle' && (!ic.front || !ic.back) && <p className="field-hint">Scan both sides of your IC first.</p>}
      </div>
      <Foot><button className="btn btn-primary btn-block mono" disabled={!done} onClick={() => next({ ekyc: true })}>Continue &rarr;</button></Foot>
    </>
  );
}

// 2. SSM, or LHDN for home-based caterers
function Business({ next, back, step }) {
  const [type, setType] = useState('ssm'), [no, setNo] = useState(''), [tried, setTried] = useState(false), [checking, setChecking] = useState(false);
  const ok = type === 'ssm' ? /^\d{12}$/.test(no.replace(/\D/g, '')) : /^[A-Z]{2}\d{9,11}$/i.test(no.replace(/\s/g, ''));
  if (checking) return <div className="body"><Working label={type === 'ssm' ? 'Checking SSM record (mock)' : 'Checking LHDN number (mock)'} ms={1200} done={() => next({ biz: { type, no } })} /></div>;
  return (
    <>
      <div className="body">
        <Head step={step} title="Your business." sub="A registered business, or LHDN registration if you cook from home." />
        <div className="seg seg-in" role="radiogroup" aria-label="Registration type">
          {[['ssm', 'SSM registered'], ['lhdn', 'Home-based (LHDN)']].map(([id, t]) => <button key={id} role="radio" aria-checked={type === id} className={type === id ? 'on' : ''} onClick={() => { setType(id); setNo(''); }}>{t}</button>)}
        </div>
        <Field label={type === 'ssm' ? 'SSM registration number' : 'LHDN tax number'} hint={type === 'ssm' ? '12 digits, e.g. 202301045678' : 'e.g. IG12345678090'}
          error={tried && !ok ? 'Check the number format.' : ''}>
          <input value={no} onChange={e => setNo(e.target.value)} inputMode={type === 'ssm' ? 'numeric' : 'text'} />
        </Field>
      </div>
      <Foot>
        <button className="btn btn-primary btn-block mono" onClick={() => (ok ? setChecking(true) : setTried(true))}>Continue &rarr;</button>
        <button className="link-btn" onClick={back}>Back</button>
      </Foot>
    </>
  );
}

// 3. payout account: the name must match the IC (or the SSM business name), checked as you type
function Bank({ a, next, back, step }) {
  const [bank, setBank] = useState('Maybank'), [acc, setAcc] = useState(''), [name, setName] = useState(''), [tried, setTried] = useState(false);
  const accOk = /^\d{10,16}$/.test(acc.replace(/\D/g, ''));
  const match = name.trim() && (norm(name) === norm(a.owner) || (a.biz?.type === 'ssm' && norm(name) === norm(a.business)));
  return (
    <>
      <div className="body">
        <Head step={step} title="Where we pay you." sub="Payouts only go to an account in your own name. A mismatch is the most common sign of a mule account." />
        <Field label="Bank"><select value={bank} onChange={e => setBank(e.target.value)}>{['Maybank', 'CIMB', 'Bank Islam', 'RHB', 'Public Bank', 'BSN'].map(x => <option key={x}>{x}</option>)}</select></Field>
        <Field label="Account number" error={tried && !accOk ? 'Enter 10 to 16 digits.' : ''}><input inputMode="numeric" value={acc} onChange={e => setAcc(e.target.value)} /></Field>
        <Field label="Account holder name"><input value={name} onChange={e => setName(e.target.value)} placeholder={a.owner} /></Field>
        {name.trim() && (
          <p className={match ? 'match ok' : 'match no'} role="status">
            <Icon name={match ? 'check' : 'x'} size={16} />
            {match ? 'Name matches your IC.' : `Must match ${a.owner} (your IC)${a.biz?.type === 'ssm' ? ` or ${a.business}` : ''}.`}
          </p>
        )}
      </div>
      <Foot>
        <button className="btn btn-primary btn-block mono" onClick={() => (accOk && match ? next({ bank: { bank, acc, name } }) : setTried(true))}>Continue &rarr;</button>
        <button className="link-btn" onClick={back}>Back</button>
      </Foot>
    </>
  );
}

// 4. PDPA consent for the checks our team runs, then submit for review
function Consent({ back, step }) {
  const [, d, go] = useProto();
  const [c1, setC1] = useState(false), [c2, setC2] = useState(false), [sending, setSending] = useState(false);
  if (sending) return <div className="body"><Working label="Submitting for review" ms={1200} done={() => { d({ type: 'applicant', patch: { status: 'review' } }); go('applied'); }} /></div>;
  return (
    <>
      <div className="body">
        <Head step={step} title="Two checks our team runs." sub="Done by a person, not just software. You'll hear back before you can take bookings." />
        <label className="agree"><input type="checkbox" checked={c1} onChange={e => setC1(e.target.checked)} />
          <span><b>Semak Mule check.</b> I agree to my bank account and phone number being checked on PDRM&rsquo;s Semak Mule.</span></label>
        <label className="agree" style={{ marginTop: 10 }}><input type="checkbox" checked={c2} onChange={e => setC2(e.target.checked)} />
          <span><b>Background scan.</b> I agree to a web search for scam reports about my business. A person on the SecureKenduri team reviews anything it finds.</span></label>
        <p className="field-hint" style={{ marginTop: 14 }}>Under the PDPA, this data is only used to verify you and is kept as evidence if a booking ends in a police report.</p>
      </div>
      <Foot>
        <button className="btn btn-primary btn-block mono" disabled={!c1 || !c2} onClick={() => setSending(true)}>Submit for review &rarr;</button>
        <button className="link-btn" onClick={back}>Back</button>
      </Foot>
    </>
  );
}

// after submitting: what's done, what our team is checking; becomes the "you're verified" screen once approved
export function Applied() {
  const [s, , go] = useProto();
  const a = s.applicant;
  if (!a) return <><Bar title="Verification" /><div className="body"><p className="t-sub">No application yet.</p></div></>;
  const ok = a.status === 'verified', no = a.status === 'rejected';
  const rows = [
    ['eKYC + live face check', 'done'], ['SSM / LHDN registration', 'done'], ['Bank name match', 'done'],
    ['Semak Mule check', ok ? 'done' : no ? 'fail' : 'wait'], ['Background scan', ok ? 'done' : no ? 'fail' : 'wait'],
  ];
  return (
    <>
      <Bar title="Verification" back={false} />
      <div className="body">
        {ok && <span className="paid-mark"><Icon name="shield" size={30} /></span>}
        <h1 className="t-title">{ok ? <>You&rsquo;re <span className="b">verified.</span></> : no ? 'We couldn’t verify you.' : 'Thanks. We’re checking.'}</h1>
        <p className="t-sub">{ok ? 'Your badge is live and hosts can now book you.' : no ? 'Our team will contact you with the reason and what you can do next.' : 'Our team checks Semak Mule and reviews the background scan by hand. Meanwhile you can set up your menu.'}</p>
        <ul className="checks" style={{ marginTop: 20 }}>
          {rows.map(([t, st]) => (
            <li key={t} className="rv">
              <span className={`tick ${st}`}>{st === 'wait' ? <span className="dots" aria-hidden="true">...</span> : <Icon name={st === 'fail' ? 'x' : 'check'} size={14} />}</span>
              <span><b>{t}</b><small>{st === 'wait' ? 'Being checked by our team' : st === 'fail' ? 'Not passed' : 'Passed'}</small></span>
            </li>
          ))}
        </ul>
        {!ok && !no && <p className="demo-tip" style={{ marginTop: 14 }}>Demo: switch to Admin to approve this application.</p>}
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={() => go('cdash')}>{ok ? 'Go to my dashboard' : 'Set up my menu meanwhile'} &rarr;</button></Foot>
    </>
  );
}
Applied.title = 'Caterer: verification status';
