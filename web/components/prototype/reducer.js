// Prototype state: who is signed in, which screen is showing, the demo clock, and one booking whose money
// follows the group plan (Curlec holds it, SecureKenduri only says when to release). Pure, so it can be checked in Node.

export const START = {
  screen: 'welcome', params: {}, history: [],
  user: null,        // { role: 'host' | 'caterer' | 'admin', name, phone, catererId? }
  after: null,       // where to go once sign-up finishes (e.g. back to the booking the guest started)
  phase: 0,          // demo clock: 0 booking window, 1 = 14 days before, 2 = event day, 3 = 48 hours after
  booking: null,
  applicant: null,   // a caterer who signed up during the demo, waiting for admin review
};

export const total = b => b.pax * b.price;

// money released to the caterer can never exceed what the host has paid in
function release(b, amount) {
  const r = Math.max(0, Math.min(amount, b.paid - b.released));
  return { ...b, released: b.released + r };
}

function onBooking(s, f) { return s.booking ? { ...s, booking: f(s.booking) } : s; }

export function reducer(s, a) {
  switch (a.type) {
    case 'load': return { ...START, ...a.state };
    case 'reset': return START;
    case 'go': return { ...s, screen: a.screen, params: a.params || {}, history: [...s.history, { screen: s.screen, params: s.params }].slice(-30) };
    case 'back': {
      const h = s.history.at(-1);
      return h ? { ...s, screen: h.screen, params: h.params, history: s.history.slice(0, -1) } : s;
    }
    case 'jump': return { ...s, screen: a.screen, params: a.params || {}, history: [] };
    case 'login': return { ...s, user: a.user, screen: a.screen, params: a.params || {}, history: [], after: null };
    case 'logout': return { ...s, user: null, screen: 'welcome', params: {}, history: [] };
    case 'after': return { ...s, after: a.after };

    case 'book': return {
      ...s,
      booking: {
        catererId: a.catererId, pkg: a.pkg, price: a.price, pax: a.pax, date: a.date, venue: a.venue,
        paid: 0, released: 0, pending: 0, receipts: [], status: 'agreed', photos: false, dispute: null, review: null,
      },
    };
    // headcount can change until it locks 14 days before
    case 'pax': return s.phase > 0 ? s : onBooking(s, b => ({ ...b, pax: Math.max(50, a.pax) }));
    case 'pay': return onBooking(s, b => {
      let n = { ...b, paid: b.paid + a.amount, status: b.status === 'agreed' ? 'active' : b.status };
      if (n.paid >= total(n) && n.pending) { const p = n.pending; n = release({ ...n, pending: 0 }, p); } // 100% secured: pending invoices auto-release
      return n;
    });
    case 'invoice': return onBooking(s, b => {
      const n = release(b, a.amount), got = n.released - b.released;
      return { ...n, pending: b.pending + a.amount - got, receipts: [...b.receipts, { supplier: a.supplier, amount: a.amount, released: got }] };
    });
    case 'photos': return onBooking(s, b => ({ ...b, photos: true }));
    case 'received': return onBooking(s, b => ({ ...release(b, total(b) * .8 - b.released), status: 'received' }));
    case 'dispute': return onBooking(s, b => ({ ...b, status: 'dispute', dispute: a.dispute }));
    case 'review': return onBooking(s, b => ({ ...b, review: a.review }));

    case 'skip': {
      const phase = Math.min(3, s.phase + 1);
      let n = { ...s, phase };
      // event day passes: main payment auto-releases at midnight, then the final 20% after 48 hours with no dispute
      if (phase === 3) n = onBooking(n, b => (b.status === 'active' || b.status === 'received') && b.paid >= total(b)
        ? { ...release(b, total(b)), status: 'complete' } : b);
      return n;
    }

    case 'apply': return { ...s, applicant: { ...a.applicant, status: 'draft' } };
    case 'applicant': return { ...s, applicant: { ...s.applicant, ...a.patch } };
    default: return s;
  }
}
