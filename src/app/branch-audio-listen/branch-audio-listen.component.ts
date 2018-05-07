import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Common } from '../class/common';

import { BranchService } from '../service/branch/branch.service';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-branch-audio-listen',
  templateUrl: './branch-audio-listen.component.html',
  styleUrls: ['./branch-audio-listen.component.css']
})
export class BranchAudioListenComponent extends Common implements OnInit {

  BranchId:string;
  Branch: any = {};
  AudioPath: any = {};
  Name: string = "";

  private audioFiles: any = [];

  constructor(private route: ActivatedRoute, public router: Router,
    private branchservice: BranchService, private authService: AuthService) {
    super(router);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.BranchId = params['id'];
    },err => {

    }, () =>{

    });
    this.LoadBranchDetails();
    this.LoadAudio();    
  }

  LoadBranchDetails(){
    this.branchservice.GetBranchById(this.BranchId).subscribe(data => {
      this.Branch = data;
    }, err =>{
      console.log(err);
    });
  }

  LoadAudio(){
    this.branchservice.GetAudioByBranchId(this.BranchId).subscribe(data => {      
      this.AudioPath = "/api/v1/play/getfile?name="+ data.Name;      
      this.Name = data.Name;
    }, err => {
      console.log(err)
    },() => {      
      (<HTMLAudioElement>document.getElementById(this.BranchId)).load();
    });
  }

  play(){
    (<HTMLAudioElement>document.getElementById(this.BranchId)).play();
  }

  pause(){
    (<HTMLAudioElement>document.getElementById(this.BranchId)).pause();
  }
}
