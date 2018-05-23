import { Component, OnInit, OnDestroy } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from '../service/branch/branch.service';
import { SocketBranchService } from '../service/socket/branch/socket-branch.service';

@Component({
  selector: 'app-monitoring-branch-player',
  templateUrl: './monitoring-branch-player.component.html',
  styleUrls: ['./monitoring-branch-player.component.css']
})
export class MonitoringBranchPlayerComponent extends Common implements OnInit, OnDestroy {

  constructor(public router: Router, private activatedrouter: ActivatedRoute,
  private branchservice: BranchService, private socketbranchservice: SocketBranchService) {
    super(router);
    this.Socket = this.socketinit.GetSocket();
  }

  private CustomerId:string;
  private BranchId:string;
  private Branch:any={};
  private Socket:any;

  ngOnInit() {
    this.activatedrouter.parent.params.subscribe(params => {
      this.CustomerId = params['id'];
    });
    this.activatedrouter.params.subscribe(params =>{
      this.BranchId = params['id'];
      this.LoadBranchDetails();
      this.socketbranchservice.JoinBranchPage(this.Socket,this.BranchId);
    });    

    this.Socket.on('receiveaudio',(data) => { 
      console.log(data);     
    });

  }  
  
  ngOnDestroy(){  
    this.socketbranchservice.LeaveBranchPage(this.Socket, this.BranchId);
  }

  LoadBranchDetails(){
    this.branchservice.GetBranchById(this.BranchId).subscribe(data => {
      this.Branch = data;
    }, err =>{
      console.log(err);
    })
  }

}
