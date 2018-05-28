import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource, MatPaginator } from '@angular/material'

import { Common } from '../class/common';

import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent extends Common implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private datasource:any;
  displayedColumns = ['Name','Description','CustomerId'];
  
  constructor(public router:Router, private customerService: CustomerService) { 
    super(router);    
  }  

  private data: any = [];

  ngOnInit() {
    this.LoadCustomers();    
  }

  LoadCustomers(){
    this.customerService.GetCustomers().subscribe(
      data => { this.datasource = new MatTableDataSource(data); this.data = data; },
      err => {
        console.log(err);
      },()=>{
        this.datasource.paginator = this.paginator;
      }
    );
  }

}
