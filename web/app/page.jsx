import Nav from '@/components/Nav';
import HeroScene from '@/components/HeroScene';
import Rotator from '@/components/Rotator';
import './home.css';

export const metadata = { title: 'SecureKenduri — Book trusted kenduri caterers' };

export default function Page() {
  return (
    <div className="p-home">
      <header className="hero">
        <HeroScene />

        <div className="wrap">
          <Nav />

          <h1 aria-label="Every kenduri deserves a caterer you can trust."><span className="line"><span>Every <Rotator /> deserves</span></span><span className="line"><span>a caterer <span className="s">you can trust.</span></span></span></h1>
          <p className="lede">Find verified halal caterers, check their hygiene ratings and real reviews, and book the right one for your kenduri in minutes.</p>
          <div className="ctas">
            <a className="btn btn-primary mono" href="#">Find a caterer <span aria-hidden="true">&rarr;</span></a>
            <a className="btn btn-ghost mono" href="/for-caterers">List your business
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/></svg>
            </a>
          </div>
        </div>
      </header>

      {/* shortcut: placeholder caterer names as text; swap in real partner logos once they sign up */}
      <section className="logos">
        <p className="logos-cap">Trusted by caterers across Malaysia.</p>
        <div className="marquee">
          <div className="track">
            <div className="set">
                  <span className="bold">Dapur Mak Long</span>
                  <span className="serif">Seri Rasa Catering</span>
                  <span className="caps">NASI MINYAK PAK ABU</span>
                  <span>Selera Kampung</span>
                  <span className="mono">TERATAK KATERING</span>
                  <span className="caps">DULANG EMAS</span>
                  <span className="serif">Rumah Rendang</span>
                  <span className="bold">Kenduri Kita Co.</span>
            </div>
            <div className="set" aria-hidden="true">
                  <span className="bold">Dapur Mak Long</span>
                  <span className="serif">Seri Rasa Catering</span>
                  <span className="caps">NASI MINYAK PAK ABU</span>
                  <span>Selera Kampung</span>
                  <span className="mono">TERATAK KATERING</span>
                  <span className="caps">DULANG EMAS</span>
                  <span className="serif">Rumah Rendang</span>
                  <span className="bold">Kenduri Kita Co.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="block how" id="how">
        <div className="wrap how-grid">
          <div>
            <div className="pin">
              <p className="eyebrow mono">How it works</p>
              <h2>From search to <span className="b">serving</span> in three steps.</h2>
              <p className="sub">No more asking the family WhatsApp group &ldquo;anyone know a good caterer?&rdquo; Find, check and book in one place.</p>
            </div>
          </div>
          <div className="steps">
            <article className="step" style={{ '--i': '0', '--img': 'url(/assets/step-search.jpg)', '--pos': 'center 35%' }}>
              <div className="step-top"><span className="mono">01 / 03</span><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div>
              <h3>Search caterers near you</h3>
              <p>Filter by area, date, number of guests and budget per pax. Only caterers who pass our checks are listed.</p>
              <div className="step-ui"><span className="chip">Shah Alam</span><span className="chip">Sat, 14 Mar</span><span className="chip">300 pax</span><span className="chip">RM 12&ndash;18 / pax</span></div>
            </article>
            <article className="step" style={{ '--i': '1', '--img': 'url(/assets/step-compare.jpg)', '--pos': 'center 35%' }}>
              <div className="step-top"><span className="mono">02 / 03</span><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>
              <h3>Compare what actually matters</h3>
              <p>See each caterer&rsquo;s halal certificate, hygiene grade, menu packages and reviews from real hosts, side by side.</p>
              <div className="step-ui"><span className="chip ok">&#10003; Halal (JAKIM)</span><span className="chip ok">&#10003; Hygiene grade A</span><span className="chip ok">&#10003; Food handlers trained</span><span className="chip">4.8 &#9733; &middot; 126 reviews</span></div>
            </article>
            <article className="step" style={{ '--i': '2', '--img': 'url(/assets/step-book.jpg)', '--pos': 'center 60%' }}>
              <div className="step-top"><span className="mono">03 / 03</span><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/></svg></div>
              <h3>Book and lock the date</h3>
              <p>Pay your deposit through SecureKenduri and get the menu, pax and price confirmed in writing. No more verbal deals.</p>
              <div className="step-ui"><span className="chip ok">&#10003; Deposit paid</span><span className="chip ok">&#10003; Menu confirmed</span><span className="chip">Sat, 14 Mar &middot; 300 pax</span></div>
            </article>
          </div>
        </div>
      </section>

      {/* shortcut: example caterers and ratings for the pitch; replace with real listings once caterers sign up.
           Photos: Pexels (free licence, pexels.com/license) — 2291367, 16229982, 37339493, 11912788;
           step cards: 27176011, 5779747, 2649771 */}
      <section className="block featured">
        <div className="wrap">
          <div className="feat-head">
            <div>
              <p className="eyebrow mono">Featured caterers</p>
              <h2>Packages hosts are <span className="b">booking</span> this month.</h2>
            </div>
            <a className="link" href="#">See all caterers &rarr;</a>
          </div>
          <div className="cards">
            <a className="card" href="#">
              <div className="card-photo">
                <img src="/assets/buffet.jpg" alt="Buffet dishes kept warm in food warmers" loading="lazy" />
                <div className="badges"><span className="badge mono">Halal</span><span className="badge grade mono">Grade A</span></div>
              </div>
              <div className="card-body">
                <h3>Dapur Mak Long</h3>
                <p className="meta">Shah Alam, Selangor</p>
                <p className="meta">Nasi minyak, ayam masak merah, acar</p>
                <div className="card-foot">
                  <span className="price"><small>from </small><b>RM 14</b><small> / pax</small></span>
                  <span className="rating">4.9 &#9733; (212)</span>
                </div>
              </div>
            </a>
            <a className="card" href="#">
              <div className="card-photo">
                <img src="/assets/beriyani.jpg" alt="Mutton biryani in a clay pot" loading="lazy" />
                <div className="badges"><span className="badge mono">Halal</span><span className="badge grade mono">Grade A</span></div>
              </div>
              <div className="card-body">
                <h3>Seri Rasa Catering</h3>
                <p className="meta">Kajang, Selangor</p>
                <p className="meta">Nasi beriyani gam, kambing, dalca</p>
                <div className="card-foot">
                  <span className="price"><small>from </small><b>RM 16</b><small> / pax</small></span>
                  <span className="rating">4.8 &#9733; (126)</span>
                </div>
              </div>
            </a>
            <a className="card" href="#">
              <div className="card-photo">
                <img style={{ 'objectPosition': 'center 78%' }} src="/assets/rendang.jpg" alt="Rice with beef rendang and side dishes" loading="lazy" />
                <div className="badges"><span className="badge mono">Halal</span><span className="badge grade mono">Grade A</span></div>
              </div>
              <div className="card-body">
                <h3>Rumah Rendang</h3>
                <p className="meta">Seremban, Negeri Sembilan</p>
                <p className="meta">Rendang daging, lemang, serunding</p>
                <div className="card-foot">
                  <span className="price"><small>from </small><b>RM 18</b><small> / pax</small></span>
                  <span className="rating">4.8 &#9733; (98)</span>
                </div>
              </div>
            </a>
            <a className="card" href="#">
              <div className="card-photo">
                <img src="/assets/nasi-lemak.jpg" alt="Nasi lemak served on a banana leaf" loading="lazy" />
                <div className="badges"><span className="badge mono">Halal</span><span className="badge grade mono">Grade A</span></div>
              </div>
              <div className="card-body">
                <h3>Selera Kampung</h3>
                <p className="meta">Klang, Selangor</p>
                <p className="meta">Nasi lemak buffet, sambal sotong, kuih</p>
                <div className="card-foot">
                  <span className="price"><small>from </small><b>RM 12</b><small> / pax</small></span>
                  <span className="rating">4.7 &#9733; (164)</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
