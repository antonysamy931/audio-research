import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Common } from '../class/common';
import { IsCustomerNameExistValidator } from '../class/validators/customer-exist';

import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent extends Common implements OnInit {

  constructor(public router: Router, private customerservice: CustomerService) {
    super(router);
   }

  customername = new FormControl('customername',[Validators.required], 
                [IsCustomerNameExistValidator(this.customerservice)]);
  customerdescription = new FormControl('customerdescription',Validators.required);
  customeraddress1 = new FormControl('customeraddress1',Validators.required);
  customeraddress2 = new FormControl('customeraddress2');
  customercity = new FormControl('customercity',Validators.required);
  customerstate = new FormControl('customerstate',Validators.required);
  
  Customer: any = {}

  CustomerNames: any[] = [];

  ngOnInit() {    
  }

  Save(){    
    this.customerservice.CreateCustomer(this.Customer).subscribe(data => {
      this.router.navigateByUrl('/customer');
    }, err => {
      console.log(err);
    });
  }

  Cancel(){
    this.router.navigateByUrl('/customer');
  } 
}