import { FormControl } from '@angular/forms';
import { futureOrTodayValidator, indianMobileReadyValidator } from './validators';

describe('Lens validators', () => {
  it('accepts Indian mobile numbers and keeps room for country code', () => {
    const control = new FormControl('+91 9876543210');
    expect(indianMobileReadyValidator()(control)).toBeNull();
  });

  it('rejects invalid mobile numbers', () => {
    const control = new FormControl('12345');
    expect(indianMobileReadyValidator()(control)).toEqual({ phone: true });
  });

  it('rejects dates before today', () => {
    const control = new FormControl('2000-01-01');
    expect(futureOrTodayValidator()(control)).toEqual({ pastDate: true });
  });
});
