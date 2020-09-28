import * as flightActions from '../actions/flights.actions';
import * as types from '../../models/flights.action.types';
import { AppState } from '../../models/app.state';

export const initialState: AppState = {
  flights: [],
};

export function FlightReducer(
  state = initialState,
  action: flightActions.Actions
): AppState {
  switch (action.type) {
    case types.LOAD_FLIGHTS_DATA_SUCCESS: {
      return { ...state, flights: action.payload };
    }
    case types.ADD_ANCILLARY: {
      let flight = action.payload;
      return { ...state, flights: state.flights.concat(flight) };
    }
    case types.UPDATE_ANCILLARY_SUCCESS: {
      return {
        ...state,
        flights: state.flights.map((f) => {
          if (f.id === action.payload.id) {
            return action.payload;
          } else {
            return f;
          }
        }),
      };
    }
    case types.DELETE_ANCILLARY_SUCCESS:
      return {
        ...state,
        flights: state.flights.filter(
          (flight) => flight.id !== action.payload.id
        ),
      };

    case types.ADD_SPECIAL_MEALS: {
      var flight = action.payload;
      return { ...state, flights: state.flights.concat(flight) };
    }

    case types.UPDATE_SPECIAL_MEALS_SUCCESS: {
      return {
        ...state,
        flights: state.flights.map((f) => {
          if (f.id === action.payload.id) {
            return action.payload;
          } else {
            return f;
          }
        }),
      };
    }
    case types.DELETE_SPECIAL_MEALS_SUCCESS:
      return {
        ...state,
        flights: state.flights.filter(
          (flight) => flight.id !== action.payload.id
        ),
      };

    case types.ADD_SHOPPING_ITEMS: {
      var flight = action.payload;
      return { ...state, flights: state.flights.concat(flight) };
    }

    case types.UPDATE_SHOPPING_ITEMS_SUCCESS: {
      return {
        ...state,
        flights: state.flights.map((f) => {
          if (f.id === action.payload.id) {
            return action.payload;
          } else {
            return f;
          }
        }),
      };
    }
    case types.DELETE_SHOPPING_ITEMS_SUCCESS:
      return {
        ...state,
        flights: state.flights.filter(
          (flight) => flight.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
}