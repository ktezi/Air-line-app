import { Component, OnInit, ViewChild, TemplateRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { PassengerState, AppState } from '../../models/app.state';
import { Flights } from '../../models/flights.modals';
import * as FlightActions from '../../store/actions/flights.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { _MatTabGroupBase } from '@angular/material/tabs';

@Component({
  selector: 'app-ancillary-services',
  templateUrl: './ancillary-services.component.html',
  styleUrls: ['./ancillary-services.component.scss']
})

export class AncillaryServicesComponent implements OnInit, AfterViewChecked {
  displayedColumnsAncillary: string[] = ['Ancillary', 'Edit', 'Delete'];
  displayedColumnsMeals: string[] = ['Special Meals', 'Edit', 'Delete'];
  displayedColumnsShopping: string[] = ['Shopping Items', 'Edit', 'Delete'];

  flights$: Observable<AppState>;
  columnsToDisplayAncillary: string[] = this.displayedColumnsAncillary.slice();
  columnsToDisplayMeals: string[] = this.displayedColumnsMeals.slice();
  columnsToDisplayShopping: string[] = this.displayedColumnsShopping.slice();
  dataSource: any;
  aservices: [] = [];
  queryParamStatus: any;
  flightpassenger: any;
  deleteAncillaryService: any;
  ancilary: string;
  services: any;
  ancilllaryAdded: any;

  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild('addAncillary', { static: true }) addAncillary: TemplateRef<any>;
  @ViewChild('updateAncillary', { static: true }) updatencillary: TemplateRef<
    any
  >;
  @ViewChild('addSpecialMeals', { static: true }) addSpecialMeals: TemplateRef<
    any
  >;
  @ViewChild('addShoppingItems', { static: true })
  addShoppingItems: TemplateRef<any>;
  @ViewChild('updateMeals', { static: true }) updateMeals: TemplateRef<any>;
  @ViewChild('updateShopping', { static: true }) updateShopping: TemplateRef<
    any
  >;

  servicesFlights: any;
  currentMeals: string;
  currentAncillary: string;
  oldAncillary: string;
  oldMeal: string;
  flightservices: any;
  patchUpdate: Flights;
  updateAncillary: Flights;
  arrayAnc: string[];
  mealServices: any;
  mealSource: any;
  shoppingSource: any;
  updateMeal: Flights;
  deleteSpecialMeals: Flights;
  currentSpecial: string;
  arrayMeals: string[];
  deleteSpecialMeal: Flights;
  currentItem: any;
  oldItem: any;
  shoppingServices: any;
  arrayItems: any[];
  updateItem: Flights;
  deleteShoppingItem: Flights;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private router: Router,
    private store: Store<any>,
    public dialog: MatDialog
  ) {
    this.flights$ = this.store.select('AppState');
  }

  ngAfterViewChecked() {
    this.dataSource = new MatTableDataSource(this.flightpassenger[0].ancillaryServices);
    this.mealSource = new MatTableDataSource(this.flightpassenger[0].specialMeals);
    this.shoppingSource = new MatTableDataSource(this.flightpassenger[0].shoppingItems);
    this.ref.detectChanges();
  }

  openDialog() {
    this.dialog.open(this.addAncillary, {
      width: '300px',
    });
  }

  openMealDialog() {
    this.dialog.open(this.addSpecialMeals, {
      width: '300px',
    });
  }

  openShoppingDialog() {
    this.dialog.open(this.addShoppingItems, {
      width: '300px',
    });
  }

  openUpdateShoppingDialog(element) {
    this.currentItem = this.flightpassenger[0].shoppingItems.filter(
      (services) => services === element
    );
    this.oldItem = this.currentItem;
    this.dialog.open(this.updateShopping, {
      width: '300px',
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.queryParamStatus = params.id;
    });
    this.flights$.subscribe((state: AppState) => {
      this.services = state.flights;
      console.log('State', this.services);
      this.flightpassenger = state.flights.filter(
        (services) => services.flightId === this.queryParamStatus
      );
    });
    console.log('hey', this.flightpassenger);
    console.log('FLigt services===>0))))', this.flightpassenger);
    this.flightservices = this.flightpassenger[0].ancillaryServices;
    this.mealServices = this.flightpassenger[0].specialMeals;
    this.shoppingServices = this.flightpassenger[0].shoppingItems;
    console.log('filtered services==>', this.flightservices);
    console.log('ASO', this.flightpassenger);
    this.dataSource = new MatTableDataSource(this.flightservices);
    this.mealSource = new MatTableDataSource(this.mealServices);
    this.shoppingSource = new MatTableDataSource(this.flightpassenger[0].shoppingItems);

  }

  addAncillaryServices(value) {
    const servicesStringify = JSON.parse(
      JSON.stringify(this.flightpassenger[0])
    );
    const aservices = servicesStringify.ancillaryServices;
    const isAleadyPresent = aservices.find(a => a === value);
    if (isAleadyPresent) {
      this.dialog.closeAll();
      return;
    }
    aservices.push(value);
    this.store.dispatch(
      new FlightActions.UpdateAncillary(servicesStringify)
    );
    this.dialog.closeAll();
  }

  addSpeciaMeals(value) {
    const newFlight = JSON.parse(JSON.stringify(this.flightpassenger[0]));
    const ameals = newFlight.specialMeals;
    const isAleadyPresent = ameals.find(a => a === value);
    if (isAleadyPresent) {
      this.dialog.closeAll();
      return;
    }
    ameals.push(value);
    this.store.dispatch(
      new FlightActions.UpdateAncillary(newFlight)
    );
    this.dialog.closeAll();
  }

  addShopItem(value) {
    const servicesStringify = JSON.parse(
      JSON.stringify(this.flightpassenger[0])
    );
    const aservices = servicesStringify.shoppingItems;
    const isAleadyPresent = aservices.find(a => a === value);
    if (isAleadyPresent) {
      this.dialog.closeAll();
      return;
    }
    aservices.push(value);
    this.store.dispatch(
      new FlightActions.UpdateAncillary(servicesStringify)
    );
    this.dialog.closeAll();
  }

  updateShoppingItems() {
    const itemStringify = JSON.parse(JSON.stringify(this.flightpassenger[0]));
    const aitems = itemStringify.shoppingItems;
    const oldItems = this.flightpassenger[0].shoppingItems.filter(
      (service) => service === service
    );
    const index = this.flightpassenger[0].shoppingItems.indexOf(
      this.oldItem[0]
    );
    this.arrayItems = [...this.flightpassenger[0].shoppingItems];

    if (index !== -1) {
      this.arrayItems[index] = this.currentItem;
    }
    this.updateItem = new Flights();
    this.updateItem.id = this.flightpassenger[0].id;
    this.updateItem.shoppingItems = this.arrayItems;
    console.log('check===>', aitems);
    this.store.dispatch(new FlightActions.UpdateShoppingItems(this.updateItem));
    console.log('updated one===>', this.updateItem);
    this.shoppingSource = new MatTableDataSource(this.shoppingServices);
    this.dialog.closeAll();
  }

  openUpdateMealialog(element: any) {
    this.currentMeals = element;
    this.oldMeal = this.currentMeals;
    this.dialog.open(this.updateMeals, {
      width: '300px',
    });
  }

  updateSpecialMeals() {
    console.log(this.oldMeal, this.currentMeals, 'sdf');
    if (this.oldMeal === this.currentMeals) {
      this.dialog.closeAll();
      return;
    }
    let currentFlightService = JSON.parse(
      JSON.stringify(this.flightpassenger[0].specialMeals)
    );
    const arr = currentFlightService.slice();
    const isAvailable = arr.find(a => a === this.oldMeal);
    if (isAvailable) {
      const ind = arr.indexOf(isAvailable);
      arr[ind] = this.currentMeals;
    }
    else { return; }
    currentFlightService = arr;
    console.log(arr, currentFlightService);
    const newFlight = { ...this.flightpassenger[0], specialMeals: arr };
    this.store.dispatch(
      new FlightActions.UpdateAncillary(newFlight)
    );
    this.dialog.closeAll();
  }



  openUpdateDialog(element: any) {
    this.currentAncillary = element;
    this.oldAncillary = this.currentAncillary;
    this.dialog.open(this.updatencillary, {
      width: '300px',
    });
  }


  updateAncillaryServices() {
    if (this.oldAncillary === this.currentAncillary) {
      this.dialog.closeAll();
      return;
    }
    let currentFlightService = JSON.parse(
      JSON.stringify(this.flightpassenger[0].ancillaryServices)
    );
    const arr = currentFlightService.slice();
    const isAvailable = arr.find(a => a === this.oldAncillary);
    if (isAvailable) {
      const ind = arr.indexOf(isAvailable);
      arr[ind] = this.currentAncillary;
    }
    else { return; }
    currentFlightService = arr;
    console.log(arr, currentFlightService);
    const newFlight = { ...this.flightpassenger[0], ancillaryServices: arr };
    this.store.dispatch(
      new FlightActions.UpdateAncillary(newFlight)
    );
    this.dialog.closeAll();
  }

  deleteAncillary(element) {
    let currentFlightService = JSON.parse(
      JSON.stringify(this.flightpassenger[0].ancillaryServices)
    );
    let arr = currentFlightService.slice();
    const isAvailable = arr.find(a => a === element);
    if (isAvailable) {
      const ind = arr.filter(a => a !== element);
      arr = ind;
    }
    else { return; }
    currentFlightService = arr;
    const newFlight = { ...this.flightpassenger[0], ancillaryServices: arr };
    this.store.dispatch(
      new FlightActions.UpdateAncillary(newFlight)
    );
    this.dialog.closeAll();
  }

  deleteMeals(element) {
    let currentFlightService = JSON.parse(
      JSON.stringify(this.flightpassenger[0].specialMeals)
    );
    let arr = currentFlightService.slice();
    const isAvailable = arr.find(a => a === element);
    if (isAvailable) {
      const ind = arr.filter(a => a !== element);
      arr = ind;
    }
    else { return; }
    currentFlightService = arr;
    console.log(arr, currentFlightService);
    const newFlight = { ...this.flightpassenger[0], specialMeals: arr };
    this.store.dispatch(
      new FlightActions.UpdateAncillary(newFlight)
    );
  }

  deleteItem(element) {
    let currentFlightService = JSON.parse(
      JSON.stringify(this.flightpassenger[0].shoppingItems)
    );
    let arr = currentFlightService.slice();
    const isAvailable = arr.find(a => a === element);
    if (isAvailable) {
      const ind = arr.filter(a => a !== element);
      arr = ind;
    }
    else { return; }
    currentFlightService = arr;
    console.log(arr, currentFlightService);
    const newFlight = { ...this.flightpassenger[0], shoppingItems: arr };
    this.store.dispatch(
      new FlightActions.UpdateAncillary(newFlight)
    );
    this.dialog.closeAll();
  }
}
