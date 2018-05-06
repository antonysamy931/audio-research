import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  Branch: any = {};
  BranchUsers: any = [];

  constructor(private route: ActivatedRoute, public router: Router,
    private branchservice: BranchService, private branchUserService: BranchUserService) {
      super(router);
     }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.BranchId = params['id'];
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
      this.BranchUsers = data;
    },err => {
      console.log(err);
    })
  }
}