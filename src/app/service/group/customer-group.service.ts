import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';

import { Uri } from '../../class/uri';

@Injectable()
export class CustomerGroupService {

  constructor(private http: HttpClient) { }

  private Url: Uri = new Uri();

  GetCustomerGroups(CustomerId) : Observable<any>{
    return this.http.get(`${this.Url.GetCustomerGroups}?CustomerId=${CustomerId}`);
  }

  AddCustomerGroup(data) : Observable<any>{
    return this.http.post(this.Url.InsertCustomerGroup, data);
  }

  DeleteCustomerGroup(ID) : Observable<any>{
    return this.http.post(this.Url.DeleteCustomerGroup,{ID: ID});
  }

  DeleteCustomerGroupBranch(GroupId, BranchId): Observable<any>{
    return this.http.post(this.Url.DeleteCustomerGroupBranch,{ID: GroupId,BranchId: BranchId});
  }

  AddBranchToCustomerGroup(GroupId, BranchId): Observable<any>{
    return this.http.post(this.Url.CustomerGroupAddBranch,{GroupId: GroupId,BranchId: BranchId});
  }

  GroupExistForCustomer(CustomerId: string, Name: string): Observable<any>{
    return this.http.post(this.Url.CustomerGroupNameExist,{Name: Name, CustomerId: CustomerId});
  }

  GroupNameUpdateExistForCustomer(CustomerId: string, Name: string, GroupId: string): Observable<any>{
    return this.http.post(this.Url.CustomerGroupNameExistUpdate,{Name: Name, CustomerId: CustomerId, GroupId: GroupId});
  }

  GetCustomerMappedBranches(CustomerId: string): Observable<any>{
    return this.http.post(this.Url.GetCustomerMappedBranches,{CustomerId : CustomerId});
  }

  GetGroupMappedBranches(GroupId: string): Observable<any>{
    return this.http.post(this.Url.GetGroupMappedBranches,{GroupId : GroupId});
  }
}
