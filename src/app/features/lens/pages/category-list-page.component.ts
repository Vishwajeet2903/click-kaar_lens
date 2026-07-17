import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LensGroup } from '../../../core/models/lens.models';
import { LensContentService } from '../../../core/services/lens-content.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';
import { ImageCardComponent, SectionHeadingComponent } from '../../../shared/components/lens-ui.components';

@Component({
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, ImageCardComponent],
  template: `
    <section class="sub-hero"><h1>{{ title }}</h1><p>{{ text }}</p></section>
    <section class="page-section"><app-section-heading [title]="title" [text]="text" /><div class="card-grid"><app-image-card *ngFor="let item of categories" [title]="item.title" [text]="item.description" [image]="item.heroImage" [link]="'/' + routeGroup + '/' + item.slug" [chip]="title" /></div></section>
  `
})
export class CategoryListPageComponent implements OnInit {
  group: LensGroup = 'occasion';
  routeGroup = 'occasions';
  categories = this.content.getCategories(this.group);
  title = 'Occasion Photography';
  text = 'Find photographers for weddings, families, travel and parties.';

  constructor(private readonly route: ActivatedRoute, private readonly content: LensContentService, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.group = this.route.snapshot.data['group'] as LensGroup;
    this.routeGroup = this.group === 'business' ? 'business' : 'occasions';
    this.categories = this.content.getCategories(this.group);
    this.title = this.group === 'business' ? 'Business Photography' : 'Occasion Photography';
    this.text = this.group === 'business' ? 'Commercial visuals for products, interiors, food, people and events.' : 'Find photographers for weddings, families, travel and parties.';
    this.seo.update({ title: `${this.title} | Click-Kaar Lens`, description: this.text });
  }
}
