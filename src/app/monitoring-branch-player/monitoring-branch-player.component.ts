import { Component, OnInit, OnDestroy } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from '../service/branch/branch.service';
import { SocketBranchService } from '../service/socket/branch/socket-branch.service';
import { SocketCustomerService } from '../service/socket/customer/socket-customer.service';

@Component({
  selector: 'app-monitoring-branch-player',
  templateUrl: './monitoring-branch-player.component.html',
  styleUrls: ['./monitoring-branch-player.component.css']
})
export class MonitoringBranchPlayerComponent extends Common implements OnInit, OnDestroy {

  constructor(public router: Router, private activatedrouter: ActivatedRoute,
  private branchservice: BranchService, private socketbranchservice: SocketBranchService,
  private socketcustomerservice: SocketCustomerService) {
    super(router);
    this.Socket = this.socketinit.GetSocket();
  }

  private CustomerId:string;
  private BranchId:string;
  private Branch:any={};
  private Socket:any;
  private SocketAudioInfo:any = {};
  private progress:number = 0;

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
      this.SocketAudioInfo = data;
      var percentage = Math.floor((data.currenttime /data.totalduration) * 100);      
      this.progress = percentage;      
    });

    setInterval(() => {
      this.socketcustomerservice.GetCustomerBranches(this.Socket, this.CustomerId);
    }, 1000);
    
    this.Socket.on('GetCustomerBranches',(data) => {
      if(!data.find(x => x.BranchId == this.BranchId)){
        this.SocketAudioInfo = {};
      }
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
