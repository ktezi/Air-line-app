import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { ManagePassengerComponent } from './admin/manage-passenger/manage-passenger.component';
import { AncillaryServicesComponent } from './admin/ancillary-services/ancillary-services.component';
import { FlightListComponent } from './admin/flight-list/flight-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AirlineStaffComponent } from './airline-staff/airline-staff.component';
import { HomeComponent } from './home/home.component';
import { CheckInComponent } from './airline-staff/check-in/check-in.component';
import { InFlightComponent } from './airline-staff/in-flight/in-flight.component';
import { SeatMapComponent } from './shared/seat-map/seat-map.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FlightsEffects } from './store/effects/flights.effects';
import { PassengersEffects } from './store/effects/passengers.effects';
import { environment } from 'src/environments/environment';
import { FlightComponent } from './flight/flight.component';
import { reducers } from './store/index';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { AdminguardGuard } from './adminguard.guard';
import { MatNativeDateModule } from '@angular/material/core';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminComponent,
    ManagePassengerComponent,
    AncillaryServicesComponent,
    FlightListComponent,
    routingComponents,
    AirlineStaffComponent,
    HomeComponent,
    CheckInComponent,
    InFlightComponent,
    SeatMapComponent,
    FlightComponent,
    PageNotFoundComponent
  ],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    SocialLoginModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([FlightsEffects, PassengersEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('400865530457-pelm0k6er8vqgldvr7vetekf2rqnii0d.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    AuthGuardGuard,
    AdminguardGuard,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
