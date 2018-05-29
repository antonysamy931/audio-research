import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { CustomerGroupService } from '../../service/group/customer-group.service';
import { ActivatedRoute } from '@angular/router';

export function IsGroupNameExistValidator(customergroupservice: CustomerGroupService, 
    route: ActivatedRoute) {
    return(control: AbstractControl): Promise<ValidationErrors | null> 
    | Observable<ValidationErrors | null> => {
        return customergroupservice.GroupExistForCustomer(route.snapshot.params.id,control.value)
        .map(data => {
            return data ? {"hasnameexist": true} : null;
        });
    }
}{
}
