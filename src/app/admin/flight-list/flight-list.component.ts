import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Flights } from 'src/app/models/flights.modals';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  [x: string]: any;
  li: any;
  flights$: Observable<any>;
  flights: Flights[];
  response: any;
  displayedColumns: string[] = ['FlightId', 'from', 'to', 'departureTime', 'arrivalTime', 'duration', 'Action'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;
  // dataSource: MatTableDataSource<dataInterface>;
  @ViewChild(MatPaginatorModule) paginator: MatPaginatorModule;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(private store: Store<any>,
              private http: HttpClient,
              private router: Router) {
    this.flights$ = this.store.select('AppState');
  }

  ngOnInit(): void {
    this.response = this.getData();
    this.dataSource = new MatTableDataSource(this.flights);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getData() {
    this.http.get('http://localhost:5000/flights').subscribe(res => {
      if (res) {
        // document.getElementById('loading').style.display = 'none';
      }
      this.li = res;
      this.flights = this.li;
      this.dataSource = new MatTableDataSource(this.flights);
      return true;
    },
      (error) => {
        console.log(error);
        return false;
      });
  }

  onPassengerSelect(flightId) {
    this.router.navigate(['managepassengers', flightId]);
  }
  onAncillarySelect(flightId) {
    this.router.navigate(['managerancillary', flightId]);
  }
}
