import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LensSeoService } from './lens-seo.service';

describe('LensSeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Meta, Title, { provide: Router, useValue: { url: '/lens/spec' } }] });
  });

  it('updates title, description, canonical and schema metadata', () => {
    const service = TestBed.inject(LensSeoService);
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    const document = TestBed.inject(DOCUMENT);

    service.update({ title: 'Spec Title', description: 'Spec Description', schema: { '@type': 'Service' } });

    expect(title.getTitle()).toBe('Spec Title');
    expect(meta.getTag('name="description"')?.content).toBe('Spec Description');
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toContain('/lens/spec');
    expect(document.querySelector('#lens-json-ld')?.textContent).toContain('Service');
  });
});
