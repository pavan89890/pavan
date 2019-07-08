import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FdsComponent } from './fds/fds.component';
import { ChitsComponent } from './chits/chits.component';
import { BanksComponent } from './banks/banks.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'contacts' , component: ContactsComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'job-details' , component: JobDetailsComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'banks' , component: BanksComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'fds' , component: FdsComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'chits' , component: ChitsComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: '' ,component:DashboardComponent,pathMatch: 'full' , canActivate: [AuthGuard]},
  {path: 'login' , component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
