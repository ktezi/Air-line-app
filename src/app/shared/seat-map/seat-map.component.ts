import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { PassengerState } from '../../models/app.state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

const ELEMENT_DATA = [
  { 0: 'F', 1: 'x', 2: 'x', 3: 'x', 4: 'x', 5: 'x', 6: 'x', 7: 'x', 8: 'x', 9: 'x', 10: 'x' },
  { 0: 'E', 1: 'x', 2: 'x', 3: 'x', 4: 'x', 5: 'x', 6: 'x', 7: 'x', 8: 'x', 9: 'x', 10: 'x' },
  { 0: 'D', 1: 'x', 2: 'x', 3: 'x', 4: 'x', 5: 'x', 6: 'x', 7: 'x', 8: 'x', 9: 'x', 10: 'x' },
  {},
  { 0: 'C', 1: 'x', 2: 'x', 3: 'x', 4: 'x', 5: 'x', 6: 'x', 7: 'x', 8: 'x', 9: 'x', 10: 'x' },
  { 0: 'B', 1: 'x', 2: 'x', 3: 'x', 4: 'x', 5: 'x', 6: 'x', 7: 'x', 8: 'x', 9: 'x', 10: 'x' },
  { 0: 'A', 1: 'x', 2: 'x', 3: 'x', 4: 'x', 5: 'x', 6: 'x', 7: 'x', 8: 'x', 9: 'x', 10: 'x' },
];
@Component({
  selector: 'app-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss']
})
export class SeatMapComponent implements OnInit,AfterViewChecked {
  [x: string]: any;
  queryParamStatus;
  temp: any;
  checkinTemp = [];
  checkedin: boolean;
  passengerList: any;
  passengers$: Observable<any>;
  displayedColumns: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  dataSource = ELEMENT_DATA;

  constructor(private store: Store<any>, private activatedRoute: ActivatedRoute, private router: Router,private ref: ChangeDetectorRef,) {
    this.passengers$ = this.store.select('PassengerState');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });

    this.passengers$.subscribe((state: PassengerState) => {
      this.temp = state.passengers;
      this.passengerList = state.passengers.filter(
        (user) => user.flightId === this.queryParamStatus
      );
    });
}

  ngAfterViewChecked() {
    this.ref.detectChanges();
  }

  // Function to handle click event
  handleClick(val, val2) {
    const seatNum = val + val2;
    const element = this.passengerList.find(a => a.seatId === seatNum);
    this.checkinTemp = JSON.parse(JSON.stringify(element));
  }

  // Fucntion to assign dynamic className as per passengers data
  getClassname(val, val2) {
    let className = '';
    const seatNum = `${val}${val2}`;
    const element = this.passengerList.find(a => a.seatId === seatNum);
    if (element && element.id) {
      if (element.ischeckedIn) {
        className = className + ' checkedIn';
      }
      else {
        className = className + ' booked';
      }
      if (element.wheelChair) {
        className = className + ' wheelChair';
      }
      if (element.infant) {
        className = className + ' infant';
      }
      return className;
    }
    if (!val2) { return 'midline'; }
    return 'available';
  }
}
