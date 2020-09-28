import * as PassengerActions from '../actions/admin.actions.';
import * as types from '../../models/passengers.action.types';
import { PassengerState } from '../../models/app.state';
 
export const initialState: PassengerState = {
  passengers: [],
};
 
export function PassengersReducer(
  state = initialState,
  action: PassengerActions.Actions
): PassengerState {
  switch (action.type) {
    case types.UPDATE_PASSENGER: {
      return { ...state, passengers: action.payload };
    }
    default:
      return state;
  }
}