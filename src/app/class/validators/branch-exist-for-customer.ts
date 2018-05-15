import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router } from '@angular/router';

import { BranchService } from "../../service/branch/branch.service";

export function IsBranchExistForCustomerValidator(branchservice: BranchService, route: ActivatedRoute): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {      
    return branchservice.IsBranchExist(route.snapshot.params.id, control.value).map(
      data => {
        return data ? {"hasnameexist": true} : null;
      }
    );
  };
}