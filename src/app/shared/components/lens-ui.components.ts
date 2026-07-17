import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { LensGalleryItem, LensStat } from '../../core/models/lens.models';
import { LensAnalyticsService } from '../../core/services/lens-analytics.service';
import { LensLeadService } from '../../core/services/lens-lead.service';
import { LensWhatsAppService } from '../../core/services/lens-whatsapp.service';
import { futureOrTodayValidator, indianMobileReadyValidator } from '../../core/services/validators';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `
    <div class="section-heading">
      <p *ngIf="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <span *ngIf="text">{{ text }}</span>
    </div>
  `,
  imports: [CommonModule]
})
export class SectionHeadingComponent {
  @Input() eyebrow = '';
  @Input({ required: true }) title = '';
  @Input() text = '';
}

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a class="image-card" [routerLink]="link" (click)="analytics.track('category_opened', { title })">
      <img [src]="image" [alt]="alt || title" loading="lazy" width="520" height="390" (error)="useFallback($event)" />
      <span class="card-chip">{{ chip }}</span>
      <strong>{{ title }}</strong>
      <p>{{ text }}</p>
      <em>{{ cta }}</em>
    </a>
  `
})
export class ImageCardComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) text = '';
  @Input({ required: true }) image = '';
  @Input({ required: true }) link = '';
  @Input() alt = '';
  @Input() chip = 'Lens';
  @Input() cta = 'Explore';

  constructor(readonly analytics: LensAnalyticsService) {}

  useFallback(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://picsum.photos/seed/clickkaar-lens-fallback/1200/820';
  }
}

@Component({
  selector: 'app-stats-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="stats-band" #statsHost aria-label="Click-Kaar Lens trust statistics">
      <div *ngFor="let stat of stats" class="stat">
        <strong>{{ displayValues[stat.label] || 0 }}{{ stat.suffix || '' }}</strong>
        <span>{{ stat.label }}</span>
      </div>
    </section>
  `
})
export class StatsCounterComponent implements OnInit, OnDestroy {
  @Input({ required: true }) stats: LensStat[] = [];
  @ViewChild('statsHost', { static: true }) statsHost!: ElementRef<HTMLElement>;
  displayValues: Record<string, number> = {};
  private observer?: IntersectionObserver;
  private hasAnimated = false;

  ngOnInit(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.stats.forEach((stat) => (this.displayValues[stat.label] = stat.value));
      return;
    }
    this.observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && !this.hasAnimated) {
        this.hasAnimated = true;
        this.animate();
        this.observer?.disconnect();
      }
    }, { threshold: 0.35 });
    this.observer.observe(this.statsHost.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animate(): void {
    const duration = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      this.stats.forEach((stat) => (this.displayValues[stat.label] = Math.floor(stat.value * progress)));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }
}

