import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { PassengerState } from '../../models/app.state';
import * as PassengerAction from '../../store/actions/passengers.actions';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Passengers } from 'src/app/models/passengers.modals';
import { MatSelect } from '@angular/material/select';


// tslint:disable-next-line: class-name
export interface dataInterface {
  id: number;
  flightId: string;
  name: string;
  dob: number;
  address: string;
  passport: string;
  seatId: string;
  specialMeal: number;
  infant: boolean;
  wheelChair: boolean;
  ancillaryServices: object;
}

@Component({
  selector: 'app-manage-passenger',
  templateUrl: './manage-passenger.component.html',
  styleUrls: ['./manage-passenger.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagePassengerComponent implements OnInit, AfterViewChecked {
  private test$ = new Subject<Passengers[]>();
  passengers$: Observable<PassengerState>;
  pass: FormGroup;
  updatePass : FormGroup;
  Object = Object;
  queryParamStatus: any;
  users: Passengers[];
  flightpassenger: any;
  filterStatus = false;
  display = false;
  versions = ['Passport', 'Address', 'dateOfBirth'];
  displayedColumns: string[] = [
    'name',
    'ancillaryServices',
    'seatId',
    'button',
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;

  // dataSource: MatTableDataSource<dataInterface>;
  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  // tslint:disable-next-line: variable-name
  @ViewChild('dialog_template', { static: true }) dialog_template: TemplateRef<
    any
  >;
  // private dialog_template: TemplateRef<any>;
  name: string ;
  dob : any;
  openStatus = false;
  data: [] = [];
  tempfinal: any;
  updateId: any;
  temp: any;
  passport: any;
  address: any;
  filterPass: any;
  contact: any;
  dateOfBirth: null;
  wheelchairRequired: false;
  infant: false;
  startDate = new Date();
  datepicker1: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private store: Store<any>,
    private router: Router,
    private formBuild: FormBuilder,
    public dialog: MatDialog // public dialogRef: MatDialogRef<ManagePassengerComponent>,
  ) {
    this.passengers$ = this.store.select('PassengerState');
  }

  ngAfterViewChecked() {
    if (this.filterStatus) {
      this.dataSource = new MatTableDataSource(this.data);
    } else {
      this.dataSource = new MatTableDataSource(this.flightpassenger);
    }
    this.detectChanges();
  }

  // Opening the dialog
  openDialog() {
    const dialogRef = this.dialog.open(this.dialog_template, {
      width: '300px',
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });
    this.pass = this.formBuild.group({
      name: ['', Validators.required],
      passport: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      wheelchairRequired: ['', Validators.required],
      infant: ['', Validators.required],
    });
    this.updatePass = this.formBuild.group({
      name: ['', Validators.required],
      passport: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required]    });
    this.passengers$.subscribe((state: PassengerState) => {
      this.users = state.passengers;
      this.flightpassenger = state.passengers.filter(
        (user) => user.flightId === this.queryParamStatus
      );
    });
    this.flightpassenger = this.users.filter(
      (user) => user.flightId === this.queryParamStatus
    );
    this.dataSource = new MatTableDataSource(this.flightpassenger);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Function to filter passenger by dob , passport, address
  applyFilter(filterValue: string) {
    switch (filterValue) {
      case 'dateOfBirth': {
        this.filtervalue('dob');
        break;
      }
      case 'Passport': {
        this.filtervalue('passport');
        break;
      }
      case 'Address': {
        this.filtervalue('address');
        break;
      }
      default: {
        this.resetFilters();
        break;
      }
    }
  }

  // filter function core
  filtervalue(val: string) {
    console.log('FIltervalue', this.flightpassenger);
    // tslint:disable-next-line: only-arrow-functions
    this.data = this.flightpassenger.filter(function(x) {
      return x[val] === '' || undefined;
    });
    this.dataSource = new MatTableDataSource(this.data);
    this.filterStatus = true;
    return true;
  }

  // Reset table filters
  resetFilters() {
    this.dataSource = new MatTableDataSource(this.flightpassenger);
    this.filterStatus = false;
    return true;
  }

  // Adding passenger for the selected flight
  addPassenger = () => {
    const num = Passengers.length + 5;
    if (this.pass.get('wheelchairRequired').value === undefined) {
      this.pass.patchValue({
        wheelchairRequired: false,
      });
    }
    if (this.pass.get('infant').value === undefined) {
      this.pass.patchValue({
        infant: false,
      });
    }
    let trimedDate;
    let convertedDate;
    const str = String(this.pass.get('dateOfBirth').value);
    console.log('str', typeof str, str);
    if (str === 'null' || str === '') {
      convertedDate = '';
    } else {
      trimedDate = str.split(' ');
      convertedDate = trimedDate[1] + ' ' + trimedDate[2] + ' ' + trimedDate[3];
    }
    if (this.pass.get('address').value ===  undefined){
      this.pass.controls.address.setValue('');
    }
    const newPassenger: Passengers = {
      id: null,
      name: this.pass.get('name').value,
      passport: this.pass.get('passport').value || '',
      address: this.pass.get('address').value,
      seatId: '',
      infant: this.pass.get('infant').value,
      wheelChair: this.pass.get('wheelchairRequired').value,
      item: [],
      flightId: this.queryParamStatus,
      dob: convertedDate,
      ancillaryServices: {
        meal: '',
        baggage: '',
        gadgets: '',
      },
      specialMeal: '',
      ischeckedIn: false,
    };
    this.store.dispatch(new PassengerAction.createPassenger(newPassenger));
    this.dataSource = new MatTableDataSource(this.flightpassenger);
    this.pass.reset();
    this.dialog.closeAll();
  }

  // Detecting changes made to the view
  detectChanges() {
    console.log('Checking change detection sir!');
    this.ref.detectChanges();
  }

  openUpdateDialog(templateRef: TemplateRef<any>, val) {
    this.filterPass = this.users.filter((user) => user.id === val.id);
    this.updateId = val.id;
    this.updatePass.controls.name.patchValue(this.filterPass[0].name);
    this.updatePass.controls.passport.patchValue(this.filterPass[0].passport);
    this.updatePass.controls.address.patchValue(this.filterPass[0].address);
    this.updatePass.controls.dob.patchValue(new Date(this.filterPass[0].dob));
    this.dialog.open(templateRef, {
      data: {
        id: val.id,
        actualdata: this.users,
        name: this.filterPass[0].name,
        passport: this.filterPass[0].passport,
        address: this.filterPass[0].address,
        dob : this.dob
      },
      width: '300px',
    });
  }

  updatePassenger(val) {
    const str = String(this.updatePass.get('dob').value);
    let convertedDate;
    if (str === 'null' || str === '') {
      convertedDate = '';
    } else {
      const trimedDate = str.split(' ');
      convertedDate = trimedDate[1] + ' ' + trimedDate[2] + ' ' + trimedDate[3];
    }
    console.log('str', typeof convertedDate, convertedDate);
    this.tempfinal = this.flightpassenger.filter(
      (user) => user.id === this.updateId
    );
    this.temp = JSON.parse(JSON.stringify(this.tempfinal));
    this.temp.forEach((a) => {
      if (a.id === this.updateId) {
        Object.keys(a).map((aa) => {
          a.name = this.updatePass.get('name').value;
          a.passport = this.updatePass.get('passport').value || '';
          a.address = this.updatePass.get('address').value;
          a.dob = convertedDate;
        });
      }
    });
    this.store.dispatch(new PassengerAction.updatePassenger(this.temp));
    this.dialog.closeAll();
    this.resetFilters();
    this.dataSource = new MatTableDataSource(this.flightpassenger);
  }
}
