import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Common } from '../class/common';

import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})

export class UpdateCustomerComponent extends Common implements OnInit {

  CustomerId: string = "";
  Customer: any = {};

  constructor(public router: Router, private route: ActivatedRoute,
  private customerService: CustomerService) {
    super(router);
   }

  customerdescription = new FormControl('customerdescription',Validators.required);
  customeraddress1 = new FormControl('customeraddress1',Validators.required);
  customeraddress2 = new FormControl('customeraddress2');
  customercity = new FormControl('customercity',Validators.required);
  customerstate = new FormControl('customerstate',Validators.required);

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

  Update(){
    this.customerService.UpdateCustomer(this.Customer).subscribe(data => {
      this.router.navigateByUrl('/customer-detail/'+this.CustomerId);
    }, err => {
      console.log(err);
    });
  }

  Cancel(){
    this.router.navigateByUrl('/customer-detail/'+this.CustomerId);
  }

}
