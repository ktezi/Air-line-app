import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState} from '../models/app.state';
import { Observable } from 'rxjs';
import { Flights } from '../models/flights.modals';
import { Store} from '@ngrx/store';
@Component({
  selector: 'app-airline-staff',
  templateUrl: './airline-staff.component.html',
  styleUrls: ['./airline-staff.component.scss']
})
export class AirlineStaffComponent implements OnInit {
  flights$: Observable<any>;
  flights: Flights[];
  constructor( private store: Store<any>, private router: Router) {
    this.flights$ = this.store.select('AppState');
  }

  ngOnInit(): void {
    this.flights$.subscribe(
      (state: AppState) => (this.flights = state.flights)
    );
  }

  // Function on selecting checkin button
    onSelect(flightId){
      console.log('airline', flightId);
      this.router.navigate(['airlinestaff/checkin', flightId]);
    }

  // Function on selecting inflight button
    onSelectInflight(flightId){
      this.router.navigate(['airlinestaff/inflight', flightId]);
    }
}
