import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LensContentService } from '../../../core/services/lens-content.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';
import { PostRequirementFormComponent, SectionHeadingComponent } from '../../../shared/components/lens-ui.components';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SectionHeadingComponent, PostRequirementFormComponent, ScrollRevealDirective],
  template: `
    <section class="hero" appScrollReveal="scale">
      <img src="/assets/images/OG_Images/heroImage.jpg" alt="Professional photography shoot by Click-Kaar Lens" width="1440" height="760" />
      <div class="hero-copy">
        <p class="hero-kicker">Click-Kaar Lens</p>
        <h1>Creator-ready photography for every frame that matters.</h1>
        <span>Book trusted photographers, editors and shoot coordinators from the CLICK-KAAR LLP creator marketplace for occasions, brands and business campaigns.</span>
        <ul class="trust-list" aria-label="Click-Kaar Lens benefits">
          <li>Verified professionals</li>
          <li>Gear-aware planning</li>
          <li>Creator-ready packages</li>
        </ul>
        <div class="actions"><a class="btn primary" href="#enquiry">Plan a Shoot</a><a class="btn ghost" routerLink="/ideas">View Sample Shoots</a></div>
      </div>
    </section>
    <section class="page-section requirement-section" appScrollReveal="fade-up">
      <div class="requirement-copy">
        <div class="section-heading">
          <p>Quick brief</p>
          <h2>Post your requirement</h2>
          <span>Tell us what you need and the Click-Kaar team will help match the right service, crew and production flow.</span>
        </div>
        <div class="requirement-points">
          <span>Occasions and business shoots</span>
          <span>Coordinator-assisted planning</span>
          <span>Fast callback support</span>
        </div>
      </div>
      <app-post-requirement-form />
    </section>
    <section class="page-section popular-services" appScrollReveal="fade-up">
      <app-section-heading eyebrow="Popular services" title="Choose a shoot category" text="Fast-start options for occasions, brands, products and people." />
      <div class="popular-service-grid">
        <a class="service-tile" *ngFor="let item of popularServices" [routerLink]="serviceLink(item)">
          <img [src]="item.heroImage" [alt]="item.title" loading="lazy" width="420" height="300" />
          <span>{{ item.group === 'business' ? 'Business' : 'Occasion' }}</span>
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
          <em>Explore</em>
        </a>
      </div>
    </section>
    <section class="page-section our-services" appScrollReveal="fade-up">
      <app-section-heading eyebrow="Our services" title="Explore production-ready services" text="A focused set of Click-Kaar Lens services. Open the full library to view every option." />
      <div class="popular-service-grid">
        <a class="service-tile" *ngFor="let item of ourServices" [routerLink]="serviceLink(item)">
          <img [src]="item.heroImage" [alt]="item.title" loading="lazy" width="420" height="300" />
          <span>{{ item.group === 'business' ? 'Business' : 'Occasion' }}</span>
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
          <em>Explore</em>
        </a>
      </div>
      <div class="section-actions"><a class="btn primary" routerLink="/services">View all services</a></div>
    </section>
    <section class="page-section why-choose-section" appScrollReveal="slide-right">
      <app-section-heading eyebrow="Why choose us" title="Built for smoother shoots" text="The Click-Kaar Lens flow is designed for people who need dependable planning, clear coordination and polished visual output." />
      <div class="why-layout">
        <div class="why-grid">
          <article class="why-card" *ngFor="let item of whyChoose">
            <b>{{ item.number }}</b>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
        <figure class="why-visual">
          <img src="assets/images/lens/why-choose-us-transparent.png" alt="Click-Kaar Lens photographer holding a camera" width="760" height="960" />
        </figure>
      </div>
    </section>
    <section class="page-section customer-reviews reviews-section" id="reviews" appScrollReveal="fade-up">
      <div class="reviews-top">
        <div class="section-heading">
          <p>Customer reviews</p>
        </div>
        <div class="carousel-controls" aria-label="Customer review slider controls">
          <button type="button" class="theme-arrow-button previous" (click)="slideReview(-1)" [disabled]="content.testimonials.length < 2" aria-label="Previous reviews">
            <i class="theme-arrow-icon" aria-hidden="true"></i>
          </button>
          <button type="button" class="theme-arrow-button" (click)="slideReview(1)" [disabled]="content.testimonials.length < 2" aria-label="Next reviews">
            <i class="theme-arrow-icon" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <div class="reviews-window" aria-live="polite">
        <div class="reviews-track" [class.no-transition]="isReviewResetting" [style.--review-index]="currentReviewIndex">
          <article class="review-card" *ngFor="let quote of renderedReviews; let index = index">
            <div class="rating" [attr.aria-label]="quote.rating + ' star review'">
              <span *ngFor="let star of ratingOptions" [class.dimmed]="star > quote.rating">★</span>
            </div>
            <p>"{{ quote.text }}"</p>
            <div class="reviewer">
              <img [src]="quote.avatar" [alt]="quote.name" loading="lazy" width="52" height="52" />
              <div>
                <strong>{{ quote.name }}</strong>
                <span>{{ quote.location }} - {{ quote.category }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="write-review">
        <div class="write-review-copy">
          <p class="eyebrow">Write a review</p>
          <h3>Share your Click-Kaar Lens experience.</h3>
          <p>Your review will help other customers plan photography, editing and production work with confidence.</p>
        </div>

        <form class="review-form" (ngSubmit)="submitReview()">
          <div class="review-fields">
            <label>
              <span>Name</span>
              <input type="text" name="reviewName" [(ngModel)]="reviewDraft.name" placeholder="Your name" required maxlength="120" />
            </label>
            <label>
              <span>Service type</span>
              <input type="text" name="reviewRole" [(ngModel)]="reviewDraft.role" placeholder="Wedding, food, headshots..." required maxlength="120" />
            </label>
          </div>

          <div class="rating-picker" role="radiogroup" aria-label="Review rating">
            <button
              type="button"
              *ngFor="let star of ratingOptions"
              [class.active]="star <= reviewDraft.rating"
              (click)="selectReviewRating(star)"
              [attr.aria-label]="star + ' star rating'"
              [attr.aria-checked]="star === reviewDraft.rating"
              role="radio">
              ★
            </button>
          </div>

          <label>
            <span>Your review</span>
            <textarea name="reviewQuote" [(ngModel)]="reviewDraft.quote" placeholder="Tell us what was smooth, useful, or memorable." rows="4" required maxlength="600"></textarea>
          </label>

          <div class="review-actions">
            <button type="submit" class="btn primary">Submit review</button>
            <span class="review-status" *ngIf="reviewSubmitted">Review saved.</span>
            <span class="review-error" *ngIf="reviewError">{{ reviewError }}</span>
          </div>
        </form>
      </div>
    </section>
  `
})
export class HomePageComponent implements OnInit {
  occasions = this.content.getCategories('occasion');
  business = this.content.getCategories('business');
  popularServices = [this.occasions[0], this.occasions[1], this.business[0], this.business[2]];
  allServices = [...this.occasions, ...this.business];
  ourServices = [this.occasions[2], this.occasions[5], this.business[1], this.business[4]];
  currentReviewIndex = 1;
  isReviewResetting = false;
  readonly ratingOptions = [1, 2, 3, 4, 5];
  reviewSubmitted = false;
  reviewError = '';
  reviewDraft = {
    name: '',
    role: '',
    quote: '',
    rating: 5
  };
  whyChoose = [
    { number: '01', title: 'Verified creator network', text: 'Photographers, editors and coordinators are matched to your shoot type, location and production needs.' },
    { number: '02', title: 'Gear-aware planning', text: 'Briefs are planned with lenses, lighting, audio, locations and deliverables in mind from the start.' },
    { number: '03', title: 'Coordinator-led workflow', text: 'A Click-Kaar coordinator keeps references, dates, shot lists and delivery expectations aligned.' },
    { number: '04', title: 'Delivery-ready output', text: 'Assets are prepared for sharing, listings, menus, campaigns, profiles and brand channels.' }
  ];

