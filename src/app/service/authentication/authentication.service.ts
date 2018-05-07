import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { Uri } from '../../class/uri';
import { Login } from '../../class/login';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  Url : any = new Uri();

  public authenticateUser(login: Login): Observable<any> {
    return this.http.post(this.Url.LoginUri, login);
  }

  public logoff() {    
    let data = this.authService.GetUserName();
    this.http.post(this.Url.LogOutUri,data);
  }
}
