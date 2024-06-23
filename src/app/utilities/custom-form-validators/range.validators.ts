import { AbstractControl, ValidatorFn } from '@angular/forms';

export function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (value !== null && (value < min || value > max)) {
      return { ageRange: { min, max } };
    }
    return null;
  };
}
