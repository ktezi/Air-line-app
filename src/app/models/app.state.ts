import { Flights } from './flights.modals';
import { Passengers } from './passengers.modals';
export interface AppState {
  readonly flights: Flights[];
}

export interface SocialLoginState {
  readonly SocialLogin: any;
}

export interface PassengerState {
  readonly passengers: any;
}
