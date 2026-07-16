import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LensCategory } from '../../../core/models/lens.models';
import { LensContentService } from '../../../core/services/lens-content.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';
import { SectionHeadingComponent } from '../../../shared/components/lens-ui.components';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeadingComponent],
  template: `
    <section class="sub-hero"><h1>Our Services</h1><p>Browse every Click-Kaar Lens service for occasions, brands, people and business production.</p></section>
    <section class="page-section all-services-page">
      <app-section-heading eyebrow="Service library" title="All Click-Kaar Lens services" text="Choose a service to view details, packages, FAQs and related shoot options." />
      <div class="popular-service-grid">
        <a class="service-tile" *ngFor="let item of services" [routerLink]="serviceLink(item)">
          <img [src]="item.heroImage" [alt]="item.title" loading="lazy" width="420" height="300" />
          <span>{{ item.group === 'business' ? 'Business' : 'Occasion' }}</span>
          <strong>{{ item.title }}</strong>
          <p>{{ item.description }}</p>
          <em>Explore</em>
        </a>
      </div>
    </section>
  `
})
export class ServicesPageComponent implements OnInit {
  services = [...this.content.getCategories('occasion'), ...this.content.getCategories('business')];

  constructor(private readonly content: LensContentService, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Our Services | Click-Kaar Lens', description: 'Explore all Click-Kaar Lens photography, content and production services for occasions and business.' });
  }

  serviceLink(item: LensCategory): string {
    return item.group === 'business' ? `/lens/business/${item.slug}` : `/lens/occasions/${item.slug}`;
  }
}
