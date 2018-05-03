import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  IsLoggedIn() {
    return !localStorage.getItem('LoggedInUserData') ? false : true;
  }

  GetUserName() {
    if(localStorage.getItem('LoggedInUserData')){
      return this.GetUserData().Result.Name;
    }
  }

  GetUserRole() {
    if(localStorage.getItem('LoggedInUserData')){
      return this.GetUserData().Result.UserRole;
    }
  }

  GetUserData() {
     var UserData = localStorage.getItem('LoggedInUserData');
     return JSON.parse(UserData);
  }

}
