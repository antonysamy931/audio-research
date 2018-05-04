import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { Uri } from '../class/uri';

@Injectable()
export class UserService {  

  constructor(private http: HttpClient) { }

  Url : any = Uri;

  public authenticateUser(username, password): Observable<any> {
    return this.http.post(this.Url.LoginUri, {UserName : username, Password : password});
  }

  public getotherusers():Observable<any>{
    return this.http.get('/api/v1/getotherusers');
  }
}
