import { Component, OnInit } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from '../service/branch/branch.service';

@Component({
  selector: 'app-monitoring-branch-player',
  templateUrl: './monitoring-branch-player.component.html',
  styleUrls: ['./monitoring-branch-player.component.css']
})
export class MonitoringBranchPlayerComponent extends Common implements OnInit {

  constructor(public router: Router, private activatedrouter: ActivatedRoute,
  private branchservice: BranchService) {
    super(router);
  }

  private CustomerId:string;
  private BranchId:string;
  private Branch:any={};

  ngOnInit() {
    this.activatedrouter.parent.params.subscribe(params => {
      this.CustomerId = params['id'];
    });
    this.activatedrouter.params.subscribe(params =>{
      this.BranchId = params['id'];
      this.LoadBranchDetails();
    });
  }  

  LoadBranchDetails(){
    this.branchservice.GetBranchById(this.BranchId).subscribe(data => {
      this.Branch = data;
    }, err =>{
      console.log(err);
    })
  }

}
