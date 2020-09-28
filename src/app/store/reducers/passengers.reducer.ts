import * as PassengerActions from '../actions/passengers.actions';
import * as types from '../../models/flights.action.types';
import * as admintypes from '../../models/passengers.action.types'
import { PassengerState } from '../../models/app.state';
 
export const initialState: PassengerState = {
  passengers: [],
};
 
export function PassengersReducer(
  state = initialState,
  action: PassengerActions.Actions
): PassengerState {
  switch (action.type) {
    case types.LOAD_PASSENGERS_DATA_SUCCESS: {
      return { ...state, passengers: action.payload };
    }
    case admintypes.UPDATE_PASSENGER: {
      console.log('action type',action.type)
      console.log('inside reducer',state)

      const newState =  state.passengers.map(a => {
        if(a.id ===action.payload[0].id ){
          return action.payload[0]
        }
        return a
      })
      return {passengers : newState}

    }
    case admintypes.ADD_PASSENGER: {
      const passenger = action.payload;
      return { ...state, passengers: state.passengers.concat(passenger) };
    }
    default:
      return state;
  }
}