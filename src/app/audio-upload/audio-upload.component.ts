import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimateTimings } from '@angular/core/src/animation/dsl';
import { Router } from '@angular/router';

import { AudioServiceService } from '../audio-service.service'
import { Common } from '../class/common';

@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.css']
})

export class AudioUploadComponent extends Common implements OnInit {
  audioFile: any;
  constructor(private audioService: AudioServiceService, public router:Router) {
    super(router);
  }

  @ViewChild('audioUpload')
  private audioElement : any;
  ngOnInit() {
  }

  onFileChange(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0){
      const formData: any = new FormData();
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
        });      
    }
  }

}
