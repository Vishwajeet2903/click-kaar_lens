import { TestBed } from '@angular/core/testing';
import { LensContentService } from './lens-content.service';

describe('LensContentService', () => {
  it('resolves configured category slugs', () => {
    const service = TestBed.inject(LensContentService);
    expect(service.getCategory('wedding')?.title).toBe('Wedding');
  });

  it('returns undefined for invalid category slugs', () => {
    const service = TestBed.inject(LensContentService);
    expect(service.getCategory('missing-service')).toBeUndefined();
  });

  it('resolves blog slugs for detail pages', () => {
    const service = TestBed.inject(LensContentService);
    expect(service.getBlogPost('food-shoot-checklist')?.category).toBe('Business');
  });
});
