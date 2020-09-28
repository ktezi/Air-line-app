import { Injectable } from '@angular/core';
import { AirlineStaffComponent } from '../airline-staff/airline-staff.component';
import data from '../../app/data.json';
@Injectable({
  providedIn: 'root'
})
export class SigninService {
  // To login as a AirlineStaff change adminEmail to ''.
  // To login as a Admin provide your email Id as adminEmail then only It will allow you as admin.

  constructor() { }
  loggedIn(){
    if (data.admin.some((val) => val.email === localStorage.getItem('email') && val.isAdmin === true)) {
      return true;
    } else {
      return false;
    }
  }
  loggedInStaff() {
    if (localStorage.getItem('email') !== null) {
      return false;
    } else {
      return true;
    }
  }
}
