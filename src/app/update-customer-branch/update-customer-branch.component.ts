import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Common } from '../class/common';

import { BranchService } from '../service/branch/branch.service';

@Component({
  selector: 'app-update-customer-branch',
  templateUrl: './update-customer-branch.component.html',
  styleUrls: ['./update-customer-branch.component.css']
})
export class UpdateCustomerBranchComponent extends Common implements OnInit {

  constructor(public router: Router, private route: ActivatedRoute,
  private branchservice: BranchService) {
    super(router);
  }
  
  BranchId: string = "";
  CustomerId:string;
  Branch: any = {};

  branchdescription = new FormControl('branchdescription',Validators.required);
  branchaddress1 = new FormControl('branchaddress1',Validators.required);
  branchaddress2 = new FormControl('branchaddress2');
  branchcity = new FormControl('branchcity',Validators.required);
  branchstate = new FormControl('branchstate',Validators.required);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.BranchId = params['id'];
      this.CustomerId = params['customerid'];
    },err => {

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

  Update(){
    this.branchservice.UpdateBranch(this.Branch).subscribe(data => {
      this.router.navigateByUrl('/branch-detail/'+this.BranchId+'/'+this.CustomerId);
    }, err =>{
      console.log(err);
    })
  }

  Cancel(){
    this.router.navigateByUrl('/branch-detail/'+this.BranchId+'/'+this.CustomerId);
  }

}
