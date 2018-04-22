import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AudioServiceService {
  private baseUrl = '/api';
  constructor(private http: HttpClient) { 
    
  }
  public getMessage() : Observable<string> {
    return this.http.get<string>(this.baseUrl);
  }
  public upload(formData: FormData) : Observable<any> {
    return this.http.post(this.baseUrl+'/upload',formData)
  }
}
