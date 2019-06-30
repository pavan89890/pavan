import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FdsComponent } from './fds/fds.component';
import { ChitsComponent } from './chits/chits.component';
import { BanksComponent } from './banks/banks.component';

const routes: Routes = [
  {path:"",component:DashboardComponent},
  {path: 'contacts' , component: ContactsComponent},
  {path: 'job-details' , component: JobDetailsComponent},
  {path: 'banks' , component: BanksComponent},
  {path: 'fds' , component: FdsComponent},
  {path: 'chits' , component: ChitsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
