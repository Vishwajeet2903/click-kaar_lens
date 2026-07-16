import { TestBed } from '@angular/core/testing';
import { LensWhatsAppService } from './lens-whatsapp.service';

describe('LensWhatsAppService', () => {
  it('generates a safe prefilled WhatsApp URL', () => {
    const service = TestBed.inject(LensWhatsAppService);
    const url = service.buildUrl('Wedding');
    expect(url).toContain('https://wa.me/');
    expect(url).toContain(encodeURIComponent('Hello Click-Kaar Lens, I would like to enquire about Wedding.'));
  });
});
