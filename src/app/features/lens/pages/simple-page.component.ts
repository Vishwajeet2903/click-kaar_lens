import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LensSeoService } from '../../../core/services/lens-seo.service';
import { legalPages } from '../data/lens-content.data';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="sub-hero"><h1>{{ title }}</h1><p>{{ intro }}</p></section>
    <section class="page-section content-page">
      <p *ngFor="let block of body">{{ block }}</p>
      <a class="btn primary" routerLink="/lens/contact">Contact Click-Kaar Lens</a>
    </section>
  `
})
export class SimplePageComponent implements OnInit {
  title = 'About Click-Kaar Lens';
  intro = 'A premium photography and visual-content booking module from Click-Kaar.';
  body = ['Click-Kaar Lens helps customers and businesses plan photography shoots with trusted professionals, clear coordination and conversion-focused support.', 'This frontend is prepared for real business content, verified metrics and backend APIs.'];

  constructor(private readonly route: ActivatedRoute, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const page = this.route.snapshot.data['page'];
    if (slug && legalPages[slug]) {
      this.title = legalPages[slug].title;
      this.intro = 'Please review the current policy information.';
      this.body = legalPages[slug].body;
    } else if (page === 'not-found') {
      this.title = 'Page not found';
      this.intro = 'The Lens page you requested does not exist.';
      this.body = ['Use the navigation to continue exploring Click-Kaar Lens.'];
    }
    this.seo.update({ title: `${this.title} | Click-Kaar Lens`, description: this.intro });
  }
}
