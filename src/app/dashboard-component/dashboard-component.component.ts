import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Common } from '../class/common';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent extends Common implements OnInit {  
  
  public Name:string;

  constructor(public router:Router) { 
    super(router);    
  }

  ngOnInit() {
    if(localStorage.getItem('UserId')){
        this.Name = localStorage.getItem('UserId');
    }
  }

}
