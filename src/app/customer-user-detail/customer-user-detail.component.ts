import { Component, OnInit } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerUserService } from '../service/customer/user/customer-user.service';
import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-customer-user-detail',
  templateUrl: './customer-user-detail.component.html',
  styleUrls: ['./customer-user-detail.component.css']
})
export class CustomerUserDetailComponent extends Common implements OnInit {

  constructor(public router: Router, private activatedroute: ActivatedRoute,
  private customerservice: CustomerService, private customeruserservice: CustomerUserService) {
    super(router);
  }

  private CustomerId: string;
  private UserId: string;
  private Customer: any = {};
  private User: any = {};

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

  Edit(){
    this.router.navigateByUrl(`/customer-user-update/${this.UserId}/${this.CustomerId}`);
  }

}
