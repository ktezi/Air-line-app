import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SigninService } from './service/signin.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(
    private loginService: SigninService,
    private router: Router
  ) {}

  canActivate() {
    if (localStorage.getItem('email') !== null) {
      return true;
    } else {
      return false;
    }
  }
}
