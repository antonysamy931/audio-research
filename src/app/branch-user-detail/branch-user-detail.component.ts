import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Common } from '../class/common';

import { BranchUserService } from '../service/branch/user/branch-user.service';

@Component({
  selector: 'app-branch-user-detail',
  templateUrl: './branch-user-detail.component.html',
  styleUrls: ['./branch-user-detail.component.css']
})
export class BranchUserDetailComponent extends Common implements OnInit {

  UserId: string = '';
  CustomerId: string;
  User: any = {};

  constructor(private route: ActivatedRoute, public router: Router,
    private branchUserService: BranchUserService) {
      super(router);
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.UserId = params['id'];
      this.CustomerId = params['customerid'];
    }, err => {
      console.log(err);
    });

    this.LoadUser();
  }

  LoadUser(){
    this.branchUserService.GetUserById(this.UserId).subscribe(data => {
      this.User = data;
    },err => {
      console.log(err);
    })
  }

  Edit(){
    this.router.navigateByUrl('/branch-user-update/'+this.UserId+'/'+this.CustomerId);
  }

}
