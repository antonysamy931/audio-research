import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from '../service/user.service';

import { Login } from '../class/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('username', [Validators.required, Validators.email]);
  password = new FormControl('password', [Validators.required]);

  constructor(private userService: UserService, private router: Router) { }

  loginUser: Login = {
    UserName : "",
    Password : ""
  };  

  ngOnInit() {    
  }
  
  getEmailErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }
    
  Login(){
    this.userService.authenticateUser(this.loginUser.UserName,this.loginUser.Password)
    .subscribe(
      data => {
        // var User = JSON.parse(data);
        localStorage.setItem('UserId',data.ID);
        localStorage.setItem('UserRole',data.Role);
        localStorage.setItem('Name',data.Name);       
        this.router.navigateByUrl('/dashboard'); 
      },
      err => {
        console.log(err);
      });
  }
}
