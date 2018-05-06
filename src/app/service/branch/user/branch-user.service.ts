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

  private GetOptions() {
    let headers = new HttpHeaders().set('Authorization',this.authService.GetAuthToken());
    let options = {
      headers: headers
    }
    return options;
  }

  public AddNewUser(user: AddUser): Observable<any>{
    return this.http.post(this.Url.AddBranchUser,user,this.GetOptions());
  }

  public GetUsers(branchId: string): Observable<any>{
    return this.http.get(this.Url.GetBranchUsers+"?BranchId="+branchId,this.GetOptions());
  }

}
