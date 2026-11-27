'use client';
import { useState } from 'react';
import DitherArt from '@/components/DitherArt';
import { useProto, Bar, Foot, Field, Icon, Working } from './ui';

const digits = v => v.replace(/\D/g, '');
const phoneOk = v => digits(v).length >= 9 && digits(v).length <= 11;

export function Welcome() {
  const [, , go] = useProto();
  return (
    <>
      <div className="body welcome">
        <DitherArt className="welcome-art" art="shield" />
        <h1 className="t-title welcome-title" aria-label="Book your kenduri caterer. Pay as each part is done.">
          <span className="line"><span>Book your kenduri caterer.</span></span>
          <span className="line"><span><span className="b">Pay as each part is done.</span></span></span>
        </h1>
        <p className="label mono welcome-q">How will you use SecureKenduri?</p>
        <div className="stack">
          <button className="card choice rv" onClick={() => go('signup-host')}>
            <Icon name="users" size={24} />
            <span><b>I&rsquo;m hosting a kenduri</b><small>Wedding, aqiqah, tahlil, open house</small></span>
            <Icon name="next" />
          </button>
          <button className="card choice rv" onClick={() => go('signup-caterer')}>
            <Icon name="chef" size={24} />
            <span><b>I&rsquo;m a caterer</b><small>Get verified, get paid before you cook</small></span>
            <Icon name="next" />
          </button>
        </div>
      </div>
      <Foot>
        <button className="btn btn-ghost btn-block mono" onClick={() => go('search')}>Browse caterers first</button>
        <button className="link-btn" onClick={() => go('login')}>Already have an account? Log in</button>
      </Foot>
    </>
  );
}
Welcome.title = 'Welcome';

export function Login() {
  const [, , go] = useProto();
  const [phone, setPhone] = useState(''), [tried, setTried] = useState(false);
  return (
    <>
      <Bar title="Log in" />
      <div className="body">
        <h1 className="t-title">Welcome back.</h1>
        <p className="t-sub">We&rsquo;ll send a 6-digit code to your phone.</p>
        <Field label="Phone number" error={tried && !phoneOk(phone) ? 'Enter a Malaysian phone number, e.g. 012-345 6789.' : ''}>
          <input type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="012-345 6789" />
        </Field>
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={() => (phoneOk(phone) ? go('otp', { flow: 'login', phone }) : setTried(true))}>Send code &rarr;</button></Foot>
    </>
  );
}
Login.title = 'Log in';

export function SignupHost() {
  const [, , go] = useProto();
  const [f, setF] = useState({ name: '', phone: '', email: '' }), [tried, setTried] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const err = { name: !f.name.trim() && 'Enter your name.', phone: !phoneOk(f.phone) && 'Enter a Malaysian phone number.', email: f.email && !/^\S+@\S+\.\S+$/.test(f.email) && 'Check the email address.' };
  const ok = !err.name && !err.phone && !err.email;
  return (
    <>
      <Bar title="Sign up as host" />
      <div className="body">
        <h1 className="t-title">Let&rsquo;s set up your account.</h1>
        <p className="t-sub">So your booking agreement, payments and any dispute are in your name.</p>
        <Field label="Full name" error={tried && err.name}><input autoComplete="name" value={f.name} onChange={set('name')} /></Field>
        <Field label="Phone number" hint="We send a one-time code here." error={tried && err.phone}><input type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} placeholder="012-345 6789" /></Field>
        <Field label="Email (optional)" hint="For your receipts and agreement copy." error={tried && err.email}><input type="email" autoComplete="email" value={f.email} onChange={set('email')} /></Field>
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={() => (ok ? go('otp', { flow: 'host', ...f }) : setTried(true))}>Continue &rarr;</button></Foot>
    </>
  );
}
SignupHost.title = 'Sign up: host';

export function SignupCaterer() {
  const [, , go] = useProto();
  const [f, setF] = useState({ business: '', owner: '', phone: '' }), [tried, setTried] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.value });
  const err = { business: !f.business.trim() && 'Enter your business name.', owner: f.owner.trim().split(/\s+/).length < 2 && 'Enter your full name as on your IC.', phone: !phoneOk(f.phone) && 'Enter a Malaysian phone number.' };
  const ok = !err.business && !err.owner && !err.phone;
  return (
    <>
      <Bar title="Sign up as caterer" />
      <div className="body">
        <h1 className="t-title">Join as a <span className="b">verified</span> caterer.</h1>
        <p className="t-sub">Account first, then 4 quick checks. You can set up your menu while we review.</p>
        <Field label="Business name" error={tried && err.business}><input autoComplete="organization" value={f.business} onChange={set('business')} placeholder="e.g. Teratak Katering" /></Field>
        <Field label="Owner's full name (as on IC)" hint="Your bank account must be in this name or your SSM name." error={tried && err.owner}><input autoComplete="name" value={f.owner} onChange={set('owner')} /></Field>
        <Field label="Phone number" error={tried && err.phone}><input type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} placeholder="013-222 1010" /></Field>
      </div>
      <Foot><button className="btn btn-primary btn-block mono" onClick={() => (ok ? go('otp', { flow: 'caterer', ...f }) : setTried(true))}>Continue &rarr;</button></Foot>
    </>
  );
}
SignupCaterer.title = 'Sign up: caterer';

// one-time code: a single numeric input drawn as 6 boxes; any 6 digits pass in the prototype
export function Otp() {
  const [s, d] = useProto();
  const p = s.params;
  const [code, setCode] = useState(''), [checking, setChecking] = useState(false);
  const finish = () => {
    if (p.flow === 'caterer') {
      d({ type: 'apply', applicant: { business: p.business, owner: p.owner, phone: p.phone, step: 1 } });
      d({ type: 'login', user: { role: 'caterer', name: p.business, phone: p.phone }, screen: 'verify' });
    } else if (p.flow === 'login' && s.applicant && digits(s.applicant.phone) === digits(p.phone)) {
      d({ type: 'login', user: { role: 'caterer', name: s.applicant.business, phone: p.phone }, screen: s.applicant.status === 'draft' ? 'verify' : 'cdash' });
    } else {
      d({ type: 'login', user: { role: 'host', name: p.name || 'Nur Aisyah', phone: p.phone }, screen: s.after?.screen || 'search', params: s.after?.params });
    }
  };
  const type = v => { const c = digits(v).slice(0, 6); setCode(c); if (c.length === 6) setChecking(true); };
  return (
    <>
      <Bar title="Verify your phone" />
      <div className="body">
        <h1 className="t-title">Enter the 6-digit code.</h1>
        <p className="t-sub">Sent by SMS to <b>{p.phone}</b>.</p>
        {checking ? <Working label="Checking code" ms={900} done={finish} /> : (
          <label className="otp">
            <span className="field-label mono">Code</span>
            <input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={e => type(e.target.value)} autoFocus aria-describedby="otp-hint" />
            <span className="otp-boxes" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <i key={i} className={i === code.length ? 'cur' : ''}>{code[i] || ''}</i>)}</span>
          </label>
        )}
        <p className="field-hint" id="otp-hint">Prototype: any 6 digits work.</p>
      </div>
    </>
  );
}
Otp.title = 'One-time code';
