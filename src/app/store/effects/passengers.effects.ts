import { Injectable } from '@angular/core';
import { FlightsServices } from '../../app.services';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as types from '../../models/flights.action.types';
import * as admintypes from '../../models/passengers.action.types'
import * as passengersActions from '../actions/passengers.actions';
import { Passengers } from 'src/app/models/passengers.modals';
@Injectable({
  providedIn: 'root',
})
export class PassengersEffects {
  constructor(
    private flightService: FlightsServices,
    private actions$: Actions
  ) {}
 
  @Effect() loadPassengers$: Observable<Action> = this.actions$.pipe(
    ofType<passengersActions.loadPassengersDataAction>(types.LOAD_PASSENGERS_DATA),
    mergeMap(() =>
      this.flightService
        .getPassengers()
        .pipe(
          map((passengers) => new passengersActions.loadPassengersSuccessAction(passengers))
        )
    )
  );

  @Effect() updatePassenger$: Observable<Action> = this.actions$.pipe(
    ofType<passengersActions.updatePassenger>(admintypes.UPDATE_PASSENGER),
    map((action: passengersActions.updatePassenger) => action.payload),
    mergeMap((passenger: Passengers) =>
      this.flightService.updatePassengers(passenger).pipe(
        map(
          (newPassenger) =>
            new passengersActions.updatePassengerSuccess(newPassenger)
        ),
        catchError((err) => of(new passengersActions.updatePassengerSuccess(err)))
      )
    )
  );

  @Effect()
  addPassenger$: Observable<Action> = this.actions$.pipe(
    ofType<passengersActions.createPassenger>(admintypes.CREATE_PASSENGER),
    map((action: passengersActions.createPassenger) => action.payload),
    mergeMap((passenger: Passengers) =>
      this.flightService.addPassengers(passenger).pipe(
        map(
          (newPassenger: Passengers) =>
            new passengersActions.addPassengerAction(newPassenger)
        ),
        catchError((err) => of(new passengersActions.addPassengerAction(err)))
      )
    )
  );
}
