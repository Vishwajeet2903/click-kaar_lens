import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { LensLeadService } from './lens-lead.service';
import { environment } from '../../../environments/environment';

describe('LensLeadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('submits enquiry payloads to the backend', (done) => {
    const service = TestBed.inject(LensLeadService);
    const http = TestBed.inject(HttpTestingController);

    service.submitLead({ name: 'Test User', phone: '9876543210', city: 'Mumbai', serviceType: 'Wedding', eventDate: '', message: '', source: 'spec', pageUrl: '/lens' }).subscribe((result) => {
      expect(result).toEqual({ ok: true });
      done();
    });

    const request = http.expectOne(`${environment.apiBaseUrl}${environment.leadEndpoint}`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.serviceType).toBe('Wedding');
    request.flush({ ok: true });
  });

  it('maps partner submissions to backend join applications', (done) => {
    const service = TestBed.inject(LensLeadService);
    const http = TestBed.inject(HttpTestingController);

    service.submitPartner('photographer', { role: 'photographer', fullName: 'Test User', phone: '9876543210', email: 'a@b.com', city: 'Delhi', about: 'Testing', files: [] }).subscribe((result) => {
      expect(result).toEqual({ ok: true });
      done();
    });

    const request = http.expectOne(`${environment.apiBaseUrl}${environment.partnerEndpoints.photographer}`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body.firstName).toBe('Test');
    expect(request.request.body.lastName).toBe('User');
    expect(request.request.body.applicationRole).toBe('PHOTOGRAPHER');
    request.flush({ ok: true });
  });
});
