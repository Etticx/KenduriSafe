import { Welcome, Login, Otp, SignupHost, SignupCaterer } from './Auth';
import { Search, List, Profile } from './Browse';

// screen id -> component; each component's .title labels it in the demo "Jump to screen" list
export const SCREENS = {
  welcome: Welcome, login: Login, otp: Otp, 'signup-host': SignupHost, 'signup-caterer': SignupCaterer,
  search: Search, list: List, profile: Profile,
};
