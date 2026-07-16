import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureOrTodayValidator(): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(control.value);
    return selected < today ? { pastDate: true } : null;
  };
}

export function indianMobileReadyValidator(): ValidatorFn {
  return (control: AbstractControl<string | null>): ValidationErrors | null => {
    const value = control.value?.trim();
    if (!value) {
      return null;
    }
    return /^(\+?\d{1,3}[- ]?)?[6-9]\d{9}$/.test(value) ? null : { phone: true };
  };
}
