import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LensContentService } from '../../../core/services/lens-content.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="sub-hero"><h1>Lens Blog</h1><p>Planning guides for better shoots and smoother production.</p></section>
    <section class="page-section">
      <input class="search-input" [formControl]="search" placeholder="Search articles" aria-label="Search articles" />
      <article class="featured-post" *ngIf="content.blogPosts[0] as featured"><img [src]="featured.image" [alt]="featured.title" /><div><p>{{ featured.category }} - {{ featured.readingTime }}</p><h2>{{ featured.title }}</h2><p>{{ featured.excerpt }}</p><a class="btn primary" [routerLink]="['/lens/blog', featured.slug]">Read article</a></div></article>
      <div class="card-grid compact" *ngIf="filtered.length; else empty"><a class="plain-card" *ngFor="let post of filtered" [routerLink]="['/lens/blog', post.slug]"><img [src]="post.image" [alt]="post.title" /><strong>{{ post.title }}</strong><span>{{ post.author }} - {{ post.publishedAt }} - {{ post.readingTime }}</span><p>{{ post.excerpt }}</p></a></div>
      <ng-template #empty><p class="empty-state">No articles found.</p></ng-template>
    </section>
  `
})
export class BlogListPageComponent implements OnInit {
  search = new FormControl('', { nonNullable: true });

  constructor(readonly content: LensContentService, private readonly seo: LensSeoService) {}

  get filtered() {
    const q = this.search.value.toLowerCase();
    return this.content.blogPosts.filter((post) => !q || post.title.toLowerCase().includes(q) || post.tags.some((tag) => tag.includes(q)));
  }

  ngOnInit(): void {
    this.seo.update({ title: 'Photography Blog | Click-Kaar Lens', description: 'Shoot planning, visual-content and photography booking guides.' });
  }
}
