import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function atLeastOneControlValid(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const controls = (formGroup as FormGroup).controls;
    const valid = Object.keys(controls).some(
      (key) => controls[key].value === true
    );

    return valid ? null : { atLeastOneControlValid: true };
  };
}
