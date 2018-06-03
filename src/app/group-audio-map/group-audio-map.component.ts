import { Component, OnInit, ViewChild } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CustomerGroupService } from '../service/group/customer-group.service';
import { GroupAudioMapServiceService } from '../service/group-audio/group-audio-map-service.service';

@Component({
  selector: 'app-group-audio-map',
  templateUrl: './group-audio-map.component.html',
  styleUrls: ['./group-audio-map.component.css']
})
export class GroupAudioMapComponent extends Common implements OnInit {

  constructor(public router: Router, private activatedroute: ActivatedRoute,
  private groupservice: CustomerGroupService, private groupaudiomappedservice: GroupAudioMapServiceService,
  private spinnerService: Ng4LoadingSpinnerService) {
    super(router);
  }

  private CustomerId: string;
  private Groups: any = [];
  @ViewChild('audioUpload')
  private audioElement : any;
  private AudioFile: any;
  private ButtonDisabled: boolean = true;
  private Group: string;
  group = new FormControl('group',[Validators.required]);

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      this.CustomerId = params['id'];
    });
    this.LoadCustomerGroups();
  }

  LoadCustomerGroups(){
    this.groupservice.GetCustomerGroups(this.CustomerId).subscribe(data => {
      this.Groups.push({value:"",text:"-- Select Group --"});
      data.forEach(element => {
        this.Groups.push({value:element.ID, text: element.Name});
      });      
    }, err => {
      console.log(err);
    })
  }

  onFileChange(event){    
    if(event.target.files && event.target.files.length > 0){
      this.AudioFile=event.target.files[0];
      this.ButtonDisabled = false;          
    }
  }

  Save(){
    this.spinnerService.show();
    let reader = new FileReader();
    const formData: any = new FormData();
    formData.append('audio', this.AudioFile, this.AudioFile.name);      
    this.groupaudiomappedservice.InsertAudioByGroup(this.Group, formData)
      .subscribe(message => 
      {        
        this.audioElement.nativeElement.value = "";
        this.ButtonDisabled = true;
        this.spinnerService.hide();
      }, err => 
      {
        console.log(err)
      },() => {
        this.Redirect('/customer-detail/'+this.CustomerId)
      });
  }

}
