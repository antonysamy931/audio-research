import { Component, OnInit } from '@angular/core';
import { Common } from '../class/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from '../service/branch/branch.service';
import { SocketCustomerService } from '../service/socket/customer/socket-customer.service';
import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-monitoring-customer-branches',
  templateUrl: './monitoring-customer-branches.component.html',
  styleUrls: ['./monitoring-customer-branches.component.css']
})
export class MonitoringCustomerBranchesComponent extends Common implements OnInit {

  constructor(public router: Router, private activatedrouter: ActivatedRoute,
  private branchservice: BranchService, private socketcustomerservice: SocketCustomerService,
  private customerservice: CustomerService) {
    super(router);
    this.Socket = this.socketinit.GetSocket();
  }

  private CustomerId:string;
  private Branches:any = [];
  private Socket: any;
  private Customer: any = {};

  ngOnInit() {
    this.activatedrouter.params.subscribe(param => {
      this.CustomerId = param['id'];
      this.LoadCustomerBranches();
      this.LoadCustomerDetail();
    });
    
    setInterval(() => {
      this.socketcustomerservice.GetCustomerBranches(this.Socket, this.CustomerId);
    }, 1000);
    
    this.Socket.on('GetCustomerBranches',(data) => {
      this.Branches.forEach(branch => {
        if(data && data.find(x => x.BranchId == branch.BranchId)){
          branch.Active = true;
        }else{
          branch.Active = false;
        }
      });
    });
  }

  LoadCustomerBranches(){
    this.branchservice.GetBranchesByCustomer(this.CustomerId).subscribe(data => {
      this.Branches = data;   
    }, err => {
      console.log(err); 
    });
  }

  LoadCustomerDetail(){
    this.customerservice.GetCustomer(this.CustomerId).subscribe(data => {
      this.Customer = data;
    }, err => {
      console.log(err);
    });
  }

}
