import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Common } from '../class/common';

import { BranchService } from '../service/branch/branch.service';

@Component({
  selector: 'app-branch-upload-file',
  templateUrl: './branch-upload-file.component.html',
  styleUrls: ['./branch-upload-file.component.css']
})
export class BranchUploadFileComponent extends Common implements OnInit {

  BranchId:string;
  Branch: any = {};
  @ViewChild('audioUpload')
  private audioElement : any;
  private AudioFile: any;
  private ButtonDisabled: boolean = true;

  constructor(private route: ActivatedRoute, public router: Router,
    private branchservice: BranchService) {
      super(router);
     }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.BranchId = params['id'];
    },err => {

    }, () =>{

    });
    this.LoadBranchDetails();
  }

  LoadBranchDetails(){
    this.branchservice.GetBranchById(this.BranchId).subscribe(data => {
      this.Branch = data;
    }, err =>{
      console.log(err);
    })

  }
  
  onFileChange(event){    
    if(event.target.files && event.target.files.length > 0){
      this.AudioFile=event.target.files[0];
      this.ButtonDisabled = false;          
    }
  }

}