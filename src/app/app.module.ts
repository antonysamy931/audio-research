import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleGlobal } from 'ng2-simple-global';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AudioListenComponent } from './audio-listen/audio-listen.component';
import { AppRoutingModule } from './app-routing.module';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';

import { AudioServiceService } from './audio-service.service';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth/auth.service';
import { AuthenticationService } from './service/authentication/authentication.service';
import { CustomerService } from './service/customer/customer.service';
import { BranchService } from './service/branch/branch.service';
import { BranchUserService } from './service/branch/user/branch-user.service';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material/app-material.module';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { BranchComponent } from './branch/branch.component';
import { UsersComponent } from './users/users.component';
import { BulkLoadComponent } from './bulk-load/bulk-load.component';
import { CustomerBranchesComponent } from './customer-branches/customer-branches.component';
import { BranchDetailComponent } from './branch-detail/branch-detail.component';
import { BranchAddUserComponent } from './branch-add-user/branch-add-user.component';
import { BranchViewUsersComponent } from './branch-view-users/branch-view-users.component';
import { BranchUploadFileComponent } from './branch-upload-file/branch-upload-file.component';
import { BranchAudioListenComponent } from './branch-audio-listen/branch-audio-listen.component';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { AddCustomerBranchComponent } from './add-customer-branch/add-customer-branch.component';
import { UpdateCustomerBranchComponent } from './update-customer-branch/update-customer-branch.component';

import { AuthInterceptor } from './class/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,    
    AudioListenComponent, 
    AudioUploadComponent, 
    DashboardComponentComponent, 
    LoginComponent, 
    CustomerComponent, 
    BranchComponent, 
    UsersComponent, 
    BulkLoadComponent, 
    CustomerBranchesComponent, 
    BranchDetailComponent, 
    BranchAddUserComponent, 
    BranchViewUsersComponent, 
    BranchUploadFileComponent, 
    BranchAudioListenComponent, 
    AddNewCustomerComponent, 
    CustomerDetailComponent, 
    UpdateCustomerComponent,     
    AddCustomerBranchComponent, 
    UpdateCustomerBranchComponent
  ],
  imports: [    
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModalModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ 
    AudioServiceService, 
    UserService, 
    SimpleGlobal,
    AuthenticationService,
    AuthService,
    CustomerService,
    BranchService,
    BranchUserService,{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }