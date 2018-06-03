import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material'

import { Common } from '../class/common';

import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent extends Common implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private datasource:any;
  displayedColumns = ['No','Name','Description','Detail', 'Edit','Branches'];
  
  constructor(public router:Router, private customerService: CustomerService) { 
    super(router);    
  }  

  private data: any = [];

  ngOnInit() {
    this.LoadCustomers();    
  }

  LoadCustomers(){
    this.customerService.GetCustomers().subscribe(
      data => {      
        data.forEach(function(element,i) {
          element.No = i+1;
        }); 
        this.datasource = new MatTableDataSource(data); this.data = data; },
      err => {
        console.log(err);
      },()=>{
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      }
    );
  }

}
