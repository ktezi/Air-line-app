import { Component, OnInit, ViewChild  } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import data from '../../app/data.json';
import './header.component.scss';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  socialLogin$: Observable<any>;
  flights: any;
  user: any = {};
  loggedIn: any = false;
  isAdmin: any = 'false';
  constructor(private authService: SocialAuthService, private router: Router, private store: Store<any>) {
    this.socialLogin$ = this.store.select('SocialLoginState');
  }
  @ViewChild(HeaderComponent) loginDetails;

  // Social Sign-In function
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
    });
  }

  // Social Sign-In function
  signOut(): void {
    this.authService.signOut(true).then(() => {
      this.router.navigateByUrl('/');
    })
      .catch(e => {
        this.router.navigateByUrl('/');
        console.log('err', e);
      });
    localStorage.removeItem('loggedin');
    localStorage.removeItem('email');
    localStorage.removeItem('admin');
    this.loggedIn =  false;
    this.isAdmin = 'false' ;
  }

  ngOnInit(): void {
    const temp = localStorage.getItem('loggedin');
    if (temp && temp.length){
      this.loggedIn = true;
      this.isAdmin = localStorage.getItem('admin');
      return;
    }
    this.initialLogin();
  }

  initialLogin(){
    if (!this.loggedIn) {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = user != null;
        if (this.user){
          localStorage.setItem('email', this.user.email);
          localStorage.setItem('loggedin', this.loggedIn);
        }
        this.checkAdmin();
      });
    }
  }
  // Checking Admin function
  checkAdmin() {
    if (this.user && (data.admin.some((val) => this.user.email === val.email && val.isAdmin === true))) {
      console.log('inside if');
      this.isAdmin = 'true' ;
      localStorage.setItem('admin', this.isAdmin);
      return true;
    }else{
      console.log('inside else');
      this.isAdmin = 'false' ;
      localStorage.setItem('admin', this.isAdmin);
      return true;
    }
  }
}
