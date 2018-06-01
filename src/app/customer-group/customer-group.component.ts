import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerGroupService } from '../service/group/customer-group.service';
import { BranchService } from '../service/branch/branch.service';
import { FormControl, Validators } from '@angular/forms';
import { IsGroupNameExistValidator } from '../class/validators/is-group-name-exist-validator';
import { isNull } from 'util';

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.css']
})
export class CustomerGroupComponent extends Common implements OnInit, AfterViewInit {

  constructor(public router: Router, private activatedrouter: ActivatedRoute,
  private customergroupservice: CustomerGroupService, private branchservice: BranchService) {
    super(router);
  }

  Groups: any = [];
  Group: any = {};

  Branches: any = [];

  CustomerId: string;

  SelectedGroup:number = -1;

  CustomerMappedBranches:any = [];

  SelectedGroupId: string;

  SelectedGroupBranches: any = [];

  name = new FormControl('name', Validators.required,
    [IsGroupNameExistValidator(this.customergroupservice,this.activatedrouter)]);

  ngOnInit() {
    this.activatedrouter.params.subscribe(params => {
       this.CustomerId = params['id'];
    });
    this.LoadCustomerGroups();    
    this.LoadCustomerMappedBranches();
  }

  ngAfterViewInit(){    
  }

  LoadCustomerGroups(){
    this.customergroupservice.GetCustomerGroups(this.CustomerId).subscribe(data => {
      this.Groups = data;
    }, err => {
      console.log(err);
    })
  }

  LoadCustomerBranches(){
    this.branchservice.GetBranchesByCustomer(this.CustomerId).subscribe(data => {
      this.Branches = [];
      data.forEach(element => {
        if(this.CustomerMappedBranches.indexOf(element.BranchId) === -1){
          if(this.Branches.indexOf(element.BranchId) === -1){
            this.Branches.push(element);
          }
        }
      });      
    }, err => {
      console.log(err); 
    })
  }

  Save(){
    this.Group.CustomerId = this.CustomerId;
    this.Group.BranchIds = [];
    this.customergroupservice.AddCustomerGroup(this.Group).subscribe(data => {      
    }, err => {
      console.log(err);
    },() => {
      this.Group = {};
      this.name.reset();
      this.LoadCustomerGroups();
    })        
  }

  LoadCustomerMappedBranches(){
    this.customergroupservice.GetCustomerMappedBranches(this.CustomerId).subscribe(data => {
      this.CustomerMappedBranches = [];
      data.forEach(element => {
        this.CustomerMappedBranches.push(element.BranchId);
      });      
    }, err => {
      console.log(err);
    }, () => {     
      this.LoadCustomerBranches(); 
    });
  }

  LoadGroupedBranches(){    
    if(!isNull(this.SelectedGroupId) && this.SelectedGroupId !== ""){
      this.customergroupservice.GetGroupMappedBranches(this.SelectedGroupId).subscribe(data => {
        this.SelectedGroupBranches = data;
      }, err => {
        console.log(err);
      });
    }else{
      this.SelectedGroupBranches = [];
    }
  }

  RemoveBranchFromGroup(BranchId: string){
    this.customergroupservice.DeleteCustomerGroupBranch(this.SelectedGroupId,BranchId).subscribe(data => {
      this.LoadCustomerMappedBranches();
      this.LoadGroupedBranches();
    }, err => {
      console.log(err);
    });    
  }

  SetActive(index: number, group: any){
    this.SelectedGroup = index;
    this.SelectedGroupId = group.ID;
    this.LoadCustomerMappedBranches();
    this.LoadGroupedBranches();
  }

  RemoveGroup(group: any){
    this.customergroupservice.DeleteCustomerGroup(group.ID).subscribe(data => {
      this.LoadCustomerGroups();
      this.LoadCustomerMappedBranches();
      this.LoadGroupedBranches();
    }, err => {
      console.log(err);
    }, () => {
      if(this.SelectedGroupId == group.ID){
        this.SelectedGroup = -1;
        this.SelectedGroupId = null;
      }
    });
    //console.log(group);
  }

  ReleaseDrop(event: any){    
    console.log("drop " + event);
  }

  AddDropItem(event: any){
    this.customergroupservice.AddBranchToCustomerGroup(this.SelectedGroupId,event.BranchId).subscribe(data => {
      this.LoadCustomerMappedBranches();
      this.LoadGroupedBranches();
    },err => {
      console.log(err);
    });
  }

}
