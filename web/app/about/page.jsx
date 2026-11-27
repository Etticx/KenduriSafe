import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DitherArt from '@/components/DitherArt';
import ChatPhone from '@/components/ChatPhone';
import './about.css';

export const metadata = { title: 'About SecureKenduri — Protection for hosts, certainty for caterers' };

export default function Page() {
  return (
    <div className="p-about">
      <header className="hero">
        <div className="wrap">
          <Nav current="about" />

          <div className="hero-grid">
            <div>
              <p className="eyebrow mono">About SecureKenduri</p>
              <h1 aria-label="Protection for the host, certainty for the caterer."><span className="line"><span>Protection for the host,</span></span><span className="line"><span><span className="b">certainty</span> <span className="s">for the caterer.</span></span></span></h1>
              <p className="lede">SecureKenduri is a catering booking platform built for <i>kenduri</i>. Every booking comes with a written agreement, staged payments held by a regulated payment gateway, and a caterer whose identity has actually been checked.</p>
              <p className="pitch"><b>Like Shopee Guarantee, but built for <i>kenduri</i>.</b> Money is only released when each part of the job is done.</p>
            </div>
            <DitherArt id="art" art="shield" />
          </div>
        </div>
      </header>

      <section className="block" id="why">
        <div className="wrap">
          <div className="head why-grid">
            <div>
              <p className="eyebrow mono">Why we exist</p>
              <h2>Today, a <i>kenduri</i> runs on a WhatsApp chat and a <span className="b">bank transfer.</span></h2>
              <p className="sub">Catering is the biggest bill of the day, yet most deposits are paid with no agreement, no record and no protection. When it goes wrong, it goes wrong in front of a thousand guests.</p>
            </div>
            {/* illustrative chat: a host messaging a caterer who stops replying after the deposit */}
            <ChatPhone>
                <div className="screen" aria-hidden="true">
                <p className="peer"><span className="av"></span><b>Caterer</b></p>
                <p className="msg in">Boleh, 300 pax. Deposit 50% dulu ya<time>Mon 2:10 PM</time></p>
                <p className="msg out">Dah transfer RM5,000<time>Mon 9:14 PM <span className="tick read">&#10003;&#10003;</span></time></p>
                <p className="day mono">Malam sebelum majlis</p>
                <p className="msg out">Esok pukul 11 jadi kan?<time>8:02 PM <span className="tick">&#10003;</span></time></p>
                <p className="msg out">Hello?? Tak dapat call<time>11:47 PM <span className="tick">&#10003;</span></time></p>
                <p className="msg in typing"><span></span><span></span><span></span></p>
              </div>
              </ChatPhone>
          </div>
          <div className="stats">
            <div className="stat"><b>35&ndash;50%</b><p>of a wedding&rsquo;s total cost goes to catering, the single biggest line in the budget.</p><a className="src mono" href="https://www.imoney.my/articles/wedding-cost-malaysia-2026" target="_blank" rel="noopener">iMoney, 2026 ↗</a></div>
            <div className="stat"><b>RM13,000</b><p>lost by a groom when the caterer stopped replying the night before. The family cooked about 400 of 1,000 portions themselves.</p><a className="src mono" href="https://says.com/my/seismik/catering-lesap-pengantin-terpaksa-cari-ayam-periuk-meja-kerusi-malam-sebelum-majlis" target="_blank" rel="noopener">SAYS, 2023 ↗</a></div>
            <div className="stat"><b>RM11,000</b><p>lost by a couple in Tampin after paying RM5,800 by bank transfer to a caterer who never showed up.</p><a className="src mono" href="https://says.com/my/berita/katerer-lesap-saat-akhir-pengantin-rugi-rm11000-ibu-pula-gadai-gelang-emas" target="_blank" rel="noopener">SAYS, 2026 ↗</a></div>
            <div className="stat"><b>66</b><p>fake-order scam cases in Perak in one year, targeting caterers and pastry businesses. Caterers get cheated too.</p><a className="src mono" href="https://www.utusan.com.my/nasional/2026/03/penipuan-tempahan-kuih-raya-babitkan-kerugian-rm300000/" target="_blank" rel="noopener">Utusan Malaysia, 2026 ↗</a></div>
          </div>
        </div>
      </section>

      <section className="block" id="sides">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow mono">Both sides of the table</p>
            <h2>Built for the people paying <span className="b">and</span> the people cooking.</h2>
          </div>
          <div className="sides">
            <div className="side">
              <span className="chip ok mono">For hosts</span>
              <h3>Families and couples holding a <i>kenduri</i></h3>
              <div className="cols mono"><span>The worry today</span><span>With SecureKenduri</span></div>
              <ul>
                <li><span>Big deposit sent over WhatsApp with no protection</span><span>Deposit is held by the payment gateway, not paid straight to the caterer</span></li>
                <li><span>Caterer disappears or under-delivers</span><span>Most of the money only moves after you confirm the food arrived</span></li>
                <li><span>Nothing in writing</span><span>Menu, pax, price, time and cancellation policy agreed in one digital agreement</span></li>
              </ul>
            </div>
            <div className="side">
              <span className="chip ok mono">For caterers</span>
              <h3>Home-based and small catering businesses</h3>
              <div className="cols mono"><span>The worry today</span><span>With SecureKenduri</span></div>
              <ul>
                <li><span>Hosts invite more guests than booked</span><span>Headcount locks 14 days before; extra guests are a top-up</span></li>
                <li><span>Late cancellations and unpaid balances</span><span>100% is secured before you cook, with a clear cancellation fee</span></li>
                <li><span>Fake-order scams</span><span>You never cook before the host has paid in full, so a fake order costs you nothing</span></li>
                <li><span>Honest caterers struggle to earn trust</span><span>A verified badge, and reviews from real bookings only</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="money">
        <div className="wrap flow-grid">
          <div className="pin">
            <p className="eyebrow mono">Where your money waits</p>
            <h2>Paid in stages, released when the job is <span className="b">done.</span></h2>
            <p className="sub">An example RM10,000 booking. Before the event, the caterer only receives what their ingredient receipts show. The rest stays locked until the food arrives.</p>
            <div className="safe">
              <span className="mono">Curlec is the safe. We&rsquo;re the remote control.</span>
              <p>SecureKenduri never holds your money. Payments sit with Razorpay Curlec, a regulated Malaysian payment gateway. We only tell it when each stage can be released.</p>
            </div>
          </div>
          <ol className="stages">
            <li className="stage done">
              <span className="when mono">At booking</span>
              <h3>Pay a 50% deposit</h3>
              <p>RM5,000, paid within 3 days of the caterer accepting. It&rsquo;s held, not handed over. Booking less than 14 days before the event? You pay 100% upfront.</p>
              <div className="bar" aria-label="50% secured, none released"><span className="held" style={{ 'width': '50%' }}></span></div>
            </li>
            <li className="stage done">
              <span className="when mono">Any time after</span>
              <h3>Ingredient money, against receipts</h3>
              <p>The caterer uploads ingredient invoices or receipts. You can see every one, and only that exact amount is released so they can start buying.</p>
              <div className="bar" aria-label="Ingredient amount released"><span className="paid" style={{ 'width': '18%' }}></span><span className="held" style={{ 'width': '32%' }}></span></div>
            </li>
            <li className="stage done">
              <span className="when mono">14 days before</span>
              <h3>Headcount locks, 100% secured</h3>
              <p>Final guest count is set (extra guests mean a top-up) and the remaining 50% is paid. If it isn&rsquo;t, the booking cancels automatically.</p>
              <div className="bar" aria-label="100% secured"><span className="paid" style={{ 'width': '18%' }}></span><span className="held" style={{ 'width': '82%' }}></span></div>
            </li>
            <li className="stage done">
              <span className="when mono">Event day</span>
              <h3>Tap <i>&ldquo;Makanan Diterima&rdquo;</i></h3>
              <p>The caterer uploads timestamped delivery photos. You confirm the food arrived and everything except the final 20% is released.</p>
              <div className="bar" aria-label="80% released"><span className="paid" style={{ 'width': '80%' }}></span><span className="held" style={{ 'width': '20%' }}></span></div>
            </li>
            <li className="stage done">
              <span className="when mono">48 hours after</span>
              <h3>Final 20%, automatically</h3>
              <p>No dispute raised? The last 20% releases on its own. Nobody can hold the caterer&rsquo;s money hostage.</p>
              <div className="bar" aria-label="100% released"><span className="paid" style={{ 'width': '100%' }}></span></div>
              <div className="legend mono"><span><i style={{ 'background': 'var(--blue)' }}></i>Released to caterer</span><span><i style={{ 'background': 'var(--blue-soft)' }}></i>Held by Curlec</span></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="block" id="verify">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow mono">How we verify caterers</p>
            <h2>Five checks before a caterer can take <span className="b">a single booking.</span></h2>
          </div>
          <div className="layers">
            <article className="layer">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="10" r="3"/><path d="M7 18a5 5 0 0 1 10 0"/></svg>
              <h3>eKYC with a live face check</h3>
              <p>IC scan plus a live selfie (turn left, turn right) matched to the IC photo. Stops stolen ICs.</p>
            </article>
            <article className="layer">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6M9 13h6M9 17h6"/></svg>
              <h3>SSM or LHDN registration</h3>
              <p>A registered business, or LHDN registration for home-based caterers.</p>
            </article>
            <article className="layer">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3z"/></svg>
              <h3>Bank name match</h3>
              <p>The payout account must be in the same name as the IC or SSM record.</p>
            </article>
            <article className="layer">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
              <h3>Semak Mule check</h3>
              <p>Our team checks the bank account and phone number against PDRM&rsquo;s Semak Mule.</p>
            </article>
            <article className="layer">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v3M11 14h.01"/></svg>
              <h3>Background scan</h3>
              <p>AI searches the web for scam reports. A person on our team makes the final call.</p>
            </article>
          </div>
          <div className="honest">
            <p className="mono eyebrow">Being honest</p>
            <div>
              <p>No check can stop someone from choosing to cheat. What verification does is make them <span style={{ 'color': 'var(--blue)' }}>fully traceable</span>, with a complete evidence pack ready for the police.</p>
              <div className="chips" style={{ 'marginTop': '24px' }}>
                <span className="chip">IC + face match</span><span className="chip">SSM / LHDN</span><span className="chip">Matched bank account</span><span className="chip">Digital agreement</span><span className="chip">In-app chat log</span><span className="chip">Payment records</span><span className="chip">Delivery photos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="disputes">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow mono">If something goes wrong</p>
            <h2>A clear process, with a <span className="b">deadline</span> at every step.</h2>
            <p className="sub">Raise a dispute within 48 hours of the event. If a verified caterer runs off with ingredient money, our protection fund refunds the host.</p>
          </div>
          <ol className="dispute">
            <li><h3>Freeze</h3><p>Any money still held stays locked. Nothing moves until it&rsquo;s settled.</p></li>
            <li><h3>Evidence</h3><p>Both sides submit evidence within 3 days. The side that doesn&rsquo;t submit loses.</p></li>
            <li><h3>Mediation</h3><p>Our team reviews the agreement, chat, photos and receipts and decides within 7 days.</p></li>
            <li><h3>Escalation</h3><p>Still unresolved? It goes to the Consumer Claims Tribunal or a police report, with the full evidence trail.</p></li>
          </ol>
        </div>
      </section>

      <section className="block" id="who">
        <div className="wrap who">
          <div>
            <p className="eyebrow mono">Who we are</p>
            <h2>Amanah Kenduri <span className="b">Sdn Bhd</span></h2>
          </div>
          <div>
            <div className="sub" style={{ 'maxWidth': '620px', 'marginTop': '0' }}>
              <p>We started SecureKenduri as a UiTM technology entrepreneurship project, after reading one too many stories of families cooking their own wedding food the night before.</p>
              <p>We didn&rsquo;t invent anything new. We put together tools Malaysians already trust (online booking, held payments, identity checks) and built them around how a <i>kenduri</i> actually works.</p>
            </div>
            <div className="facts" style={{ 'marginTop': '40px' }}>
              <div><span className="mono">Payment partner</span><b>Razorpay Curlec, a regulated Malaysian payment gateway</b></div>
              <div><span className="mono">Caterers we serve</span><b>Home-based and small caterers, 50 to 1,000 pax</b></div>
              <div><span className="mono">Events</span><b>Weddings, aqiqah, tahlil, open houses, corporate</b></div>
              <div><span className="mono">For caterers</span><b>Free to start, with a Pro plan for growing businesses</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Your <i>kenduri</i>, booked safely from deposit to the last plate.</h2>
          <p className="sub">Find a verified caterer, or list your business and get paid with certainty.</p>
          <div className="row">
            <a className="btn btn-primary mono" href="/">Find a caterer <span aria-hidden="true">&rarr;</span></a>
            <a className="btn btn-ghost mono" href="/for-caterers">List your business</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
