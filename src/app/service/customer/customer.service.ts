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
    return this.http.get(this.Url.GetAllCustomers);
  }

  public GetCustomer(id: string): Observable<any>{
    return this.http.get(this.Url.GetCustomer+"?CustomerId="+id);
  }

  public CreateCustomer(data: any): Observable<any>{
    return this.http.post(this.Url.CreateCustomer,data);
  }

  public UpdateCustomer(data: any): Observable<any>{
    return this.http.post(this.Url.UpdateCustomer,data);
  }

}
