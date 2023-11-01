import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const diffLocValidator: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const locTo = c.get('locTo');
  const locFrom = c.get('locFrom');
  if (!locTo.value || !locFrom.value) { return null;}

  return locTo.value == locFrom.value ? { invalidLocs: true } : null;
}

@Directive({
  selector: '[appDiffLoc]'
})
export class DiffLocDirective {

  constructor() { }

}
