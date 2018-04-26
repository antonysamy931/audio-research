import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimateTimings } from '@angular/core/src/animation/dsl';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AudioServiceService } from '../audio-service.service'
import { UserService } from '../service/user.service';

import { Common } from '../class/common';
import { User } from '../class/user';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.css']
})

export class AudioUploadComponent extends Common implements OnInit {
  audioFile: any;
  constructor(private audioService: AudioServiceService, public router:Router,
  private userService: UserService) {
    super(router);
  }

  @ViewChild('audioUpload')
  private audioElement : any;
  private Name:string;
  private Users: any[];
  private User: any;
  private AudioFile: any;
  private ButtonDisabled: boolean = true;
  
  private user = new FormControl('user',[Validators.required]);
  private file = new FormControl('file',[Validators.required]);

  ngOnInit() {
    if(localStorage.getItem('Name')){
        this.Name = localStorage.getItem('Name');
    }
    this.GetUsers();
  }

  Upload(){
    let reader = new FileReader();
    const formData: any = new FormData();
    formData.append('audio', this.AudioFile, this.AudioFile.name);      
    this.audioService.upload(formData,this.User)
      .subscribe(message => 
      {
        console.log(message)          
        this.audioElement.nativeElement.value = "";   
        this.User="";       
      }, err => 
      {
        console.log(err)
      });
  }

  onFileChange(event){
    //let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0){
      this.AudioFile=event.target.files[0];
      this.ButtonDisabled = false;
      /*const formData: any = new FormData();
      let file = event.target.files[0];
      formData.append('audio', file, file.name);      
      this.audioService.upload(formData)
        .subscribe(message => 
        {
          console.log(message)          
          this.audioElement.nativeElement.value = "";          
        }, err => 
        {
          console.log(err)
        });*/      
    }
  }

  GetUsers(){
    this.userService.getotherusers().subscribe(data => {
      this.Users = data;      
      /*let users: User[];

      data.forEach(item => {
        let user: User = {
          Id : item.ID,
          Name : item.Name,
          UserName : item.UserName
        };
        users.push(user);        
      });
      this.Users = users;*/
      console.log(this.Users);
    }, err => {
      console.log(err);
    });
  }

}
