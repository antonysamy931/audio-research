import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './service/auth/auth.service';

import { Common } from './class/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends Common {  
  constructor(public router: Router, private authService: AuthService){
    super(router)
  }  
}
