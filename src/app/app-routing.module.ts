import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePassengerComponent } from './admin/manage-passenger/manage-passenger.component';
import { AncillaryServicesComponent } from './admin/ancillary-services/ancillary-services.component';
import { AdminComponent } from './admin/admin.component';
import { AirlineStaffComponent } from './airline-staff/airline-staff.component';
import { CheckInComponent } from './airline-staff/check-in/check-in.component';
import {InFlightComponent} from './airline-staff/in-flight/in-flight.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminguardGuard } from './adminguard.guard';
import { AuthGuardGuard } from './auth-guard.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'admin', component: AdminComponent, pathMatch: 'full' , canActivate: [AdminguardGuard]},
  {path: 'airlinestaff', component: AirlineStaffComponent, pathMatch: 'full', canActivate: [AuthGuardGuard]},
  {path: 'airlinestaff/checkin/:id', component: CheckInComponent, canActivate: [AuthGuardGuard] },
  {path: 'airlinestaff/inflight/:id', component: InFlightComponent, canActivate: [AuthGuardGuard] },
  {path: 'managepassengers/:id', component: ManagePassengerComponent, canActivate: [AdminguardGuard] },
  {path: 'managerancillary/:id', component: AncillaryServicesComponent , canActivate: [AdminguardGuard] },
  {path: '**', component: PageNotFoundComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AdminComponent, ManagePassengerComponent, AncillaryServicesComponent , HomeComponent];

