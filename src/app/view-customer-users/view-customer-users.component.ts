import { Component, OnInit, ViewChild } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material'
import { CustomerUserService } from '../service/customer/user/customer-user.service';
import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-view-customer-users',
  templateUrl: './view-customer-users.component.html',
  styleUrls: ['./view-customer-users.component.css']
})
export class ViewCustomerUsersComponent extends Common implements OnInit {

  constructor(public router: Router, private activatedroute: ActivatedRoute,
  private customeruserservice: CustomerUserService, private customerservice: CustomerService) {
    super(router);
  }

  private CustomerId: string;
  private Users:any = [];
  private Customer:any = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['No','Name','Username','Role','Detail', 'Edit'];

  private datasource:any;

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      this.CustomerId = params['id']
    });
    this.LoadCustomerDetail();
    this.LoadCustomerUsers();
  }
  
  LoadCustomerDetail(){
    this.customerservice.GetCustomer(this.CustomerId).subscribe(data => {
      this.Customer = data;
    }, err => {
      console.log(err);
    });
  }

  LoadCustomerUsers(){
    this.customeruserservice.GetCustomerUsers(this.CustomerId).subscribe(data => {
      data.forEach(function(element, i) {
        element.No = i+1;
      });
      this.Users = data;    
      this.datasource = new MatTableDataSource(data);  
    }, err => {
      console.log(err);
    }, () => {
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

}