  constructor(readonly content: LensContentService, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Click-Kaar Lens | Book Photographers for Occasions and Business', description: 'Creator-ready photography and visual-content booking from CLICK-KAAR LLP for weddings, celebrations, travel, brands and business shoots.' });
  }

  serviceLink(item: { group: string; slug: string }): string {
    return item.group === 'business' ? `/business/${item.slug}` : `/occasions/${item.slug}`;
  }

  get renderedReviews() {
    const reviews = this.content.testimonials;
    return reviews.length > 1 ? [reviews[reviews.length - 1], ...reviews, ...reviews.slice(0, 3)] : reviews;
  }

  slideReview(step: number): void {
    const total = this.content.testimonials.length;
    if (total < 2) {
      return;
    }

    this.currentReviewIndex += step;

    window.setTimeout(() => {
      if (this.currentReviewIndex > total) {
        this.snapReviewTo(1);
      } else if (this.currentReviewIndex < 1) {
        this.snapReviewTo(total);
      }
    }, 860);
  }

  selectReviewRating(rating: number): void {
    this.reviewDraft.rating = rating;
  }

  submitReview(): void {
    const name = this.reviewDraft.name.trim();
    const role = this.reviewDraft.role.trim();
    const quote = this.reviewDraft.quote.trim();

    if (!name || !role || !quote) {
      this.reviewError = 'Please fill in your name, service type, and review.';
      this.reviewSubmitted = false;
      return;
    }

    this.reviewError = '';
    this.reviewSubmitted = true;
    this.reviewDraft = {
      name: '',
      role: '',
      quote: '',
      rating: 5
    };
  }

  private snapReviewTo(index: number): void {
    this.isReviewResetting = true;
    this.currentReviewIndex = index;

    window.setTimeout(() => {
      this.isReviewResetting = false;
    });
  }
}
