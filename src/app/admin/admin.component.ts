import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PassengerState } from '../models/app.state';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isAdmin = false;
  passengers$: Observable<any>;
  passengers: any;
  constructor() { }

  ngOnInit(): void {
  }
}

