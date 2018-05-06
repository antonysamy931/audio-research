import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validator, Validators } from '@angular/forms';

import { Common } from '../class/common';
import { AddUser } from '../class/user';

import { BranchService } from '../service/branch/branch.service';
import { BranchUserService } from '../service/branch/user/branch-user.service';

@Component({
  selector: 'app-branch-add-user',
  templateUrl: './branch-add-user.component.html',
  styleUrls: ['./branch-add-user.component.css']
})
export class BranchAddUserComponent extends Common implements OnInit {

  BranchId:string;
  Branch: any = {};
  ValidationSummary: boolean = false;
  ValidationSummaryMessage: string = "";

  Roles: any =[{value:"",text:"-- Select --"},
                  {value:"member",text:"Member"}]; 

  name = new FormControl('name', Validators.required);
  username = new FormControl('username', Validators.required);
  password = new FormControl('password', Validators.required);
  role = new FormControl('role', Validators.required);

  constructor(private route: ActivatedRoute, public router: Router,
    private branchservice: BranchService, private branchUserService: BranchUserService) {
      super(router);
     }
    
  User: AddUser = {
    Name: "",
    UserName: "",
    Password: "",
    Role: "",
    CustomerId: this.Branch.CustomerId,
    BranchId: this.BranchId
  };
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.BranchId = params['id'];
    },err => {

    }, () =>{

    });
    this.LoadBranchDetails();
  }

  GoToBranchDetail(){
    this.Redirect('/branch-detail/'+this.BranchId);
  }

  onChangeInput(){
    this.ValidationSummary = false;
    this.ValidationSummaryMessage = "";
  }

  LoadBranchDetails(){
    this.branchservice.GetBranchById(this.BranchId).subscribe(data => {
      this.Branch = data;
    }, err =>{
      console.log(err);
    })
  }

  Save(){
    this.User.BranchId = this.BranchId;
    this.User.CustomerId = this.Branch.CustomerId;
    console.log(this.User);
    this.branchUserService.AddNewUser(this.User).subscribe(data => {
      console.log(data);
    },err=> {
      console.log(err);
    },() => {
      this.Redirect('/branch-detail/'+this.BranchId)
    })
  }


}
