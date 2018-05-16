import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      this.data = data;   
    }, err => {
      console.log(err); 
    })
  }
}
