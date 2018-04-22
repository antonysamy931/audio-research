import { Component, OnInit } from '@angular/core';
import { AnimateTimings } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.css']
})
export class AudioUploadComponent implements OnInit {
  audioFile: any;
  constructor() { }

  ngOnInit() {
  }

  onFileChange(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0){
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.audioFile = {
          filename : file.name,
          filetype : file.type,
          content : reader.result.split(',')[1]
        };        
      }
    }
  }

}
