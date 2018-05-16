import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Common } from '../class/common';

import { BranchService } from '../service/branch/branch.service';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.css']
})
export class BranchDetailComponent extends Common implements OnInit {

  BranchId:string;
  CustomerId:string;

  Branch: any = {};

  constructor(private route: ActivatedRoute, public router: Router,
    private branchservice: BranchService) {
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
  }

  LoadBranchDetails(){
    this.branchservice.GetBranchById(this.BranchId).subscribe(data => {
      this.Branch = data;
    }, err =>{
      console.log(err);
    })
  }

  Edit(){
    this.router.navigateByUrl('/update-customer-branch/'+this.BranchId+'/'+this.CustomerId);
  }

  Back(){
    this.router.navigateByUrl('/customer-branches/'+this.Branch.CustomerId);
  }

}
