// shortcut: example caterers, packages and reviews for the prototype; replace with real listings after the pilot.
export const CATERERS = [
  {
    id: 'mak-long', name: 'Dapur Mak Long', area: 'Shah Alam, Selangor', region: 'Klang Valley',
    photo: '/assets/buffet.jpg', rating: 4.9, reviews: 212, maxPax: 1500,
    packages: [
      { id: 'a', name: 'Nasi Minyak Set A', price: 14, menu: ['Nasi minyak', 'Ayam masak merah', 'Dalca sayur', 'Acar buah', 'Air sirap'] },
      { id: 'b', name: 'Nasi Minyak Set B', price: 20, menu: ['Nasi minyak', 'Ayam masak merah', 'Daging masak hitam', 'Dalca sayur', 'Acar buah', 'Pengat pisang', 'Air sirap bandung'] },
    ],
  },
  {
    id: 'seri-rasa', name: 'Seri Rasa Catering', area: 'Kajang, Selangor', region: 'Klang Valley',
    photo: '/assets/beriyani.jpg', rating: 4.8, reviews: 126, maxPax: 800,
    packages: [{ id: 'a', name: 'Beriyani Gam Kambing', price: 16, menu: ['Nasi beriyani gam', 'Kambing masak beriyani', 'Dalca', 'Acar timun', 'Air sirap'] }],
  },
  {
    id: 'rumah-rendang', name: 'Rumah Rendang', area: 'Seremban, Negeri Sembilan', region: 'Negeri Sembilan',
    photo: '/assets/rendang.jpg', rating: 4.8, reviews: 98, maxPax: 600,
    packages: [{ id: 'a', name: 'Kenduri Negeri', price: 18, menu: ['Nasi putih', 'Rendang daging', 'Lemang', 'Serunding', 'Air sirap'] }],
  },
  {
    id: 'selera-kampung', name: 'Selera Kampung', area: 'Klang, Selangor', region: 'Klang Valley',
    photo: '/assets/nasi-lemak.jpg', rating: 4.7, reviews: 164, maxPax: 500,
    packages: [{ id: 'a', name: 'Nasi Lemak Buffet', price: 12, menu: ['Nasi lemak', 'Sambal sotong', 'Ayam goreng berempah', 'Kuih muih', 'Teh tarik'] }],
  },
];

export const REVIEWS = [
  { who: 'Farah, Shah Alam', pax: 450, stars: 5, text: 'Food arrived 40 minutes early and the ayam masak merah ran out last, not first.' },
  { who: 'Hafiz, Klang', pax: 300, stars: 5, text: 'Liked seeing the ingredient receipts. Felt like we knew where the deposit went.' },
  { who: 'Mei Ling, Subang', pax: 120, stars: 4, text: 'Office open house. Easy to change the headcount two weeks before.' },
];

export const AREAS = ['Klang Valley', 'Negeri Sembilan', 'Johor', 'Penang', 'Perak'];

// the 5 onboarding checks every caterer passes (from the group plan)
export const CHECKS = [
  ['eKYC + live face check', 'IC scan matched to a live selfie'],
  ['SSM or LHDN registration', 'A registered business or home-based taxpayer'],
  ['Bank name match', 'Payout account in the same name as the IC or SSM'],
  ['Semak Mule check', 'Bank account and phone checked on PDRM Semak Mule'],
  ['Background scan', 'Web scan for scam reports, reviewed by our team'],
];

// what the demo clock shows at each phase
export const PHASES = ['3 months before the event', '14 days before the event', 'Event day', '48 hours after the event'];

export const catererById = id => CATERERS.find(c => c.id === id);
export const rm = n => 'RM' + Math.round(n).toLocaleString('en-MY');
