import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { AppfooterComponent } from './appfooter/appfooter.component';
import { AppsettingComponent } from './appsetting/appsetting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';

// firestore
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FormsModule }   from '@angular/forms';

// angular 6 datatable
import {DataTableModule} from "angular-6-datatable";
import { BanksComponent } from './banks/banks.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ChitsComponent } from './chits/chits.component';
import { FdsComponent } from './fds/fds.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {ReactiveFormsModule} from '@angular/forms'



@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppmenuComponent,
    AppfooterComponent,
    AppsettingComponent,
    DashboardComponent,
    ContactsComponent,
    BanksComponent,
    JobDetailsComponent,
    ChitsComponent,
    FdsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
