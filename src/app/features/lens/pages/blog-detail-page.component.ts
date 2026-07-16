import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogPost } from '../../../core/models/lens.models';
import { LensContentService } from '../../../core/services/lens-content.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';
import { EnquiryFormComponent } from '../../../shared/components/lens-ui.components';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, EnquiryFormComponent],
  template: `
    <article class="article" *ngIf="post; else missing">
      <a routerLink="/lens/blog">Back to blog</a>
      <h1>{{ post.title }}</h1>
      <p>{{ post.author }} - {{ post.publishedAt }} - {{ post.readingTime }}</p>
      <img [src]="post.image" [alt]="post.title" />
      <nav aria-label="Article sections"><a *ngFor="let block of post.content; index as i" [href]="'#section-' + i">Section {{ i + 1 }}</a></nav>
      <section *ngFor="let block of post.content; index as i" [id]="'section-' + i"><h2>{{ block.split('.')[0] }}</h2><p>{{ block }}</p></section>
      <div class="cta-band"><h2>Need help planning a shoot?</h2><a class="btn primary" routerLink="/lens/contact">Talk to Click-Kaar Lens</a></div>
      <app-enquiry-form source="lens-blog" />
    </article>
    <ng-template #missing><section class="sub-hero"><h1>Article not found</h1><a class="btn primary" routerLink="/lens/blog">View blog</a></section></ng-template>
  `
})
export class BlogDetailPageComponent implements OnInit {
  post?: BlogPost;

  constructor(private readonly route: ActivatedRoute, private readonly content: LensContentService, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.post = this.content.getBlogPost(this.route.snapshot.paramMap.get('slug'));
    this.seo.update(this.post ? { title: `${this.post.title} | Click-Kaar Lens`, description: this.post.excerpt, image: this.post.image, type: 'article', schema: { '@context': 'https://schema.org', '@type': 'Article', headline: this.post.title, author: this.post.author } } : { title: 'Article Not Found | Click-Kaar Lens', description: 'The requested article could not be found.' });
  }
}
