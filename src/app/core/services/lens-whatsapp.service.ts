import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LensWhatsAppService {
  buildUrl(serviceName = 'Click-Kaar Lens'): string {
    const message = `Hello Click-Kaar Lens, I would like to enquire about ${serviceName}.`;
    return `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
}
