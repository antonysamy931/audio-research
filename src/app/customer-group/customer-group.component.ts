import { Component, OnInit } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerGroupService } from '../service/group/customer-group.service';
import { BranchService } from '../service/branch/branch.service';
import { FormControl, Validators } from '@angular/forms';
import { IsGroupNameExistValidator } from '../class/validators/is-group-name-exist-validator';

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.css']
})
export class CustomerGroupComponent extends Common implements OnInit {

  constructor(public router: Router, private activatedrouter: ActivatedRoute,
  private customergroupservice: CustomerGroupService, private branchservice: BranchService) {
    super(router);
  }

  Groups: any = [];
  Group: any = {};

  Branches: any = [];

  CustomerId: string;

  SelectedGroup:number = 0;

  name = new FormControl('name', Validators.required,
    [IsGroupNameExistValidator(this.customergroupservice,this.activatedrouter)]);

  ngOnInit() {
    this.activatedrouter.params.subscribe(params => {
       this.CustomerId = params['id'];
    });
    this.LoadCustomerGroups();
    this.LoadCustomerBranches();
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
      this.Branches = data;   
    }, err => {
      console.log(err); 
    })
  }

  Save(){
    this.Group.CustomerId = this.CustomerId;
    this.Group.BranchIds = [];
    this.customergroupservice.AddCustomerGroup(this.Group).subscribe(data => {
      console.log(data);      
    }, err => {
      console.log(err);
    },() => {
      this.Group = {};
      this.name.reset();
      this.LoadCustomerGroups();
    })        
  }

  SetActive(index: number){
    this.SelectedGroup = index;
  }

  GetBranchName(branchid){
    return this.Branches.find(x => x.BranchId).NAME;
  }

  ReleaseDrop(event: any){    
    console.log("drop " + event);
  }

  AddDropItem(event: any){
    console.log("drag " + event);
  }

}
