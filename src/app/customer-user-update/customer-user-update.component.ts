import { Component, OnInit } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerUserService } from '../service/customer/user/customer-user.service';
import { CustomerService } from '../service/customer/customer.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-user-update',
  templateUrl: './customer-user-update.component.html',
  styleUrls: ['./customer-user-update.component.css']
})
export class CustomerUserUpdateComponent extends Common implements OnInit {

  constructor(public router: Router, private activatedroute: ActivatedRoute,
  private customerservice: CustomerService, private customeruserservice: CustomerUserService) {
    super(router);
  }

  private CustomerId: string;
  private UserId: string;
  private Customer: any = {};
  private User: any = {};

  ValidationSummary: boolean = false;
  ValidationSummaryMessage: string = "";
  private hide: boolean = true;
  

  Roles: any =[{value:"",text:"-- Select --"},
              {value:"admin",text:"Admin"},
              {value:"member",text:"Member"}]; 

  name = new FormControl('name', Validators.required);
  username = new FormControl('username', [Validators.required]);
  password = new FormControl('password', Validators.required);
  role = new FormControl('role', Validators.required);

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      this.UserId = params['id'];
      this.CustomerId = params['customerid'];
    }, err => {
      console.log(err);
    });
    this.LoadUser();
  }

  LoadUser(){
    this.customeruserservice.GetUserById(this.UserId).subscribe(data => {
      this.User = data;
    },err => {
      console.log(err);
    })
  }

  Save(){
    this.customeruserservice.UpdateCustomerUser(this.User).subscribe(data => {
      this.router.navigateByUrl(`/customer-user-detail/${this.UserId}/${this.CustomerId}`);
    },err => {
      console.log(err);
    });
  }

  onChangeInput(){
    this.ValidationSummary = false;
    this.ValidationSummaryMessage = "";
  }

}
