import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';

import { BranchUserService } from "../../service/branch/user/branch-user.service";

export function IsUserNameExistForCustomerValidator(branchuserservice: BranchUserService, route: ActivatedRoute): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {      
    return branchuserservice.CheckUsernameExistForUpdateUser(route.snapshot.params.id,control.value,route.snapshot.params.customerid).map(
      data => {
        return data ? {"hasnameexist": true} : null;
      }
    );
  };
}