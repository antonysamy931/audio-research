import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AudioServiceService {
  private baseUrl = '/api';
  constructor(private http: HttpClient) { 
    
  }
  getMessage() : Observable<string> {
    return this.http.get<string>(this.baseUrl);
  }
}
