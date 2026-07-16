import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { JoinRole } from '../../../core/models/lens.models';
import { LensLeadService } from '../../../core/services/lens-lead.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';
import { indianMobileReadyValidator } from '../../../core/services/validators';
import { joinRoleLabels } from '../data/lens-content.data';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="sub-hero"><h1>Join as {{ label }}</h1><p>Share your profile and our onboarding team will review the fit.</p></section>
    <section class="page-section form-section">
      <form class="lens-form" [formGroup]="form" (ngSubmit)="submit()">
        <div class="form-grid">
          <label>Full name <input formControlName="fullName" maxlength="80" /></label>
          <label>Phone <input formControlName="phone" maxlength="18" /></label>
          <label>Email <input formControlName="email" type="email" /></label>
          <label>City <input formControlName="city" /></label>
          <label>Experience in years <input formControlName="experience" type="number" min="0" /></label>
          <label>Specializations <input formControlName="specializations" /></label>
          <label>Equipment / tools <input formControlName="equipment" /></label>
          <label>Portfolio URL <input formControlName="portfolioUrl" type="url" /></label>
          <label>Instagram or social profile <input formControlName="socialProfile" /></label>
          <label>Service areas <input formControlName="serviceAreas" /></label>
          <label>Availability <input formControlName="availability" /></label>
          <label>Expected rate or note <input formControlName="pricingNote" /></label>
        </div>
        <label>About you <textarea formControlName="about" maxlength="700"></textarea></label>
        <label>Portfolio files for future upload <input type="file" multiple accept="image/*,application/pdf" (change)="validateFiles($event)" /></label>
        <p class="form-status error" *ngIf="fileError">{{ fileError }}</p>
        <label class="check"><input type="checkbox" formControlName="consent" /> I accept the partner onboarding terms.</label>
        <p class="form-status success" *ngIf="success">{{ success }}</p>
        <p class="form-status error" *ngIf="error">{{ error }}</p>
        <button class="btn primary" [disabled]="form.invalid || submitting || !!fileError">{{ submitting ? 'Submitting...' : 'Submit profile' }}</button>
      </form>
    </section>
  `
})
export class JoinPageComponent implements OnInit {
  role: JoinRole = 'photographer';
  label = joinRoleLabels.photographer;
  submitting = false;
  success = '';
  error = '';
  fileError = '';
  files: string[] = [];
  form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    phone: ['', [Validators.required, indianMobileReadyValidator()]],
    email: ['', [Validators.required, Validators.email]],
    city: ['', Validators.required],
    experience: [0],
    specializations: [''],
    equipment: [''],
    portfolioUrl: [''],
    socialProfile: [''],
    serviceAreas: [''],
    availability: [''],
    pricingNote: [''],
    about: ['', [Validators.required, Validators.maxLength(700)]],
    consent: [false, Validators.requiredTrue]
  });

  constructor(private readonly fb: FormBuilder, private readonly route: ActivatedRoute, private readonly leads: LensLeadService, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.role = (this.route.snapshot.data['role'] as JoinRole) || 'partner';
    this.label = joinRoleLabels[this.role];
    this.seo.update({ title: `Join as ${this.label} | Click-Kaar Lens`, description: `Apply to join Click-Kaar Lens as ${this.label}.` });
  }

  validateFiles(event: Event): void {
    const files = Array.from((event.target as HTMLInputElement).files || []);
    this.fileError = '';
    if (files.length > 6) this.fileError = 'Upload up to 6 files.';
    if (files.some((file) => file.size > 5 * 1024 * 1024)) this.fileError = 'Each file must be under 5 MB.';
    if (files.some((file) => !file.type.startsWith('image/') && file.type !== 'application/pdf')) this.fileError = 'Only image and PDF files are allowed.';
    this.files = files.map((file) => file.name);
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.fileError || this.submitting) return;
    this.submitting = true;
    this.leads.submitPartner(this.role, { role: this.role, ...this.form.getRawValue(), files: this.files }).pipe(finalize(() => (this.submitting = false))).subscribe({
      next: () => (this.success = 'Profile received. The Click-Kaar Lens team will review it shortly.'),
      error: () => (this.error = 'We could not submit the profile right now.')
    });
  }
}
