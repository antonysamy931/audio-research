import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Common } from '../class/common';
import { IsBranchExistForCustomerValidator } from '../class/validators/branch-exist-for-customer';

import { BranchService } from '../service/branch/branch.service';

@Component({
  selector: 'app-add-customer-branch',
  templateUrl: './add-customer-branch.component.html',
  styleUrls: ['./add-customer-branch.component.css']
})
export class AddCustomerBranchComponent extends Common implements OnInit {

  constructor(public router: Router, private route: ActivatedRoute,
  private branchservice: BranchService) {
    super(router);
   }

  CustomerId: string = "";
  Branch: any = {};

  branchname = new FormControl('branchname',[Validators.required],
                  [IsBranchExistForCustomerValidator(this.branchservice, this.route)]);
  branchdescription = new FormControl('branchdescription',Validators.required);
  branchaddress1 = new FormControl('branchaddress1',Validators.required);
  branchaddress2 = new FormControl('branchaddress2');
  branchcity = new FormControl('branchcity',Validators.required);
  branchstate = new FormControl('branchstate',Validators.required);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.CustomerId = params['id']
    },err => {

    });
  }
  
  Save(){
    this.Branch.CustomerId = this.CustomerId;
    this.branchservice.CreateBranch(this.Branch).subscribe(data => {
      this.router.navigateByUrl('/customer-branches/'+this.CustomerId);  
    }, err => {
      console.log(err);
    });
  }

  Cancel(){
    this.router.navigateByUrl('/customer-branches/'+this.CustomerId);
  }

}
