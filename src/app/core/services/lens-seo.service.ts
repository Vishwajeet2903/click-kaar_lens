import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: object;
}

@Injectable({ providedIn: 'root' })
export class LensSeoService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  update(config: SeoConfig): void {
    const url = `${environment.siteUrl}${this.router.url.split('?')[0]}`;
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }
    this.setCanonical(url);
    this.setSchema(config.schema);
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = url;
  }

  private setSchema(schema?: object): void {
    this.document.querySelector('#lens-json-ld')?.remove();
    if (!schema) {
      return;
    }
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'lens-json-ld';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
