import { Component, OnInit } from '@angular/core';
import { AppState ,PassengerState} from '../models/app.state';
import { Observable } from 'rxjs';
import { Flights } from '../models/flights.modals';
import { Store} from '@ngrx/store';
import * as FlightActions from '../store/actions/flights.actions';
import * as PassengersActions from '../store/actions/passengers.actions';
@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  passengers$: Observable<any>;
  flights$: Observable<any>;
  flights: Flights[];
  passengers: any;

  constructor(private store: Store<any>) {
    this.flights$ = this.store.select('AppState');
    this.passengers$ = this.store.select('PassengerState');
  }

  ngOnInit() {
    this.getFlights();
    this.flights$.subscribe(
      (state: AppState) => (this.flights = state.flights)
    );

    this.getPassengers();
    this.passengers$.subscribe(
      (state: PassengerState) => (this.passengers = state.passengers)
    );
  }

  // Funciton to get Flight Details
  getFlights() {
    this.store.dispatch(new FlightActions.loadFlightDataAction());
    console.log('Flight Data' + this.flights);
  }

  // Funciton to get Passenger Details
  getPassengers(){
    this.store.dispatch(new PassengersActions.loadPassengersDataAction());
  }

}
