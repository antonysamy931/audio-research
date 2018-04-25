import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';

import { Common } from './class/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends Common {  
  constructor(public router: Router){
    super(router)      
  }  
}
