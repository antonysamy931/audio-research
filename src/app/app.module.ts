import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
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

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material/app-material.module';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { BranchComponent } from './branch/branch.component';
import { UsersComponent } from './users/users.component';
import { BulkLoadComponent } from './bulk-load/bulk-load.component';

@NgModule({
  declarations: [
    AppComponent,    
    AudioListenComponent, 
    AudioUploadComponent, 
    DashboardComponentComponent, 
    LoginComponent, CustomerComponent, BranchComponent, UsersComponent, BulkLoadComponent
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModalModule.forRoot()
  ],
  providers: [ 
    AudioServiceService, 
    UserService, 
    SimpleGlobal,
    AuthenticationService,
    AuthService
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }