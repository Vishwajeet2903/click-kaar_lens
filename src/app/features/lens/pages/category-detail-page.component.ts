import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LensCategory } from '../../../core/models/lens.models';
import { LensContentService } from '../../../core/services/lens-content.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';
import { EnquiryFormComponent, GalleryGridComponent } from '../../../shared/components/lens-ui.components';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, GalleryGridComponent, EnquiryFormComponent],
  template: `
    <ng-container *ngIf="category; else invalid">
      <section class="detail-hero"><img [src]="category.heroImage" [alt]="category.title" /><div><p>{{ category.group }}</p><h1>{{ category.title }}</h1><span>{{ category.description }}</span><a class="btn primary" href="#enquiry">Enquire now</a></div></section>
      <section class="page-section two-col"><div><h2>Overview</h2><p>{{ category.description }} Click-Kaar Lens coordinates the brief, photographer matching and delivery flow.</p></div><div class="highlight-list"><article *ngFor="let item of category.highlights"><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article></div></section>
      <section class="page-section"><h2>Sample gallery</h2><app-gallery-grid [items]="category.gallery" /></section>
      <section class="page-section tinted"><h2>Packages</h2><div class="card-grid compact"><article class="plain-card" *ngFor="let pack of category.packages"><h3>{{ pack.name }}</h3><p>{{ pack.description }}</p><ul><li *ngFor="let feature of pack.features">{{ feature }}</li></ul></article></div></section>
      <section class="page-section"><h2>FAQs</h2><details *ngFor="let faq of category.faqs"><summary>{{ faq.question }}</summary><p>{{ faq.answer }}</p></details></section>
      <section id="enquiry" class="page-section form-section"><app-enquiry-form [presetCategory]="category.title" [source]="'lens-' + category.slug" /></section>
      <section class="cta-band"><h2>Prefer a quick conversation?</h2><a class="btn primary" routerLink="/contact" [queryParams]="{ type: category.slug }">WhatsApp or call us</a></section>
    </ng-container>
    <ng-template #invalid><section class="sub-hero"><h1>We could not find that Lens service.</h1><p>Explore all services and choose the closest match.</p><a class="btn primary" routerLink="/">Back to Lens</a></section></ng-template>
  `
})
export class CategoryDetailPageComponent implements OnInit {
  category?: LensCategory;

  constructor(private readonly route: ActivatedRoute, private readonly content: LensContentService, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.category = this.content.getCategory(this.route.snapshot.paramMap.get('slug'));
    if (this.category) {
      this.seo.update({ title: this.category.metaTitle, description: this.category.metaDescription, image: this.category.heroImage, schema: { '@context': 'https://schema.org', '@type': 'Service', name: this.category.title, description: this.category.description } });
    } else {
      this.seo.update({ title: 'Lens Service Not Found | Click-Kaar Lens', description: 'The requested Click-Kaar Lens service could not be found.' });
    }
  }
}
