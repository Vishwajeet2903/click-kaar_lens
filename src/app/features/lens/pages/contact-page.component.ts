import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LensSeoService } from '../../../core/services/lens-seo.service';
import { EnquiryFormComponent } from '../../../shared/components/lens-ui.components';

@Component({
  standalone: true,
  imports: [CommonModule, EnquiryFormComponent],
  template: `
    <section class="sub-hero"><h1>{{ heading }}</h1><p>Share your shoot details and a Click-Kaar coordinator will help match the right crew, kit plan and delivery flow.</p></section>
    <section class="page-section two-col"><app-enquiry-form [source]="'lens-contact-' + type" /><aside class="contact-card"><h2>Contact details</h2><a [href]="'tel:' + phone">{{ phone }}</a><a [href]="'mailto:' + email">{{ email }}</a><p>Working hours: 10:00 AM to 7:00 PM</p><p>CLICK-KAAR LLP coordinates photography, visual content and creator-ready production support across multiple Indian cities. Exact serviceability is confirmed during booking.</p><div class="map-placeholder">Service area map placeholder</div></aside></section>
  `
})
export class ContactPageComponent implements OnInit {
  type = '';
  phone = environment.contactPhone;
  email = environment.contactEmail;
  heading = 'Talk to a Click-Kaar Lens expert';

  constructor(private readonly route: ActivatedRoute, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.queryParamMap.get('type') || 'general';
    this.heading = this.type === 'general' ? this.heading : `Talk to us about ${this.type.replace('-', ' ')}`;
    this.seo.update({ title: 'Contact Click-Kaar Lens', description: 'Contact CLICK-KAAR LLP for photography bookings, WhatsApp enquiries and creator partner support.' });
  }
}
