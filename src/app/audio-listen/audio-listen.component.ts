import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AudioServiceService } from '../audio-service.service'
import { UserService } from '../service/user.service';

import { Common } from '../class/common';

@Component({
  selector: 'app-audio-listen',
  templateUrl: './audio-listen.component.html',
  styleUrls: ['./audio-listen.component.css']
})
export class AudioListenComponent extends Common implements OnInit {  

  private apiMessage: any;
  private audioFiles: any = [];
  private currentAudioId: string = "";
  private Name:string;
  private Users: any[];

  constructor(private audioService: AudioServiceService, public router:Router,
  private userService: UserService) {
    super(router);
  }

  ngOnInit() {    
    this.loadMessage();    
    this.currentAudioId = "";
    if(localStorage.getItem('Name')){
        this.Name = localStorage.getItem('Name');
    }
    this.GetUsers();                
  }

  mapAudioFileByUser(){
    this.Users.forEach(record => {
      this.audioService.getfilesbyuser(record.ID).subscribe(
        data => {
          data.forEach(file => {
            this.audioFiles.forEach(audio => {
              if(audio.fullname == file.Name){
                audio.UserId.push(record.ID);
              }
            });
          });
          console.log(this.audioFiles);
        }, err =>{
          console.log(err)
        }
      );
    });
  }

  getFileNamesByUser(Id:any){
    this.audioService.getfilesbyuser(Id).subscribe(
        data => {
          console.log(data)
        }, err =>{
          console.log(err)
        }
      );
  }

  loadMessage(){
    this.apiMessage = this.audioService.getMessage().subscribe(
      message => this.apiMessage = message, 
      err => {console.log(err)});
  }

  CurrentPlay(Id){    
    if(this.currentAudioId != "" && this.currentAudioId != Id){      
      (<HTMLAudioElement>document.getElementById(this.currentAudioId)).pause();
      (<HTMLAudioElement>document.getElementById(this.currentAudioId)).load();
      this.currentAudioId = Id;
    }
    else
      this.currentAudioId = Id;
  }

  getPlayList(){
    this.audioService.getPlayLists().subscribe(
      data => {        
        data.forEach(element => {          
          this.audioFiles.push({
            name:element.split('.')[0],
            fullname:element,
            UserId: [],
            path:'/api/getfile?name='+element,
            Id:element.split('.')[0].replace(' ','_')
          });
        });        
      },
      err => {console.log(err)}
    ,() => {
      this.mapAudioFileByUser();
    });    
  }

  GetUsers(){
    this.userService.getotherusers().subscribe(data => {
      this.Users = data;            
      console.log(this.Users);
    }, err => {
      console.log(err);
    },()=>{
      this.getPlayList();
    });
  }
}
