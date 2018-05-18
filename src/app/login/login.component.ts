import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { AuthService } from '../service/auth/auth.service';
import { CustomerService } from '../service/customer/customer.service';
import { SocketInitService } from '../service/socket/socket-init.service';

import { Login } from '../class/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide : boolean = true;
  private ValidationSummary: boolean = false;
  username = new FormControl('username', [Validators.required]);
  password = new FormControl('password', [Validators.required]);
  customer = new FormControl('customer', [Validators.required]);

  constructor(private userService: UserService, private router: Router,
  private authenticationService: AuthenticationService,
  private spinnerService: Ng4LoadingSpinnerService,
  private authService: AuthService,
  private customerService: CustomerService) { }

  private socketinitservice: SocketInitService = new SocketInitService();

  private Customers:any[] = [];

  private ValidationSummaryMessage:string = "Username or Password provide incorrect.";

  loginUser: Login = {
    UserName : "",
    Password : "",
    CustomerId : ""
  };  

  ngOnInit() {
    this.Customers.push({CustomerId: "",Description:"-- Select Customer --"});
    this.Customers.push({CustomerId: "AgencyUsers",Description:"Agency Users"});
    
    this.LoadCustomers();
  }

  ngAfterViewInit(){    
  }

  OnChangeInput() {
    this.ValidationSummary = false;    
  }
  
  getEmailErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }
    
  Login(){
    this.spinnerService.show();
    this.ValidationSummary = false;
    this.authenticationService.authenticateUser(this.loginUser)
    .subscribe(
      data => {        
        if(data !== null){     
          localStorage.setItem('LoggedInUserData', JSON.stringify(data));  
          if(this.authService.IsLoggedIn() && this.authService.IsAgencyAdmin()){
            this.router.navigateByUrl('/dashboard');
          }else if(this.authService.IsLoggedIn() && this.authService.IsBranchUser()){
            this.router.navigateByUrl('/branch-audio-listen/'+this.authService.GetBranchId()+'/'+this.authService.GetCustomerId());
          }
        }else{
          this.ValidationSummary = true;
        }
        this.socketinitservice.LogIn();
        this.spinnerService.hide();
      },
      err => {
        this.ValidationSummary = true;
        this.ValidationSummaryMessage = err.error;
        console.log(err);
        this.spinnerService.hide();
      });
  }

  LoadCustomers(){
    this.spinnerService.show();
    this.customerService.GetAllCustomers().subscribe(
      data => {
        data.forEach(element => {
          this.Customers.push({CustomerId: element.CustomerId, Description: element.Description});
        });
        this.spinnerService.hide();
      },
      err => {console.log(err)}
    );
  }
}
