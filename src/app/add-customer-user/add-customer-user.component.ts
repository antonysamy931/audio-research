import { Component, OnInit } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerUserService } from '../service/customer/user/customer-user.service';
import { CustomerService } from '../service/customer/customer.service';
import { AddUser } from '../class/user';
import { FormControl, Validators } from '@angular/forms';
import { IsUserNameExistForCustomerValidator } from '../class/validators/username-exist';

@Component({
  selector: 'app-add-customer-user',
  templateUrl: './add-customer-user.component.html',
  styleUrls: ['./add-customer-user.component.css']
})
export class AddCustomerUserComponent extends Common implements OnInit {
  
  constructor(public router: Router, private activerouter: ActivatedRoute,
  private customeruserservice: CustomerUserService, private customerservice: CustomerService) {
    super(router);
   }

  private CustomerId: string;
  private Customer: any = {};
  ValidationSummary: boolean = false;
  ValidationSummaryMessage: string = "";
  private hide: boolean = true;
  private User:AddUser= {
    Name: "",
    UserName: "",
    Password: "",
    Role: "",
    CustomerId: "",
    BranchId: null
  };

  Roles: any =[{value:"",text:"-- Select --"},
              {value:"admin",text:"Admin"},
              {value:"member",text:"Member"}]; 

  name = new FormControl('name', Validators.required);
  username = new FormControl('username', [Validators.required]);
  password = new FormControl('password', Validators.required);
  role = new FormControl('role', Validators.required);

  ngOnInit() {
    this.activerouter.params.subscribe(params => {
      this.CustomerId = params['id'];
    });
    this.LoadCustomerDetail();
  }

  LoadCustomerDetail(){
    this.customerservice.GetCustomer(this.CustomerId).subscribe(data => {
      this.Customer = data;
    }, err => {
      console.log(err);
    });
  }
  
  onChangeInput(){
    this.ValidationSummary = false;
    this.ValidationSummaryMessage = "";
  }

  Save(){
    this.User.CustomerId = this.CustomerId;
    this.customeruserservice.AddCustomerUser(this.User).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

}
