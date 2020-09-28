import { Component, OnInit, ViewChild, ChangeDetectorRef, TemplateRef, AfterViewChecked } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PassengerState } from '../../models/app.state';
import * as PassengerAction from '../../store/actions/passengers.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { FnParam } from '@angular/compiler/src/output/output_ast';
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
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit, AfterViewChecked {
  passengers$: Observable<any>;
  [x: string]: any;
  queryParamStatus;
  temp: any;
  checkinTemp = [];
  checkedin: boolean;
  passengerList: any;
  temp: any;
  passengers: any;
  queryParamStatus: any;
  newPassengers: any;
  seatMapTempData: any;
  filterStatus = false;

  // Variable's for table
  displayedColumns1: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  dataSource1 = ELEMENT_DATA;
  displayedColumns: string[] = ['name', 'ancillaryServices', 'seatId', 'CheckedIn', 'button'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;
  versions = ['Checked-In', 'Not Checked-In', 'Wheel Chair', 'Infant'];

  // dataSource: MatTableDataSource<dataInterface>;
  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule;
  @ViewChild(MatSort) sort: MatSort;
  // tslint:disable-next-line: variable-name
  @ViewChild('dialog_template', { static: true }) dialog_template: TemplateRef<
    any
  >;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
    private ref: ChangeDetectorRef,
    public dialog: MatDialog) {
    this.passengers$ = this.store.select('PassengerState');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });
    this.passengers$.subscribe((state: PassengerState) => {
      this.temp = state.passengers;
      this.passengers = state.passengers.filter(
        (user) => user.flightId === this.queryParamStatus
      );
    });
    this.dataSource = new MatTableDataSource(this.passengers);
  }

  // Function to open Dialog
  openDialog(val) {
    this.seatMapTempData = val.seatId;
    const dialogRef = this.dialog.open(this.dialog_template, {
      width: '600px',
    });
  }

  ngAfterViewChecked() {
    if (this.filterStatus === true){
      this.dataSource = new MatTableDataSource(this.newPassengers);
    }else{
      this.dataSource = new MatTableDataSource(this.passengers);
    }
    this.detectChanges();
  }

  // Function to detect changes
  detectChanges() {
    this.ref.detectChanges();
  }

  // Function to filter passenger as per IscheckedIn,Wheelchair,Infant value
  applyFilter(filterValue: string) {
    switch (filterValue) {
      case 'Checked-In': {
        this.newPassengers = this.passengers.filter(a => a.ischeckedIn === true);
        break;
      }
      case 'Not Checked-In': {
        this.newPassengers = this.passengers.filter(a => a.ischeckedIn === false);
        break;
      }
      case 'Wheel Chair': {
        this.newPassengers = this.passengers.filter(a => a.wheelChair === true);
        break;
      }
      case 'Infant': {
        this.newPassengers = this.passengers.filter(a => a.infant === true);
        break;
      }
      default: {
        this.newPassengers = this.passengers;
      }
    }
    this.filterStatus = true;
    this.dataSource = new MatTableDataSource(this.newPassengers);
  }

  // Fucntion to Toggle the status for checkedIn
  CheckedIn(val){
    this.filterStatus = false;
    const passengerId = val.id;
    const element = this.passengers.find(a => a.id === passengerId);
    if (element) {
      const nElement = JSON.parse(JSON.stringify(element));
      nElement.ischeckedIn = !nElement.ischeckedIn;
      this.store.dispatch(new PassengerAction.updatePassenger([nElement]));
    }
  }

  // Function to handle click event
  handleClick(val, val2) {
    const seatNum = val + val2;
    const element = this.passengers.find(a => a.seatId === seatNum);
    if (!element) {
      const ntemp = JSON.parse(JSON.stringify(this.temp));
      const data = ntemp.find(a => a.seatId === this.seatMapTempData);
      data.seatId = seatNum;
      this.store.dispatch(new PassengerAction.updatePassenger([data]));
    }
    this.dialog.closeAll();
  }

  // Fucntion to assign dynamic className as per passengers data
  getClassname(val, val2) {
    let className = '';
    const seatNum = `${val}${val2}`;
    const element = this.passengers.find(a => a.seatId === seatNum);
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
