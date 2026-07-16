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

    return this.http.post<{ ok: true }>(`${environment.apiBaseUrl}${environment.partnerEndpoints[role]}`, payload);
  }
}
