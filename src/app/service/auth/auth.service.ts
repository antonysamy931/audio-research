import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  IsLoggedIn() {
    return localStorage.getItem('LoggedInUserData') ? true : false;
  }

  GetUserName() : string {
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.Name : "";    
  }

  GetLoggedInUserId() : string {
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.UserId : "";
  }

  GetUserRole() : string {
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.UserRole : "";    
  }

  IsAgencyAdmin() : boolean {
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.IsAgencyAdmin : false;
  }

  IsAgencyMember() : boolean {
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.IsAgencyMember : false;
  }

  IsCustomerUser() : boolean {
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.IsCustomerUser : false;
  }

  IsCustomerAdmin() : boolean {
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.IsCustomerAdmin : false;
  }

  IsCustomerMember() : boolean {
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.IsCustomerMember : false;
  }

  IsBranchUser() : boolean {
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.IsBranchUser : false;
  }

  GetAuthToken() : string {
    return localStorage.getItem('LoggedInUserData') ? 'bearer ' + this.GetUserData().Token : "";
  }

  GetCustomerId() : string{
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.CustomerId : "";
  }

  GetBranchId() : string{
    return localStorage.getItem('LoggedInUserData') ? this.GetUserData().Result.BranchId : "";
  }  

  GetRawToken(): string{
    return this.GetUserData().Token;
  }

  private GetUserData() : any {
     var UserData = localStorage.getItem('LoggedInUserData');
     return JSON.parse(UserData);
  }

}
