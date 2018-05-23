import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Common } from '../class/common';

import { BranchService } from '../service/branch/branch.service';
import { AuthService } from '../service/auth/auth.service';
import { SocketCustomerService } from '../service/socket/customer/socket-customer.service';

import * as io from 'socket.io-client';

@Component({
  selector: 'app-branch-audio-listen',
  templateUrl: './branch-audio-listen.component.html',
  styleUrls: ['./branch-audio-listen.component.css']
})
export class BranchAudioListenComponent extends Common implements OnInit, AfterViewInit {

  BranchId:string;
  CustomerId:string;
  Branch: any = {};
  AudioPath: any = {};
  Name: string = "";  
  AudioPlay: boolean = false;
  Mute: boolean = false;
  TotalDuration: number = 0;
  volume: number = 20;
  progress: number = 0;
  CurrentTime: number = 0;

  private audioFiles: any = [];

  private elementAudio : any;

  private socket;

  private socketAudioInfo: any = {
    branchid: "",
    audio: {
      isplay: false,
      ispause: false,
      isend: false,
      ismute: this.Mute,
      isstop: false,
      volume: this.volume,
      totalduration: 0,
      currenttime: 0,
      path: ""
    }
  }

  constructor(private route: ActivatedRoute, public router: Router,
    private branchservice: BranchService, private authService: AuthService,
    private elementRef: ElementRef, private customersocket: SocketCustomerService) {
    super(router);
    this.socket = this.socketinit.GetSocket(); 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.BranchId = params['id'];
      this.CustomerId = params['customerid'];
      this.socketAudioInfo.branchid = this.BranchId;
    },err => {

    }, () =>{

    });
    this.LoadBranchDetails();
    this.LoadAudio();    
    this.customersocket.GetCustomer(this.socket);

    
    /*setInterval(() => {
      this.SendAudioInfo();
    }, 1000);*/

  }

  ngAfterViewInit(){
    document.getElementById(this.BranchId).addEventListener('timeupdate', 
    function(){      
      var element = <HTMLAudioElement>(document.getElementById(this.BranchId));
      var percentage = Math.floor((element.currentTime / element.duration) * 100);
      this.CurrentTime = element.currentTime;
      this.progress = percentage;  
      this.socketAudioInfo.audio.ispause = false;
      this.socketAudioInfo.audio.isplay = true;  
      this.socketAudioInfo.audio.isend = false; 
      this.socketAudioInfo.audio.totalduration = element.duration;      
      this.socketAudioInfo.audio.currenttime = element.currentTime;
      this.socketAudioInfo.audio.isstop = false;
      this.SendAudioInfo();
    }.bind(this));

    document.getElementById(this.BranchId).addEventListener('ended',function(){
      this.Stop();
      var element = <HTMLAudioElement>(document.getElementById(this.BranchId));
      this.progress = 0;
      this.socketAudioInfo.audio.ispause = false;
      this.socketAudioInfo.audio.isplay = false; 
      this.socketAudioInfo.audio.isend = true; 
      this.socketAudioInfo.audio.totalduration = element.duration;      
      this.socketAudioInfo.audio.currenttime = 0;
      this.SendAudioInfo();
    }.bind(this));    

    document.getElementById(this.BranchId).addEventListener('play', 
    function(){            
      this.socketAudioInfo.audio.ispause = false;
      this.socketAudioInfo.audio.isplay = true; 
      this.socketAudioInfo.audio.isend = false;    
      this.socketAudioInfo.audio.isstop = false;   
      this.SendAudioInfo();  
    }.bind(this));

    document.getElementById(this.BranchId).addEventListener('pause', 
    function(){            
      this.socketAudioInfo.audio.ispause = true;
      this.socketAudioInfo.audio.isplay = false; 
      this.socketAudioInfo.audio.isend = false;      
      this.SendAudioInfo();   
    }.bind(this));

    setTimeout(() => {
      this.TotalDuration = (<HTMLAudioElement>document.getElementById(this.BranchId)).duration;
    }, 1000);
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
      this.socketAudioInfo.audio.path = data.Name;
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
    this.socketAudioInfo.audio.ispause = false;
    this.socketAudioInfo.audio.isplay = false; 
    this.socketAudioInfo.audio.isend = false;    
    this.socketAudioInfo.audio.isstop = true;
    this.SendAudioInfo();
  } 

  volumeChange(){
    this.elementAudio.volume = this.volume/100;
    if((this.volume/100) < 0.1){
      this.Mute = true;
      this.socketAudioInfo.audio.ismute = true;
    }else{
      this.Mute = false;
      this.socketAudioInfo.audio.ismute = false;
    }
    this.socketAudioInfo.audio.volume = this.volume;
    this.SendAudioInfo();
  }

  MuteVolume(){
    this.elementAudio.volume = 0;
    this.volume = 0;
    if(!this.Mute){
      this.Mute = true;      
      this.socketAudioInfo.audio.ismute = true;
    }    
    this.SendAudioInfo();
  }  

  ProgressChange(){
    this.elementAudio.currentTime = (this.progress/100)*this.TotalDuration;
  }

  private SendAudioInfo(){
    this.customersocket.SendPlayFileInfo(this.socket, this.socketAudioInfo);
  }
}
