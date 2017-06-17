import { FormControl, ValidationErrors } from '@angular/forms';
export class ShoppingEditValidators {
  static postiveAmount(formControl: FormControl): ValidationErrors {
    if (formControl.value <= 0) {
      return {'nonPostiveAmount': true};
    }
    return null;
  }
}
