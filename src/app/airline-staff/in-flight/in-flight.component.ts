import { Component, OnInit, ViewChild, AfterViewChecked, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PassengerState, AppState } from '../../models/app.state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as PassengerAction from '../../store/actions/passengers.actions';
import { ActivatedRoute, Params } from '@angular/router';

//  Seat Map Layout
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
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.scss']
})
export class InFlightComponent implements OnInit, AfterViewChecked {
  // Table variables
  displayedColumns: string[] = ['name', 'ancillaryServices', 'button'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  displayedColumns1: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  dataSource1 = ELEMENT_DATA;
  dataSource: any;


  temp: any;
  flights$: Observable<any>;
  services: any;
  filteredFlights: any;
  passengers$: Observable<any>;
  passengers: any;
  queryParamStatus: any;
  newPassengers: any;
  tempfinal: any;
  users: any;
  veg: any;
  nonVeg: any;
  showPassengerData: any;
  updateId: any;

  @ViewChild('changeMealPreference', { static: true }) changeMealPreference: TemplateRef<any>;
  @ViewChild('addAncillary', { static: true }) addAncillary: TemplateRef<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private ref: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog) {
    this.passengers$ = this.store.select('PassengerState');
    this.flights$ = this.store.select('AppState');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });
    this.passengers$.subscribe((state: PassengerState) => {
      this.users = JSON.parse(JSON.stringify(state.passengers));
      this.passengers = this.users.filter(
        (user) => user.flightId === this.queryParamStatus
      );
    });
    this.flights$.subscribe((state: AppState) => {
      this.services = state.flights;
      console.log('State', this.services);
      this.filteredFlights = state.flights.filter(
        (services) => services.flightId === this.queryParamStatus
      );
    });
    this.dataSource = new MatTableDataSource(this.passengers);
  }

  // Function to detect Changes
  ngAfterViewChecked() {
    this.dataSource = new MatTableDataSource(this.passengers);
    this.ref.detectChanges();
  }

  // Function to open Dialog
  openDialog(templateRef: TemplateRef<any>, val) {
    this.updateId = val.id;
    const filteredPassenger = this.passengers.filter(a => a.id === val.id);
    this.showPassengerData = filteredPassenger;
    const dialogRef = this.dialog.open(templateRef, {
      data: {
      },
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(() => { });
  }

  // Function to open Item Dialog
  openItemDialog(templateRef: TemplateRef<any>, val) {
    this.updateId = val.id;
    const filteredPassenger = this.passengers.filter(a => a.id === val.id);
    const pp = filteredPassenger[0].ancillaryServices;
    this.showPassengerData = filteredPassenger;
    const dialogRef = this.dialog.open(templateRef, {
      data: {
      },
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(() => { });
  }

  // Function to set meal preference as veg
  setVegPreference(val) {
    this.veg = true;
    this.tempfinal = this.passengers.filter(user => user.id === this.updateId);
    this.temp = JSON.parse(JSON.stringify(this.tempfinal));
    this.temp.forEach(a => {
      if (a.id === this.updateId) {
        Object.keys(a).map(aa => {
          if (aa === 'ancillaryServices') {
            a[aa].meal = 'Veg-Meal';
          }
        });
      }
    });
    this.store.dispatch(new PassengerAction.updatePassenger(this.temp));
    this.dialog.closeAll();
  }

  // Function to set meal preference as Non-veg
  setNonvegPreference(val) {
    this.nonVeg = true;
    this.tempfinal = this.passengers.filter(user => user.id === this.updateId);
    this.temp = JSON.parse(JSON.stringify(this.tempfinal));
    this.temp.forEach(a => {
      if (a.id === this.updateId) {
        Object.keys(a).map(aa => {
          if (aa === 'ancillaryServices') {
            a[aa].meal = 'Non-Veg Meal';
          }
        });
      }
    });
    this.store.dispatch(new PassengerAction.updatePassenger(this.temp));
    this.dialog.closeAll();
  }

  // Function to get className dynamically as per the passenger data
  getClassname(val, val2) {
    let className = '';
    const seatNum = `${val}${val2}`;
    const element = this.passengers.find(a => a.seatId === seatNum);
    if (element && element.id) {
      if (element.specialMeal) {
        className = className + ' specialmeal';
      }
      else {
        className = className + 'available';
      }
      if (!val2) { return 'midline'; }
      return className;
    }
    return 'available';
  }

  // Function to add Ancillary Services for a passenger
  addAncillaryServices(value1) {
    console.log('ooooooo',value1)
    const ancilaryData = this.showPassengerData[0].ancillaryServices;
    ancilaryData[value1] = value1;
    this.showPassengerData[0].ancillaryServices = ancilaryData;
    this.store.dispatch(
      new PassengerAction.updatePassenger(this.showPassengerData)
    );
    this.services = null;
    this.dialog.closeAll();
  }

  // Function to add In-Flight shop request for a passenger
  addItemRequest(value) {
    const ancilaryData = this.showPassengerData[0].item;
    ancilaryData.push(value);
    this.showPassengerData[0].item = ancilaryData;
    this.store.dispatch(
      new PassengerAction.updatePassenger(this.showPassengerData)
    );
    this.dialog.closeAll();
  }
}
