import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimateTimings } from '@angular/core/src/animation/dsl';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { CustomerService } from '../service/customer/customer.service';
import { BranchService } from '../service/branch/branch.service';

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
  constructor(public router:Router,
  private spinnerService: Ng4LoadingSpinnerService,
  private customerService: CustomerService,
  private branchService: BranchService) {
    super(router);
  }

  @ViewChild('audioUpload')
  private audioElement : any;
  private CustomerId: any;
  private BranchId: any;
  private AudioFile: any;
  private ButtonDisabled: boolean = true;
  private Customers: any = [];
  private Branches: any = [];
  
  private customer = new FormControl('customer', [Validators.required]);
  private branch = new FormControl('branch', [Validators.required]);
  private file = new FormControl('file',[Validators.required]);

  ngOnInit() {
    this.LoadCustomers();
  }

  Upload(){
    this.spinnerService.show();
    let reader = new FileReader();
    const formData: any = new FormData();
    formData.append('audio', this.AudioFile, this.AudioFile.name);      
    this.branchService.InsertAudioByBranch(this.BranchId, formData)
      .subscribe(message => 
      {        
        this.audioElement.nativeElement.value = "";                    
        this.customer.reset();
        this.Branches = [];
        this.branch.reset();
      }, err => 
      {
        console.log(err)
      }, () => {
        this.spinnerService.hide();
      });
  }

  onFileChange(event){    
    if(event.target.files && event.target.files.length > 0){
      this.AudioFile=event.target.files[0];
      this.ButtonDisabled = false;          
    }
  }

  LoadCustomers(){
    this.spinnerService.show();
     this.Customers.push({CustomerId: "", Description:"-- Select Customer --"});
     this.customerService.GetCustomers().subscribe(
       data => {
         if(data.length > 0){
          data.forEach(element => {
            this.Customers.push({CustomerId: element.CustomerId, Description: element.Description});
          });
         }          
       },
       err => {
          console.log(err);
       }, () => {
        this.spinnerService.hide();
       }
     ); 
  }

  LoadBranches(){
    this.spinnerService.show();
    this.branchService.GetBranchesByCustomer(this.CustomerId).subscribe(
      data => {
        this.Branches = data;
      },
      err => {
        console.log(err);
      }, () => {
        this.spinnerService.hide();
      }
    );
  }

}
