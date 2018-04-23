import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AudioServiceService } from '../audio-service.service'
@Component({
  selector: 'app-audio-listen',
  templateUrl: './audio-listen.component.html',
  styleUrls: ['./audio-listen.component.css']
})
export class AudioListenComponent implements OnInit {  

  private apiMessage: any;
  private audioFiles: any = [];
  private currentAudioId: string = "";

  constructor(private audioService: AudioServiceService) { }

  ngOnInit() {    
    this.loadMessage();
    this.getPlayList();    
    this.currentAudioId = "";
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
            path:'/api/getfile?name='+element,
            Id:element.split('.')[0].replace(' ','_')
          });
        });        
      },
      err => {console.log(err)}
    )    
  }
}
