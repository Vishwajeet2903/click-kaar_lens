import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LensAnalyticsService {
  track(eventName: string, details: Record<string, string | number | boolean> = {}): void {
    if (!environment.production) {
      console.info('[Lens analytics]', eventName, details);
    }
  }
}
