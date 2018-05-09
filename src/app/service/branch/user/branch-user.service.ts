import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { Uri } from '../../../class/uri';

import { AuthService } from '../../auth/auth.service';
import { AddUser } from '../../../class/user';

@Injectable()
export class BranchUserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  Url : Uri = new Uri();

  public AddNewUser(user: AddUser): Observable<any>{
    return this.http.post(this.Url.AddBranchUser,user);
  }

  public GetUsers(branchId: string): Observable<any>{
    return this.http.get(this.Url.GetBranchUsers+"?BranchId="+branchId);
  }

  public GetUserById(Id: string): Observable<any>{
    return this.http.get(this.Url.GetUserById+"?UserId="+Id);
  }

  public UpdateUser(User: any): Observable<any>{
    return this.http.post(this.Url.UpdateUser,User);
  }
}
