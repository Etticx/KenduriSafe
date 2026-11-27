import { Welcome, Login, Otp, SignupHost, SignupCaterer } from './Auth';

// screen id -> component; each component's .title labels it in the demo "Jump to screen" list
export const SCREENS = {
  welcome: Welcome, login: Login, otp: Otp, 'signup-host': SignupHost, 'signup-caterer': SignupCaterer,
};
