import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flights } from '../models/flights.modals';
import { Store} from '@ngrx/store';
import * as FlightActions from '../store/actions/flights.actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  flights$: Observable<any>;
  flights: Flights[];
  constructor(private store: Store<any>) {
    this.flights$ = this.store.select('applicationState');
  }

  ngOnInit() {
    this.getFlights();
  }

// Function to Load Flight Details
  getFlights() {
    this.store.dispatch(new FlightActions.loadFlightDataAction());
  }

}
