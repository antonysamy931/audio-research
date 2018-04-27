import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { AudioListenComponent } from './audio-listen/audio-listen.component';
import { AppComponent } from './app.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component'
import { CustomerComponent } from './customer/customer.component';
import { BranchComponent } from './branch/branch.component';
import { UsersComponent } from './users/users.component';
import { BulkLoadComponent } from './bulk-load/bulk-load.component';

import { LoginComponent } from './login/login.component';

const pageRoute: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponentComponent },
  { path: 'audioup', component: AudioUploadComponent },
  { path: 'audiolisten', component: AudioListenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'branch', component: BranchComponent },
  { path: 'users', component: UsersComponent },
  { path: 'load', component: BulkLoadComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(pageRoute)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
