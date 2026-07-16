import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LensShellComponent } from './lens-shell.component';

describe('LensShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [LensShellComponent], providers: [provideRouter([])] }).compileComponents();
  });

  it('opens and closes the mobile menu', () => {
    const fixture = TestBed.createComponent(LensShellComponent);
    fixture.componentInstance.toggleMobile();
    expect(fixture.componentInstance.mobileOpen).toBeTrue();
    fixture.componentInstance.close();
    expect(fixture.componentInstance.mobileOpen).toBeFalse();
  });
});
