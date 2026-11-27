import { Welcome, Login, Otp, SignupHost, SignupCaterer } from './Auth';
import { Search, List, Profile } from './Browse';
import { Agreement, Checkout } from './Book';
import { Tracker, Dispute } from './Tracker';
import { Verify, Applied } from './Verify';
import { CDash, Invoice, Delivery, CPlanner } from './Caterer';

// screen id -> component; each component's .title labels it in the demo "Jump to screen" list
export const SCREENS = {
  welcome: Welcome, login: Login, otp: Otp, 'signup-host': SignupHost, 'signup-caterer': SignupCaterer,
  search: Search, list: List, profile: Profile, agreement: Agreement, checkout: Checkout, tracker: Tracker, dispute: Dispute,
  verify: Verify, applied: Applied,
  cdash: CDash, invoice: Invoice, delivery: Delivery, cplanner: CPlanner,
};
