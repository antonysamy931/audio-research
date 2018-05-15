import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { CustomerService } from "../../service/customer/customer.service";

export function IsCustomerNameExistValidator(customerservice: CustomerService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return customerservice.IsCustomerExist(control.value).map(
      data => {
        return data ? {"hasnameexist": true} : null;
      }
    );
  };
}