import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AudioServiceService {
  private baseUrl = '/api';
  
  constructor(private http: HttpClient) { }
  
  public getMessage() : Observable<string> {
    return this.http.get<string>(this.baseUrl);
  }

  public upload(formData: FormData, Id: any) : Observable<any> {
    return this.http.post(this.baseUrl+'/upload?Id='+Id,formData)
  }

  public getPlayLists() : Observable<any>{
    return this.http.get(this.baseUrl+'/getfiles');
  }

  public getPlayFile(name: string) : Observable<any>{
    return this.http.get(this.baseUrl+'/getfile?name='+name);
  }

  public getfilesbyuser(Id: any) : Observable<any>{
    return this.http.get(this.baseUrl+'/getfilesbyuser?Id='+Id);
  }
}
