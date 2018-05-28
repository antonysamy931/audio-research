import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { Uri } from '../../../class/uri';

import { AuthService } from '../../auth/auth.service';
import { AddUser } from '../../../class/user';

@Injectable()
export class CustomerUserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  Url : Uri = new Uri();

  AddCustomerUser(data: AddUser): Observable<any>{
    return this.http.post(this.Url.AddCustomerUser, data);
  }

  GetCustomerUsers(customerid: string): Observable<any>{
    return this.http.get(this.Url.GetCustomerUsers+"?CustomerId="+customerid);
  }

  GetUserById(userid: string): Observable<any>{
    return this.http.get(this.Url.GetUserById+"?UserId="+userid);
  }

  UpdateCustomerUser(data:any): Observable<any>{
    return this.http.post(this.Url.UpdateCustomerUser,data);
  }

}
