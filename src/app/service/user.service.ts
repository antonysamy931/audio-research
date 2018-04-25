import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private baseUrl = '/user';
  
  constructor(private http: HttpClient) { }

  public authenticateUser(username, password): Observable<any> {
    return this.http.get(this.baseUrl+'/authenticate?UserName='+username+'&Password='+password);
  }

}
