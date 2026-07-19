import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JoinRole, LeadPayload, PartnerPayload } from '../models/lens.models';

@Injectable({ providedIn: 'root' })
export class LensLeadService {
  constructor(private readonly http: HttpClient) {}

  submitLead(payload: LeadPayload): Observable<{ ok: true }> {
    if (!environment.apiBaseUrl || environment.mockData) {
      return of({ ok: true as const }).pipe(delay(600));
    }

    return this.http.post<{ ok: true }>(`${environment.apiBaseUrl}${environment.leadEndpoint}`, payload);
  }

  submitPartner(role: JoinRole, payload: PartnerPayload): Observable<{ ok: true }> {
    if (!environment.apiBaseUrl || environment.mockData) {
      return payload.fullName.toLowerCase().includes('fail') ? throwError(() => new Error('Mock submission failed')) : of({ ok: true as const }).pipe(delay(600));
    }

    return this.http.post<{ ok: true }>(`${environment.apiBaseUrl}${environment.partnerEndpoints[role]}`, this.toBackendPartnerPayload(role, payload));
  }

  private toBackendPartnerPayload(role: JoinRole, payload: PartnerPayload): Record<string, unknown> {
    if (role === 'partner') {
      return {
        businessName: payload.fullName,
        contactPersonName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        businessType: payload.specializations || 'Business partner',
        city: payload.city,
        websiteUrl: payload.socialProfile,
        portfolioUrl: payload.portfolioUrl,
        experienceYears: payload.experience,
        message: this.joinNotes(payload)
      };
    }

    const [firstName, ...lastNameParts] = payload.fullName.trim().split(/\s+/);
    return {
      firstName,
      lastName: lastNameParts.join(' '),
      email: payload.email,
      phone: payload.phone,
      city: payload.city,
      applicationRole: this.toApplicationRole(role),
      experienceYears: payload.experience,
      skills: payload.specializations,
      equipmentDetails: payload.equipment,
      portfolioUrl: payload.portfolioUrl,
      instagramUrl: payload.socialProfile,
      message: this.joinNotes(payload)
    };
  }

  private toApplicationRole(role: JoinRole): string {
    const roles: Record<JoinRole, string> = {
      photographer: 'PHOTOGRAPHER',
      editor: 'EDITOR',
      coordinator: 'CREATOR',
      partner: 'CREATOR'
    };
    return roles[role];
  }

  private joinNotes(payload: PartnerPayload): string {
    return [
      payload.about,
      payload.serviceAreas ? `Service areas: ${payload.serviceAreas}` : '',
      payload.availability ? `Availability: ${payload.availability}` : '',
      payload.pricingNote ? `Expected rate or note: ${payload.pricingNote}` : '',
      payload.files.length ? `Files selected for future upload: ${payload.files.join(', ')}` : ''
    ].filter(Boolean).join('\n\n');
  }
}
