import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LensSeoService } from '../../../core/services/lens-seo.service';
import { indianMobileReadyValidator } from '../../../core/services/validators';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="sub-hero"><h1>Register</h1><p>Create your Click-Kaar Lens account.</p></section>
    <section class="page-section auth-section">
      <div class="auth-layout">
        <div class="auth-visual" aria-hidden="true">
          <img src="assets/images/lens/why-choose-us-transparent.png" alt="" />
        </div>
        <form class="lens-form auth-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <h2>REGISTER</h2>
          <p>Create an account to manage shoot enquiries and bookings.</p>
          <label>Full name <input formControlName="name" autocomplete="name" maxlength="80" /></label>
          <label>Phone number <input formControlName="phone" autocomplete="tel" maxlength="18" /></label>
          <label>Email address <input formControlName="email" type="email" autocomplete="email" maxlength="120" /></label>
          <label>Password <input formControlName="password" type="password" autocomplete="new-password" maxlength="80" /></label>
          <div class="errors" *ngIf="form.touched && form.invalid">
            <span *ngIf="form.controls.name.touched && form.controls.name.invalid">Full name is required.</span>
            <span *ngIf="form.controls.phone.touched && form.controls.phone.invalid">Enter a valid mobile number.</span>
            <span *ngIf="form.controls.email.touched && form.controls.email.invalid">Enter a valid email address.</span>
            <span *ngIf="form.controls.password.touched && form.controls.password.invalid">Password must be at least 6 characters.</span>
          </div>
          <p class="form-status success" *ngIf="success">{{ success }}</p>
          <button class="btn primary" type="submit" [disabled]="form.invalid">{{ success ? 'Ready' : 'Register' }}</button>
          <p class="auth-switch">Already have an account? <a routerLink="/login">Login</a></p>
        </form>
      </div>
    </section>
  `
})
export class RegisterPageComponent implements OnInit {
  success = '';
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, indianMobileReadyValidator()]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private readonly fb: FormBuilder, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Register | Click-Kaar Lens', description: 'Create a Click-Kaar Lens account.' });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.success = 'Register form is ready to connect to authentication.';
  }
}
