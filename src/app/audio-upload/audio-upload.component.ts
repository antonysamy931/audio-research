import { Component, OnInit, ViewChild } from '@angular/core';
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
