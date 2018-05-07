import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Common } from '../class/common';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})

export class UpdateCustomerComponent extends Common implements OnInit {

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
