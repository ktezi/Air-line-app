import { ActionReducerMap } from '@ngrx/store';
import { FlightReducer } from '../store/reducers/flights.reducer';
import { SocialLoginReducer } from '../store/reducers/sociallogin.reducer';
import { PassengersReducer} from '../store/reducers/passengers.reducer'
import { AppState, SocialLoginState, PassengerState} from '../models/app.state';

export interface FinalAppState {
    AppState: AppState ;
    SocialLoginState: SocialLoginState;
    PassengerState: PassengerState;
}

export const reducers: ActionReducerMap<FinalAppState> = {
    AppState: FlightReducer,
    SocialLoginState: SocialLoginReducer,
    PassengerState: PassengersReducer
};