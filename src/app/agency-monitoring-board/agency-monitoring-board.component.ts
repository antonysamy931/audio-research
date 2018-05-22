import { Component, OnInit } from '@angular/core';
import { Common } from '../class/common';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer/customer.service';
import { BranchService } from '../service/branch/branch.service';
import { AuthService } from '../service/auth/auth.service';
import { SocketCustomerService } from '../service/socket/customer/socket-customer.service';

@Component({
  selector: 'app-agency-monitoring-board',
  templateUrl: './agency-monitoring-board.component.html',
  styleUrls: ['./agency-monitoring-board.component.css']
})
export class AgencyMonitoringBoardComponent extends Common implements OnInit {

  private Customers:any=[];
  private Socket: any;

  constructor(public router: Router, private customerservice: CustomerService, 
    private branchservice: BranchService, private authservice: AuthService,
    private customersocketservice: SocketCustomerService) {
    super(router);
    this.Socket = this.socketinit.GetSocket();
   }

  ngOnInit() {
    this.LoadCustomers();
    
    setInterval(() => {
      this.customersocketservice.GetCustomer(this.Socket);
    }, 5000);

    this.Socket.on('GetCustomers',(data) => { 
      this.Customers.forEach(customer => {
        if(data.find(x => x.CustomerId == customer.CustomerId)){
          customer.Active = true;
        }else{
          customer.Active = false;
        }
      });   
    });
  }

  LoadCustomers(){
    this.customerservice.GetCustomers().subscribe(
      data => { this.Customers = data;},
      err => {
        console.log(err);
      },()=>{        
      }
    );
  }

}
