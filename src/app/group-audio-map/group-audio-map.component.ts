import { Component, OnInit } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerGroupService } from '../service/group/customer-group.service';
import { GroupAudioMapServiceService } from '../service/group-audio/group-audio-map-service.service';

@Component({
  selector: 'app-group-audio-map',
  templateUrl: './group-audio-map.component.html',
  styleUrls: ['./group-audio-map.component.css']
})
export class GroupAudioMapComponent extends Common implements OnInit {

  constructor(public router: Router, private activatedroute: ActivatedRoute,
  private groupservice: CustomerGroupService, private groupaudiomappedservice: GroupAudioMapServiceService) {
    super(router);
  }

  private CustomerId: string;
  private Groups: any = [];

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

}