@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filter-row" role="group" aria-label="Portfolio filters">
      <button type="button" [class.active]="active === 'All'" (click)="active = 'All'">All</button>
      <button type="button" *ngFor="let category of categories" [class.active]="active === category" (click)="active = category">{{ category }}</button>
    </div>
    <div class="gallery-grid" *ngIf="filtered.length; else emptyGallery">
      <button type="button" class="gallery-card" *ngFor="let item of filtered" (click)="openItem = item" [attr.aria-label]="'Open ' + item.title">
        <img [src]="item.image" [alt]="item.alt" loading="lazy" width="420" height="320" (error)="useFallback($event)" />
        <span>{{ item.category }}</span>
        <strong>{{ item.title }}</strong>
      </button>
    </div>
    <ng-template #emptyGallery><p class="empty-state">No gallery items match this filter.</p></ng-template>
    <div class="modal-backdrop" *ngIf="openItem" (click)="openItem = undefined">
      <div class="modal" role="dialog" aria-modal="true" tabindex="-1" (click)="$event.stopPropagation()">
        <button class="icon-btn close" type="button" aria-label="Close preview" (click)="openItem = undefined">x</button>
        <img [src]="openItem.image" [alt]="openItem.alt" width="760" height="520" />
        <h3>{{ openItem.title }}</h3>
      </div>
    </div>
  `
})
export class GalleryGridComponent {
  @Input({ required: true }) items: LensGalleryItem[] = [];
  active = 'All';
  openItem?: LensGalleryItem;

  get categories(): string[] {
    return Array.from(new Set(this.items.map((item) => item.category)));
  }

  get filtered(): LensGalleryItem[] {
    return this.active === 'All' ? this.items : this.items.filter((item) => item.category === this.active);
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.openItem = undefined;
  }

  useFallback(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://picsum.photos/seed/clickkaar-lens-fallback/1200/820';
  }
}

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="lens-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <h2>{{ heading }}</h2>
      <div class="form-grid">
        <label>Full name <input formControlName="name" autocomplete="name" maxlength="80" /></label>
        <label>Phone number <input formControlName="phone" autocomplete="tel" maxlength="18" /></label>
        <label>Email address <input formControlName="email" type="email" autocomplete="email" maxlength="120" /></label>
        <label>City or location <input formControlName="city" autocomplete="address-level2" maxlength="80" /></label>
        <label>Shoot category
          <select formControlName="serviceType">
            <option value="">Select category</option>
            <option *ngFor="let option of categories" [value]="option">{{ option }}</option>
          </select>
        </label>
        <label>Preferred date <input formControlName="preferredDate" type="date" /></label>
      </div>
      <label>Message <textarea formControlName="message" rows="4" maxlength="600"></textarea></label>
      <label class="check"><input type="checkbox" formControlName="consent" /> I agree to be contacted by CLICK-KAAR LLP about this enquiry.</label>
      <div class="errors" *ngIf="form.touched && form.invalid">
        <span *ngIf="form.controls.name.touched && form.controls.name.invalid">Full name is required.</span>
        <span *ngIf="form.controls.phone.touched && form.controls.phone.invalid">Enter a valid mobile number.</span>
        <span *ngIf="form.controls.city.touched && form.controls.city.invalid">City is required.</span>
        <span *ngIf="form.controls.serviceType.touched && form.controls.serviceType.invalid">Choose a shoot category.</span>
        <span *ngIf="form.controls.preferredDate.touched && form.controls.preferredDate.hasError('pastDate')">Date cannot be earlier than today.</span>
        <span *ngIf="form.controls.consent.touched && form.controls.consent.invalid">Consent is required.</span>
      </div>
      <p class="form-status success" *ngIf="success">{{ success }}</p>
      <p class="form-status error" *ngIf="error">{{ error }}</p>
      <button class="btn primary" type="submit" [disabled]="form.invalid || submitting">{{ submitting ? 'Submitting...' : 'Send enquiry' }}</button>
    </form>
  `
})
export class EnquiryFormComponent implements OnInit {
  @Input() heading = 'Tell us about your shoot';
  @Input() presetCategory = '';
  @Input() source = 'lens';
  categories = ['Wedding', 'Pre-Wedding', 'Maternity', 'Baby and Kids', 'Vacation', 'Parties', 'Food Photography', 'Interior Photography', 'Product Photography', 'Corporate Events', 'Brand Videos', 'Profile and Headshots'];
  submitting = false;
  success = '';
  error = '';
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, indianMobileReadyValidator()]],
    email: ['', Validators.email],
    city: ['', Validators.required],
    serviceType: ['', Validators.required],
    preferredDate: ['', futureOrTodayValidator()],
    message: ['', Validators.maxLength(600)],
    consent: [false, Validators.requiredTrue]
  });

  constructor(private readonly fb: FormBuilder, private readonly leads: LensLeadService, private readonly route: ActivatedRoute, private readonly analytics: LensAnalyticsService) {}

  ngOnInit(): void {
    const type = this.route.snapshot.queryParamMap.get('type') || this.presetCategory;
    if (type) {
      this.form.patchValue({ serviceType: this.labelFromType(type) });
    }
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.submitting) {
      return;
    }
    this.submitting = true;
    this.success = '';
    this.error = '';
    const value = this.form.getRawValue();
    this.leads.submitLead({
      name: value.name,
      phone: value.phone,
      email: value.email || undefined,
      city: value.city,
      serviceType: value.serviceType,
      preferredDate: value.preferredDate,
      message: value.message,
      source: this.source,
      pageUrl: window.location.href
    }).pipe(finalize(() => (this.submitting = false))).subscribe({
      next: () => {
        this.success = 'Thanks. A Click-Kaar coordinator will contact you shortly.';
        this.analytics.track('enquiry_submitted', { source: this.source });
        this.form.reset({ consent: false });
      },
      error: () => {
        this.error = 'We could not send the enquiry right now. Please try WhatsApp or call.';
        this.analytics.track('enquiry_failed', { source: this.source });
      }
    });
  }

  private labelFromType(type: string): string {
    return type.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  }
}

