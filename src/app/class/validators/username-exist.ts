import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';

import { BranchUserService } from "../../service/branch/user/branch-user.service";

export function IsUserNameExistForCustomerValidator(branchuserservice: BranchUserService, route: ActivatedRoute): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {      
    return branchuserservice.CheckUserExist(route.snapshot.params.customerid, control.value).map(
      data => {
        return data ? {"hasnameexist": true} : null;
      }
    );
  };
}