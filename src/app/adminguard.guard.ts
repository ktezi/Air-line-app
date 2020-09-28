import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SigninService } from './service/signin.service';

@Injectable()
export class AdminguardGuard implements CanActivate {
  constructor(
    private loginService: SigninService,
    private router: Router
  ) {}
  canActivate() {
    if (this.loginService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
    }
  }
}