@Component({
  selector: 'app-post-requirement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form class="lens-form requirement-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <h2>Post your requirement</h2>
      <p>Share the essentials and a Click-Kaar coordinator will help shape the right shoot plan.</p>
      <div class="form-grid">
        <label>Name <input formControlName="name" autocomplete="name" maxlength="80" /></label>
        <label>Email <input formControlName="email" type="email" autocomplete="email" maxlength="120" /></label>
        <label>Mobile <input formControlName="phone" autocomplete="tel" maxlength="18" /></label>
        <label>Location <input formControlName="city" autocomplete="address-level2" maxlength="80" /></label>
        <label>Required services <input formControlName="serviceType" maxlength="120" placeholder="Example: wedding photography, reels, editing" /></label>
      </div>
      <label>Description <textarea formControlName="message" rows="5" maxlength="800" placeholder="Tell us about the shoot, date, deliverables, location, references or budget range."></textarea></label>
      <div class="errors" *ngIf="form.touched && form.invalid">
        <span *ngIf="form.controls.name.touched && form.controls.name.invalid">Name is required.</span>
        <span *ngIf="form.controls.email.touched && form.controls.email.invalid">Enter a valid email address.</span>
        <span *ngIf="form.controls.phone.touched && form.controls.phone.invalid">Enter a valid mobile number.</span>
        <span *ngIf="form.controls.city.touched && form.controls.city.invalid">Location is required.</span>
        <span *ngIf="form.controls.serviceType.touched && form.controls.serviceType.invalid">Choose a required service.</span>
        <span *ngIf="form.controls.message.touched && form.controls.message.invalid">Description is required.</span>
      </div>
      <p class="form-status success" *ngIf="success">{{ success }}</p>
      <p class="form-status error" *ngIf="error">{{ error }}</p>
      <button class="btn primary" type="submit" [disabled]="form.invalid || submitting">{{ submitting ? 'Posting...' : 'Post requirement' }}</button>
    </form>
  `
})
export class PostRequirementFormComponent {
  submitting = false;
  success = '';
  error = '';
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, indianMobileReadyValidator()]],
    city: ['', Validators.required],
    serviceType: ['', Validators.required],
    message: ['', [Validators.required, Validators.maxLength(800)]]
  });

  constructor(private readonly fb: FormBuilder, private readonly leads: LensLeadService, private readonly analytics: LensAnalyticsService) {}

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.submitting) {
      return;
    }

    this.submitting = true;
    this.success = '';
    this.error = '';
    const value = this.form.getRawValue();
    this.leads.submitLead({
      name: value.name,
      phone: value.phone,
      email: value.email,
      city: value.city,
      serviceType: value.serviceType,
      preferredDate: '',
      message: value.message,
      source: 'post-requirement',
      pageUrl: window.location.href
    }).pipe(finalize(() => (this.submitting = false))).subscribe({
      next: () => {
        this.success = 'Requirement posted. A Click-Kaar coordinator will contact you shortly.';
        this.analytics.track('requirement_posted', { serviceType: value.serviceType });
        this.form.reset();
      },
      error: () => {
        this.error = 'We could not post the requirement right now. Please try WhatsApp or call.';
        this.analytics.track('requirement_post_failed', { serviceType: value.serviceType });
      }
    });
  }
}

@Component({
  selector: 'app-floating-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="floating-contact">
      <a class="whatsapp" [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp" title="WhatsApp" (click)="analytics.track('whatsapp_clicked')">
        <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
      <a class="mobile-call" [href]="callHref" aria-label="Call Click-Kaar Lens" (click)="analytics.track('call_clicked')">Call</a>
    </div>
  `
})
export class FloatingContactComponent {
  @Input() serviceName = 'Click-Kaar Lens';
  callHref = 'tel:+919096820033';

  constructor(private readonly whatsapp: LensWhatsAppService, readonly analytics: LensAnalyticsService) {}

  get whatsappUrl(): string {
    return this.whatsapp.buildUrl(this.serviceName);
  }
}
