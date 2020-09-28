import { Action } from '@ngrx/store';
import * as types from '../../models/passengers.action.types';

export class updatePassenger implements Action {
  readonly type = types.UPDATE_PASSENGER;
  constructor(public payload: any) {}
}

export type Actions = updatePassenger ;
