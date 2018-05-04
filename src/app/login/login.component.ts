import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication/authentication.service';

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

  constructor(private userService: UserService, private router: Router,
  private authenticationService: AuthenticationService,
  private spinnerService: Ng4LoadingSpinnerService) { }

  loginUser: Login = {
    UserName : "",
    Password : ""
  };  

  ngOnInit() {
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
          this.router.navigateByUrl('/dashboard'); 
        }else{
          this.ValidationSummary = true;
        }
        this.spinnerService.hide();
      },
      err => {
        console.log(err);
      });
  }
}
