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
import { CustomerBranchesComponent } from './customer-branches/customer-branches.component';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import { BranchViewUsersComponent } from './branch-view-users/branch-view-users.component';
import { BranchAddUserComponent } from './branch-add-user/branch-add-user.component';
import { BranchUploadFileComponent } from './branch-upload-file/branch-upload-file.component';
import { BranchAudioListenComponent } from './branch-audio-listen/branch-audio-listen.component';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { AddCustomerBranchComponent } from './add-customer-branch/add-customer-branch.component';
import { UpdateCustomerBranchComponent } from './update-customer-branch/update-customer-branch.component';
import { BranchUserDetailComponent } from './branch-user-detail/branch-user-detail.component';
import { BranchUserUpdateComponent } from './branch-user-update/branch-user-update.component';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { AgencyMonitoringBoardComponent } from './agency-monitoring-board/agency-monitoring-board.component';
import { MonitoringCustomerBranchesComponent } from './monitoring-customer-branches/monitoring-customer-branches.component';
import { MonitoringBranchPlayerComponent } from './monitoring-branch-player/monitoring-branch-player.component';
import { AddCustomerUserComponent } from './add-customer-user/add-customer-user.component';
import { ViewCustomerUsersComponent } from './view-customer-users/view-customer-users.component';
import { CustomerUserDetailComponent } from './customer-user-detail/customer-user-detail.component';
import { CustomerUserUpdateComponent } from './customer-user-update/customer-user-update.component';

const pageRoute: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponentComponent },
  { path: 'audioup', component: AudioUploadComponent },
  { path: 'audiolisten', component: AudioListenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer', component: CustomerComponent},  
  { path: 'branch', component: BranchComponent },
  { path: 'users', component: UsersComponent },
  { path: 'load', component: BulkLoadComponent },
  { path: 'customer-branches/:id', component: CustomerBranchesComponent},
  { path: 'branch-detail/:id/:customerid', component: BranchDetailComponent},
  { path: 'branch-users/:id/:customerid', component: BranchViewUsersComponent},
  { path: 'branch-add-user/:id/:customerid', component: BranchAddUserComponent},
  { path: 'branch-file-upload/:id/:customerid', component: BranchUploadFileComponent},
  { path: 'branch-audio-listen/:id/:customerid', component: BranchAudioListenComponent},
  { path: 'add-customer', component: AddNewCustomerComponent},
  { path: 'customer-detail/:id', component: CustomerDetailComponent},
  { path: 'update-customer/:id', component: UpdateCustomerComponent},
  { path: 'add-customer-branch/:id', component: AddCustomerBranchComponent},
  { path: 'update-customer-branch/:id/:customerid', component: UpdateCustomerBranchComponent},
  { path: 'branch-user-detail/:id/:customerid', component: BranchUserDetailComponent},
  { path: 'branch-user-update/:id/:customerid', component: BranchUserUpdateComponent},
  { path: 'un-authorized', component: UnAuthorizedComponent},
  { path: 'monitor', component: AgencyMonitoringBoardComponent,children:[ 
    {path:':id',component: MonitoringCustomerBranchesComponent,children:[
      {path:':id',component: MonitoringBranchPlayerComponent}
    ]}   
  ]},
  { path: 'add-customer-user/:id', component: AddCustomerUserComponent},
  { path: 'view-customer-users/:id', component: ViewCustomerUsersComponent},
  { path: 'customer-user-detail/:id/:customerid', component: CustomerUserDetailComponent},
  { path: 'customer-user-update/:id/:customerid', component: CustomerUserUpdateComponent}
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
