import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Common } from '../class/common';

import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})

export class CustomerDetailComponent extends Common implements OnInit {

  CustomerId: string = "";
  Customer: any = {};

  constructor(public router: Router, private route: ActivatedRoute,
  private customerService: CustomerService) {
    super(router);
   }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.CustomerId = params['id'];
    }, err => {

    });
    this.LoadCustomerDetail();
  }

  LoadCustomerDetail(){
    this.customerService.GetCustomer(this.CustomerId).subscribe(data => {
      this.Customer = data;
    }, err => {
      console.log(err);
    });
  }

  Edit(){    
    this.router.navigateByUrl('/update-customer/'+this.CustomerId);
  }

  Back(){
    this.router.navigateByUrl('/customer');
  }

}
