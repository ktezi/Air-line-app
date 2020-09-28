import { Action } from '@ngrx/store';
import * as types from '../../models/flights.action.types';
import * as admintypes from '../../models/passengers.action.types';
import { Passengers } from '../../models/passengers.modals';

// tslint:disable-next-line: class-name
export class loadPassengersDataAction implements Action {
  readonly type = types.LOAD_PASSENGERS_DATA;
}

// tslint:disable-next-line: class-name
export class loadPassengersSuccessAction implements Action {
  readonly type = types.LOAD_PASSENGERS_DATA_SUCCESS;
  constructor(public payload: any) {}
}

// tslint:disable-next-line: class-name
export class updatePassenger implements Action {
  readonly type = admintypes.UPDATE_PASSENGER;
  constructor(public payload: any) {}
}

// tslint:disable-next-line: class-name
export class updatePassengerSuccess implements Action {
  readonly type = admintypes.UPDATE_PASSENGER_SUCCESS;
  constructor(public payload: any) {}
}
// tslint:disable-next-line: class-name
export class createPassenger implements Action {
  readonly type = admintypes.CREATE_PASSENGER;
  constructor(public payload: Passengers) {}
}

// tslint:disable-next-line: class-name
export class addPassengerAction implements Action {
  readonly type = admintypes.ADD_PASSENGER;
  constructor(public payload: Passengers) {}
}

export type Actions = addPassengerAction | createPassenger | updatePassenger |loadPassengersDataAction |  loadPassengersSuccessAction ;
