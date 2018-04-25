import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleGlobal } from 'ng2-simple-global';

import { AppComponent } from './app.component';
import { AudioListenComponent } from './audio-listen/audio-listen.component';
import { AppRoutingModule } from './app-routing.module';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';

import { AudioServiceService } from './audio-service.service';
import { UserService } from './service/user.service';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material/app-material.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,    
    AudioListenComponent, 
    AudioUploadComponent, 
    DashboardComponentComponent, 
    LoginComponent
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ AudioServiceService, UserService, SimpleGlobal ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }