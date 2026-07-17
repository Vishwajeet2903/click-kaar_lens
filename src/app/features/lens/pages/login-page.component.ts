import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LensSeoService } from '../../../core/services/lens-seo.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="sub-hero"><h1>Login</h1><p>Access your Click-Kaar Lens account and manage shoot enquiries.</p></section>
    <section class="page-section auth-section">
      <div class="auth-layout">
        <div class="auth-visual" aria-hidden="true">
          <img src="assets/images/lens/why-choose-us-transparent.png" alt="" />
        </div>
        <form class="lens-form auth-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <h2>LOGIN</h2>
          <p>Sign in with your registered email address.</p>
          <label>Email address <input formControlName="email" type="email" autocomplete="email" maxlength="120" /></label>
          <label>Password <input formControlName="password" type="password" autocomplete="current-password" maxlength="80" /></label>
          <label class="check"><input type="checkbox" formControlName="remember" /> Keep me signed in</label>
          <div class="errors" *ngIf="form.touched && form.invalid">
            <span *ngIf="form.controls.email.touched && form.controls.email.invalid">Enter a valid email address.</span>
            <span *ngIf="form.controls.password.touched && form.controls.password.invalid">Password is required.</span>
          </div>
          <p class="form-status success" *ngIf="success">{{ success }}</p>
          <button class="btn primary" type="submit" [disabled]="form.invalid">{{ success ? 'Ready' : 'Login' }}</button>
          <p class="auth-switch">New to Click-Kaar Lens? <a routerLink="/register">Register</a></p>
          <a class="auth-link" routerLink="/contact">Need help accessing your account?</a>
        </form>
      </div>
    </section>
  `
})
export class LoginPageComponent implements OnInit {
  success = '';
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [true]
  });

  constructor(private readonly fb: FormBuilder, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Login | Click-Kaar Lens', description: 'Login to your Click-Kaar Lens account.' });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.success = 'Login form is ready to connect to authentication.';
  }
}
