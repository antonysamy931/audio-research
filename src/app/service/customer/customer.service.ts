import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { Uri } from '../../class/uri';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  Url : Uri = new Uri();

  public GetCustomers(): Observable<any>{
    let headers = new HttpHeaders().set('Authorization',this.authService.GetAuthToken());
    let options = {
      headers: headers
    }    
    return this.http.get(this.Url.GetAllCustomers, options);
  }

}
