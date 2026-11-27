'use client';
import { useState } from 'react';
import { useProto, Bar, Foot, Icon, Working, Row } from './ui';

// shortcut: a sample applicant so the admin screen works even if nobody signed up as a caterer in this demo
const SAMPLE = { business: 'Teratak Katering', owner: 'Rosnah binti Ahmad', phone: '013-222 1010', ekyc: true,
  biz: { type: 'lhdn', no: 'IG12345678090' }, bank: { bank: 'Bank Islam', acc: '12045010334567', name: 'ROSNAH AHMAD' }, status: 'review' };
const mask = acc => '•••• ' + acc.replace(/\D/g, '').slice(-4);

// admin verification checklist: system checks are pre-filled, the two manual checks need a person to tick them
export function Admin() {
  const [s, d] = useProto();
  const a = s.applicant?.status && s.applicant.status !== 'draft' ? s.applicant : SAMPLE;
  const [mule, setMule] = useState(false), [scan, setScan] = useState('idle'), [seen, setSeen] = useState(false);
  const decide = status => { if (a === SAMPLE) d({ type: 'apply', applicant: SAMPLE }); d({ type: 'applicant', patch: { status } }); };
  const decided = a.status === 'verified' || a.status === 'rejected';
  return (
    <>
      <Bar title="Verification queue" back={false} right={<button className="icon-btn" onClick={() => d({ type: 'logout' })} aria-label="Log out"><Icon name="logout" /></button>} />
      <div className="body">
        <p className="mono result-count">Admin &middot; 1 application waiting</p>
        <h1 className="t-title">{a.business}</h1>
        <p className="t-sub">{a.owner} &middot; {a.phone}</p>
        {decided && <p className={a.status === 'verified' ? 'match ok' : 'match no'}><Icon name={a.status === 'verified' ? 'check' : 'x'} size={16} /> {a.status === 'verified' ? 'Approved. Verified badge is live.' : 'Rejected. The caterer has been told why.'}</p>}

        <p className="label mono">Automatic checks</p>
        <ul className="checks">
          <li className="rv"><span className="tick"><Icon name="check" size={14} /></span><span><b>eKYC + live face check</b><small>Face matched to IC photo, head-turn liveness passed</small></span></li>
          <li className="rv"><span className="tick"><Icon name="check" size={14} /></span><span><b>{a.biz?.type === 'ssm' ? 'SSM registration' : 'LHDN registration (home-based)'}</b><small>{a.biz?.no}</small></span></li>
          <li className="rv"><span className="tick"><Icon name="check" size={14} /></span><span><b>Bank name match</b><small>{a.bank?.bank} {mask(a.bank?.acc || '0000')} &middot; {a.bank?.name}</small></span></li>
        </ul>

        <p className="label mono">Checks by a person</p>
        <div className="card rv">
          <p className="adm-h"><b>Semak Mule</b><span className="mono">PDRM</span></p>
          <Row k="Bank account" v={mask(a.bank?.acc || '0000')} />
          <Row k="Phone" v={a.phone} />
          <label className="agree" style={{ marginTop: 10 }}>
            <input type="checkbox" checked={mule} disabled={decided} onChange={e => setMule(e.target.checked)} />
            <span>I checked both on Semak Mule. No police reports linked.</span>
          </label>
        </div>

        <div className="card rv" style={{ marginTop: 10 }}>
          <p className="adm-h"><b>Background scan</b><span className="mono">AI, then you</span></p>
          {scan === 'idle' && <button className="btn btn-ghost mono" style={{ marginTop: 10 }} disabled={decided} onClick={() => setScan('run')}>Run web scan</button>}
          {scan === 'run' && <Working label={`Searching news, forums and social posts for "${a.business}"`} ms={1800} done={() => setScan('done')} />}
          {scan === 'done' && (
            <>
              <ul className="hits">
                <li><span className="mono">Facebook</span> Food review group post, 2025. Positive.</li>
                <li><span className="mono">Lowyat forum</span> Thread recommending home caterers. Neutral mention.</li>
              </ul>
              <p className="field-hint">The scan found no scam reports. It only flags; you decide.</p>
              <label className="agree" style={{ marginTop: 10 }}>
                <input type="checkbox" checked={seen} disabled={decided} onChange={e => setSeen(e.target.checked)} />
                <span>I reviewed these results myself.</span>
              </label>
            </>
          )}
        </div>
      </div>
      {!decided && (
        <Foot>
          <button className="btn btn-primary btn-block mono" disabled={!mule || !seen} onClick={() => decide('verified')}>Approve and give badge</button>
          <button className="link-btn" style={{ color: '#b3261e' }} onClick={() => decide('rejected')}>Reject application</button>
        </Foot>
      )}
    </>
  );
}
Admin.title = 'Admin: verification checklist';
