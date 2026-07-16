import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LensLeadService } from './lens-lead.service';

describe('LensLeadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
  });

  it('submits enquiry payloads in mock mode', (done) => {
    const service = TestBed.inject(LensLeadService);
    service.submitLead({ name: 'Test User', phone: '9876543210', city: 'Mumbai', serviceType: 'Wedding', preferredDate: '', message: '', source: 'spec', pageUrl: '/lens' }).subscribe((result) => {
      expect(result.ok).toBeTrue();
      done();
    });
  });

  it('surfaces partner submission failures in mock mode', (done) => {
    const service = TestBed.inject(LensLeadService);
    service.submitPartner('photographer', { role: 'photographer', fullName: 'Fail User', phone: '9876543210', email: 'a@b.com', city: 'Delhi', about: 'Testing', files: [] }).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      }
    });
  });
});
