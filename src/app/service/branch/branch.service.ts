import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { Uri } from '../../class/uri';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class BranchService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  Url : Uri = new Uri();

  private GetOptions() {
    let headers = new HttpHeaders().set('Authorization',this.authService.GetAuthToken());
    let options = {
      headers: headers
    }
    return options;
  }

  public GetAllBranches():Observable<any>{    
    return this.http.get(this.Url.GetAllBranches,this.GetOptions());
  }

  public GetBranchById(id: string):Observable<any>{
    return this.http.get(this.Url.GetBrach+"?BranchId="+id,this.GetOptions());
  }

  public GetBranchesByCustomer(id: string): Observable<any>{    
    return this.http.get(this.Url.GetCustomerBranches+"?CustomerId="+id,this.GetOptions());
  }

  public InsertAudioByBranch(id: string, file: any): Observable<any>{
    return this.http.post(this.Url.InsertAudio+"?Id="+id,file,this.GetOptions());
  }

  public GetAudioByBranchId(id: string): Observable<any>{
    return this.http.get(this.Url.GetAudioByBranch+"?BranchId="+id,this.GetOptions());
  }

  public getPlayLists() : Observable<any>{
    return this.http.get('/api/v1/play/getfiles',this.GetOptions());
  }

}
