import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { Uri } from '../../class/uri';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class BranchService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  Url : Uri = new Uri();

  public GetAllBranches():Observable<any>{    
    return this.http.get(this.Url.GetAllBranches);
  }

  public GetBranchById(id: string):Observable<any>{
    return this.http.get(this.Url.GetBrach+"?BranchId="+id);
  }

  public GetBranchesByCustomer(id: string): Observable<any>{    
    return this.http.get(this.Url.GetCustomerBranches+"?CustomerId="+id);
  }

  public InsertAudioByBranch(id: string, file: any): Observable<any>{
    return this.http.post(this.Url.InsertAudio+"?Id="+id,file);
  }

  public GetAudioByBranchId(id: string): Observable<any>{
    return this.http.get(this.Url.GetAudioByBranch+"?BranchId="+id);
  }

  public getPlayLists() : Observable<any>{
    return this.http.get('/api/v1/play/getfiles');
  }

}
