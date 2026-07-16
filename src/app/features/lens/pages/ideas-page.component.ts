import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdeaItem } from '../../../core/models/lens.models';
import { LensContentService } from '../../../core/services/lens-content.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="sub-hero"><h1>Ideas and inspiration</h1><p>Search poses, locations, themes and styling ideas for your next shoot.</p></section>
    <section class="page-section">
      <div class="filter-panel">
        <input [formControl]="search" placeholder="Search ideas" aria-label="Search ideas" />
        <select [formControl]="category" aria-label="Filter by category"><option value="">All categories</option><option *ngFor="let item of categories" [value]="item">{{ item }}</option></select>
        <select [formControl]="style" aria-label="Filter by style"><option value="">All styles</option><option>Editorial</option><option>Natural</option></select>
        <button type="button" (click)="clear()">Clear filters</button>
      </div>
      <div class="masonry" *ngIf="filtered.length; else empty">
        <button type="button" *ngFor="let item of filtered" (click)="selected = item" class="idea-card">
          <img [src]="item.image" [alt]="item.alt" loading="lazy" />
          <strong>{{ item.title }}</strong><span>{{ item.location }} - {{ item.style }}</span>
        </button>
      </div>
      <ng-template #empty><p class="empty-state">No inspiration matches these filters.</p></ng-template>
      <div class="modal-backdrop" *ngIf="selected" (click)="selected = undefined"><div class="modal" role="dialog" aria-modal="true" (click)="$event.stopPropagation()"><button class="icon-btn close" (click)="selected = undefined">x</button><img [src]="selected.image" [alt]="selected.alt" /><h2>{{ selected.title }}</h2><p>{{ selected.category }} - {{ selected.style }} - {{ selected.location }}</p></div></div>
    </section>
  `
})
export class IdeasPageComponent implements OnInit {
  search = new FormControl('', { nonNullable: true });
  category = new FormControl('', { nonNullable: true });
  style = new FormControl('', { nonNullable: true });
  selected?: IdeaItem;

  constructor(readonly content: LensContentService, private readonly route: ActivatedRoute, private readonly router: Router, private readonly seo: LensSeoService) {}

  get categories(): string[] {
    return Array.from(new Set(this.content.ideas.map((idea) => idea.category)));
  }

  get filtered(): IdeaItem[] {
    const query = this.search.value.toLowerCase();
    return this.content.ideas.filter((idea) => (!query || idea.title.toLowerCase().includes(query)) && (!this.category.value || idea.category === this.category.value) && (!this.style.value || idea.style === this.style.value));
  }

  ngOnInit(): void {
    this.search.setValue(this.route.snapshot.queryParamMap.get('q') || '');
    this.category.setValue(this.route.snapshot.queryParamMap.get('category') || '');
    this.style.setValue(this.route.snapshot.queryParamMap.get('style') || '');
    [this.search, this.category, this.style].forEach((control) => control.valueChanges.subscribe(() => this.syncQuery()));
    this.seo.update({ title: 'Photography Ideas | Click-Kaar Lens', description: 'Explore shoot poses, themes, locations and styling inspiration.' });
  }

  clear(): void {
    this.search.setValue('');
    this.category.setValue('');
    this.style.setValue('');
  }

  private syncQuery(): void {
    this.router.navigate([], { queryParams: { q: this.search.value || null, category: this.category.value || null, style: this.style.value || null }, queryParamsHandling: 'merge' });
  }
}
