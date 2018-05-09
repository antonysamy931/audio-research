import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validator, Validators } from '@angular/forms';

import { Common } from '../class/common';

import { BranchUserService } from '../service/branch/user/branch-user.service';

@Component({
  selector: 'app-branch-user-update',
  templateUrl: './branch-user-update.component.html',
  styleUrls: ['./branch-user-update.component.css']
})
export class BranchUserUpdateComponent extends Common implements OnInit {

  UserId: string = '';
  User: any = {};
  ValidationSummary: boolean = false;
  ValidationSummaryMessage: string = "";
  hide:boolean = true;
  
  Roles: any =[{value:"",text:"-- Select --"},
                  {value:"member",text:"Member"}]; 

  name = new FormControl('name', Validators.required);
  username = new FormControl('username', Validators.required);
  password = new FormControl('password', Validators.required);
  role = new FormControl('role', Validators.required);

  constructor(private route: ActivatedRoute, public router: Router,
    private branchUserService: BranchUserService) {
      super(router);
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.UserId = params['id'];
    }, err => {
      console.log(err);
    });

    this.LoadUser();
  }

  onChangeInput(){
    this.ValidationSummary = false;
    this.ValidationSummaryMessage = "";
  }

  LoadUser(){
    this.branchUserService.GetUserById(this.UserId).subscribe(data => {
      this.User = data;
    },err => {
      console.log(err);
    })
  }

  Save(){
    this.branchUserService.UpdateUser(this.User).subscribe(data => {      
      this.router.navigateByUrl('/branch-user-detail/'+this.UserId);
    }, err => {
      console.log(err);
    },() => {
      this.router.navigateByUrl('/branch-user-detail/'+this.UserId);
    })
  }

  Exit(){
    this.router.navigateByUrl('/branch-user-detail/'+this.UserId);
  }

}
