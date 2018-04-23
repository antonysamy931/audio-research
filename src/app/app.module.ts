import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { AudioListenComponent } from './audio-listen/audio-listen.component';
import { AppRoutingModule } from './app-routing.module';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';

import { AudioServiceService } from './audio-service.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,    
    AudioListenComponent, 
    AudioUploadComponent, 
    DashboardComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [ AudioServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* https://loiane.com/2017/07/getting-started-with-angular-material-2/ */