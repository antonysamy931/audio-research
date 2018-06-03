import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material'
import { Common } from '../class/common';

import { BranchService } from '../service/branch/branch.service';

@Component({
  selector: 'app-customer-branches',
  templateUrl: './customer-branches.component.html',
  styleUrls: ['./customer-branches.component.css']
})

export class CustomerBranchesComponent extends Common implements OnInit, OnDestroy {
  
  CustomerId: string;
  data: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['No','Name','Description','Detail', 'Edit'];

  private datasource:any;

  constructor(private route: ActivatedRoute, public router: Router,
    private branchservice: BranchService) {
    super(router);
   }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.CustomerId = params['id'];
    },err => {
    }, () =>{      
    });
    this.LoadCustomerBranches();
  }
  
  ngOnDestroy(){

  }

  LoadCustomerBranches(){
    this.branchservice.GetBranchesByCustomer(this.CustomerId).subscribe(data => {       
      data.forEach(function(element,i) {
        element.No = i+1;
      });
      this.data = data; 
      this.datasource = new MatTableDataSource(data); 
    }, err => {
      console.log(err); 
    },() => {
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }
}
