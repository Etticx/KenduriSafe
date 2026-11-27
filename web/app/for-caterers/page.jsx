import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DitherArt from '@/components/DitherArt';
import Planner from '@/components/Planner';
import './caterers.css';

export const metadata = { title: 'KenduriSafe for caterers — Get paid before you cook' };

export default function Page() {
  return (
    <div className="p-caterers">
      <header className="hero">
        <div className="wrap">
          <Nav current="caterers" />

          <div className="hero-grid">
            <div>
              <p className="eyebrow mono">For caterers</p>
              <h1 aria-label="Get paid in full before you start cooking."><span className="line"><span>Get paid in full</span></span><span className="line"><span><span className="b">before</span> <span className="s">you start cooking.</span></span></span></h1>
              <p className="lede">KenduriSafe secures 100% of the booking before the event, releases your ingredient money against receipts, and gives honest caterers a verified badge hosts can trust.</p>
              <div className="ctas">
                <a className="btn btn-primary mono" href="#join">List your business <span aria-hidden="true">&rarr;</span></a>
                <a className="btn btn-ghost mono" href="#pricing">See pricing</a>
              </div>
            </div>
            <DitherArt id="art" art="kawah" animate />
          </div>
        </div>
      </header>

      <section className="block" id="problems">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow mono">Sound familiar?</p>
            <h2>Catering is hard enough without chasing <span className="b">payments.</span></h2>
          </div>
          <div className="stats">
            <div className="stat"><b>500 &rarr; 1,000</b><h3>More guests than booked</h3><p>Hosts book food for 500, invite 1,000, then blame the caterer when it runs out.</p><a className="src mono" href="https://www.kosmo.com.my/2023/01/08/tuan-rumah-tempah-makanan-500-orang-jemput-1000-tetamu/" target="_blank" rel="noopener">Kosmo, 2023 ↗</a></div>
            <div className="stat"><b>Late cancel</b><h3>After the ingredients are bought</h3><p>The money is already spent at the market, but the host wants the whole deposit back.</p><a className="src mono" href="https://www.kosmo.com.my/2023/01/08/tuan-rumah-tempah-makanan-500-orang-jemput-1000-tetamu/" target="_blank" rel="noopener">Kosmo, 2023 ↗</a></div>
            <div className="stat"><b>66</b><h3>Fake-order scams</h3><p>Cases against caterers and pastry businesses in Perak in one year. Police now advise taking a deposit.</p><a className="src mono" href="https://www.utusan.com.my/nasional/2026/03/penipuan-tempahan-kuih-raya-babitkan-kerugian-rm300000/" target="_blank" rel="noopener">Utusan Malaysia, 2026 ↗</a></div>
          </div>
        </div>
      </section>

      <section className="block" id="benefits">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow mono">What you get</p>
            <h2>Everything a small caterer needs to say <span className="b">yes</span> with confidence.</h2>
          </div>
          <div className="perks">
            <article className="perk">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <h3>100% secured before you cook</h3>
              <p>The full amount is paid in 14 days before the event. If it isn&rsquo;t, the booking cancels and you don&rsquo;t cook.</p>
            </article>
            <article className="perk">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8M8 11h8M8 15h5"/></svg>
              <h3>Ingredient money upfront</h3>
              <p>Upload your market receipts any time after the deposit. That exact amount is released to you, so you never front the cost.</p>
            </article>
            <article className="perk">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <h3>Headcount that stays put</h3>
              <p>Guest numbers lock 14 days before. Extra guests after that are a paid top-up, not your loss.</p>
            </article>
            <article className="perk">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h6M9 13h6M9 17h6"/></svg>
              <h3>A written agreement</h3>
              <p>Menu, pax, price, delivery time and cancellation policy, agreed by both sides before any money moves.</p>
            </article>
            <article className="perk">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <h3>Paid automatically</h3>
              <p>Once delivery is confirmed, or 48 hours pass with no dispute, the money releases on its own. No chasing.</p>
            </article>
            <article className="perk">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
              <h3>A verified badge</h3>
              <p>Pass our checks once and hosts can see you&rsquo;re real. Reviews only come from real bookings.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="block" id="payouts">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow mono">When you get paid</p>
            <h2>Your money, on a schedule you can <span className="b">plan around.</span></h2>
            <p className="sub">Payments are held by Razorpay Curlec, a regulated Malaysian payment gateway, and released to your bank at each milestone. Payouts usually land in about two working days.</p>
          </div>
          <ol className="track">
            <li><span className="mono">After the deposit</span><h3>Ingredient money</h3><p>Upload receipts and get exactly those amounts, up to what the host has paid so far.</p><b>Receipts</b></li>
            <li><span className="mono">14 days before</span><h3>100% secured</h3><p>The host pays the balance and the headcount locks. Now you can start cooking.</p><b>Secured</b></li>
            <li><span className="mono">Event day</span><h3>80% released</h3><p>Upload delivery photos. When the host taps <i>&ldquo;Makanan Diterima&rdquo;</i>, or at midnight, it&rsquo;s yours.</p><b>80%</b></li>
            <li><span className="mono">48 hours after</span><h3>Final 20%</h3><p>Releases automatically if no dispute is raised. Nobody can hold it back.</p><b>100%</b></li>
          </ol>

          <div className="cancel">
            <div>
              <p className="eyebrow mono">If the host cancels</p>
              <h3>You never lose what you&rsquo;ve already spent.</h3>
              <p>You keep whichever is higher: the ingredient receipts you&rsquo;ve uploaded, or the cancellation fee.</p>
            </div>
            <table>
              <thead><tr><th className="mono">Host cancels</th><th className="mono">You keep the higher of</th></tr></thead>
              <tbody>
                <tr><td>More than 30 days before</td><td>Your receipts, or <b>10%</b></td></tr>
                <tr><td>14 to 30 days before</td><td>Your receipts, or <b>30%</b></td></tr>
                <tr><td>Less than 14 days before</td><td>Your receipts, or <b>50%</b></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="block" id="planner">
        <div className="wrap plan-grid">
          <div>
            <p className="eyebrow mono">Headcount planner</p>
            <h2>Guests change. Your shopping list <span className="b">keeps up.</span></h2>
            <p className="sub">When the host updates their RSVP, you see straight away how much rice, chicken and everything else to buy. Set your own amounts per pax for each menu, and stop guessing at the market.</p>
          </div>
          <Planner />
        </div>
      </section>

      <section className="block" id="join">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow mono">How to join</p>
            <h2>Get verified once, then take bookings <span className="b">with a badge.</span></h2>
            <p className="sub">The same checks that protect hosts are what make your business stand out from the ones that disappear.</p>
          </div>
          <ol className="join">
            <li><h3>Create your profile</h3><p>Add your menus, price per pax, the areas you cover and how many guests you can handle.</p></li>
            <li><h3>Verify who you are</h3><p>Scan your IC and take a live selfie, turning left and right, so we can match it to your IC photo.</p></li>
            <li><h3>Verify your business</h3><p>Add your SSM registration, or LHDN registration if you cook from home, and a bank account in the same name.</p></li>
            <li><h3>We run our checks</h3><p>Our team checks your bank account and phone number on PDRM&rsquo;s Semak Mule and looks for scam reports online.</p></li>
            <li><h3>Start taking bookings</h3><p>Your verified badge goes live and hosts can book you, with every payment protected.</p></li>
          </ol>
          <div className="prep">
            <span className="mono">Have these ready</span>
            <span className="chip">MyKad (IC)</span><span className="chip">Phone with a camera</span><span className="chip">SSM or LHDN number</span><span className="chip">Bank account in your name</span><span className="chip">Your menu and prices</span>
          </div>
        </div>
      </section>

      {/* shortcut: prices from the group plan (Basic free, Pro ~RM49, ~1.5-2% per booking); update once the caterer survey settles them */}
      <section className="block" id="pricing">
        <div className="wrap">
          <div className="head">
            <p className="eyebrow mono">Pricing</p>
            <h2>Free to start. Upgrade when you&rsquo;re <span className="b">busy.</span></h2>
          </div>
          <div className="plans">
            <article className="plan">
              <p className="mono">Basic</p>
              <p className="price"><b>RM0</b><span>/ month</span></p>
              <p className="for">For home-based caterers trying it out.</p>
              <ul>
                <li>Up to 3 bookings a month</li>
                <li>Protected staged payments</li>
                <li>Digital booking agreement</li>
                <li>Shared timeline and reminders</li>
              </ul>
              <a className="btn btn-ghost mono" href="#join">Start free</a>
            </article>
            <article className="plan pro">
              <p className="mono">Pro <span className="tag">Most caterers</span></p>
              <p className="price"><b>RM49</b><span>/ month</span></p>
              <p className="for">For caterers taking bookings every week.</p>
              <ul>
                <li>Unlimited bookings</li>
                <li>Headcount planner</li>
                <li>Verified badge on your profile</li>
                <li>Everything in Basic</li>
              </ul>
              <a className="btn btn-primary mono" href="#join">Go Pro <span aria-hidden="true">&rarr;</span></a>
            </article>
            <div className="fee">
              <p className="mono">Per booking</p>
              <p className="price"><b>~1.5&ndash;2%</b></p>
              <p>A small fee on each booking. Part of it goes into the protection fund that refunds hosts if a caterer runs off, which keeps hosts confident enough to book you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="faq">
        <div className="wrap faq-grid">
          <div>
            <p className="eyebrow mono">Questions caterers ask</p>
            <h2>The <span className="b">honest</span> answers.</h2>
          </div>
          <div className="faq">
            <details open>
              <summary>Is it legal for an app to hold my money?</summary>
              <p>We don&rsquo;t hold it. Payments sit with Razorpay Curlec, a regulated Malaysian payment gateway, as the Financial Services Act 2013 requires. KenduriSafe only tells Curlec when each stage can be released to you.</p>
            </details>
            <details>
              <summary>What if the host tries to scam me?</summary>
              <p>The booking is 100% paid before the event, so you never cook on a promise. Your timestamped delivery photos prove the food arrived, payment releases automatically, and late cancellations pay you a cancellation fee.</p>
            </details>
            <details>
              <summary>Do I have to wait until after the event to buy ingredients?</summary>
              <p>No. Upload your ingredient invoices or receipts any time after the deposit, up to 3 days before the event, and that exact amount is released to you.</p>
            </details>
            <details>
              <summary>What happens if the host says the food was wrong?</summary>
              <p>They have 48 hours to raise a dispute. The remaining money is frozen, both sides submit evidence within 3 days, and our team decides within 7 days. If it still isn&rsquo;t settled, it goes to the Consumer Claims Tribunal.</p>
            </details>
            <details>
              <summary>I cook from home without SSM. Can I join?</summary>
              <p>Yes. Home-based caterers can verify with LHDN registration instead of SSM, as long as the bank account is in the same name.</p>
            </details>
            <details>
              <summary>Why do you check Semak Mule?</summary>
              <p>So hosts know your bank account isn&rsquo;t linked to scams. It&rsquo;s the reason a verified badge means something, and why hosts are willing to book a caterer they&rsquo;ve never met.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Cook with the money already <i>secured.</i></h2>
          <p className="sub">Free to start. Verified once. Paid on time, every booking.</p>
          <div className="row">
            <a className="btn btn-primary mono" href="#join">List your business <span aria-hidden="true">&rarr;</span></a>
            <a className="btn btn-ghost mono" href="/about">How KenduriSafe works</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
