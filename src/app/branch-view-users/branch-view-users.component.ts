import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material'

import { Common } from '../class/common';

import { BranchService } from '../service/branch/branch.service';
import { BranchUserService } from '../service/branch/user/branch-user.service';

@Component({
  selector: 'app-branch-view-users',
  templateUrl: './branch-view-users.component.html',
  styleUrls: ['./branch-view-users.component.css']
})
export class BranchViewUsersComponent extends Common implements OnInit {

  BranchId:string;
  CustomerId:string;
  Branch: any = {};
  BranchUsers: any = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['No','Name','Username','Role','Detail', 'Edit'];

  private datasource:any;


  constructor(private route: ActivatedRoute, public router: Router,
    private branchservice: BranchService, private branchUserService: BranchUserService) {
      super(router);
     }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.BranchId = params['id'];
      this.CustomerId = params['customerid'];
    },err => {

    }, () =>{

    });
    this.LoadBranchDetails();
    this.LoadBranchUsers();
  }

  LoadBranchDetails(){
    this.branchservice.GetBranchById(this.BranchId).subscribe(data => {
      this.Branch = data;
    }, err =>{
      console.log(err);
    });
  }  

  LoadBranchUsers(){
    this.branchUserService.GetUsers(this.BranchId).subscribe(data => {
      data.forEach(function(element, i) {
        element.No = i+1;
      });
      this.BranchUsers = data;
      this.datasource = new MatTableDataSource(data);
    },err => {
      console.log(err);
    },() => {
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }
}