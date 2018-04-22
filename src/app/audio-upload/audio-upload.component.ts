import { Component, OnInit } from '@angular/core';
import { AnimateTimings } from '@angular/core/src/animation/dsl';
import { AudioServiceService } from '../audio-service.service'
@Component({
  selector: 'app-audio-upload',
  templateUrl: './audio-upload.component.html',
  styleUrls: ['./audio-upload.component.css']
})
export class AudioUploadComponent implements OnInit {
  audioFile: any;
  constructor(private audioService: AudioServiceService) { }

  ngOnInit() {
  }

  onFileChange(event){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0){
      let formData = new FormData();
      let file = event.target.files[0];
      formData.append('file',file,file.name);
      this.audioService.upload(formData)
        .subscribe(message => {console.log(message)},
                  err => {console.log(err)});
      /*reader.readAsDataURL(file);
      reader.onload = () => {
        this.audioFile = {
          filename : file.name,
          filetype : file.type,
          content : reader.result.split(',')[1]
        };        
      }*/
    }
  }

}
