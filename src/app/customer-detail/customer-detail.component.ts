import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Common } from '../class/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})

export class CustomerDetailComponent extends Common implements OnInit {

  CustomerId: string = "";

  constructor(public router: Router, private route: ActivatedRoute) {
    super(router);
   }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.CustomerId = params['id'];
    }, err => {

    });
  }

}
