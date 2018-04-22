import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AudioServiceService } from '../audio-service.service'
@Component({
  selector: 'app-audio-listen',
  templateUrl: './audio-listen.component.html',
  styleUrls: ['./audio-listen.component.css']
})
export class AudioListenComponent implements OnInit {
  private apiMessage: any;
  constructor(private audioService: AudioServiceService) { }

  ngOnInit() {    
    this.loadMessage();
  }

  loadMessage(){
    this.apiMessage = this.audioService.getMessage().subscribe(
      message => this.apiMessage = message, 
      err => {console.log(err)});
  }
}
