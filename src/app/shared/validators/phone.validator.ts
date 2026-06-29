import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const SENEGAL_LOCAL_PHONE_PATTERN = /^(7[05678])\d{7}$/;

/** Valide un numéro de téléphone sénégalais local à 9 chiffres (ex: 771234567). */
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '').toString().trim();
    if (!value) {
      return null;
    }
    return SENEGAL_LOCAL_PHONE_PATTERN.test(value) ? null : { invalidPhone: true };
  };
}
