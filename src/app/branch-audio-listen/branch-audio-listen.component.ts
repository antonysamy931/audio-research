import { Component, OnInit, ViewChild } from '@angular/core';
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
  AudioPlay: boolean = false;
  Mute: boolean = false;
  TotalDuration: number = 0;
  volume: number = 20;

  private audioFiles: any = [];

  private elementAudio : any;

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
      this.elementAudio = (<HTMLAudioElement>document.getElementById(this.BranchId));      
      this.elementAudio.load();
      this.TotalDuration = this.elementAudio.duration;
      this.elementAudio.volume = this.volume/100;
    });
  }

  play(){
    this.elementAudio.play();
  }

  pause(){
    this.elementAudio.pause();
  }

  Toggle(){
    if(this.AudioPlay){
      this.elementAudio.pause();
    }else{
      this.elementAudio.play();
      this.Mute = false;
    }    
    this.AudioPlay = !this.AudioPlay;
  }

  Stop(){
    this.elementAudio.pause();
    this.AudioPlay = false;
    this.elementAudio.currentTime = 0;
  } 

  volumeChange(){
    console.log(this.volume/100);    
    this.elementAudio.volume = this.volume/100;
    if((this.volume/100) < 0.1){
      this.Mute = true;
    }else{
      this.Mute = false;
    }
  }

  MuteVolume(){
    this.elementAudio.volume = 0;
    this.volume = 0;
    if(!this.Mute){
      this.Mute = true;      
    }    
  }
}
