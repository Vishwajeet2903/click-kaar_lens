import { Injectable } from '@angular/core';

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  city: string;
  availableDates: string[];
}

export interface CoordinatorEnquiry {
  id: string;
  customer: string;
  city: string;
  service: string;
  eventDate: string;
  projectManagerStatus: 'Done';
  assignedCrewId: string;
}

export interface AssignedProject {
  id: string;
  customer: string;
  city: string;
  service: string;
  eventDate: string;
  time: string;
  status: 'Assigned' | 'Rejected';
  rejectReason?: string;
}

@Injectable({ providedIn: 'root' })
export class CrewOperationsService {
  readonly currentCrewId = 'crew-1';
  crew: CrewMember[] = [
    { id: 'crew-1', name: 'Nisha Mehta', role: 'Photographer', city: 'Mumbai', availableDates: ['2026-07-23', '2026-07-24', '2026-07-28', '2026-08-14'] },
    { id: 'crew-2', name: 'Kabir Khan', role: 'Videographer', city: 'Mumbai', availableDates: ['2026-07-28', '2026-08-02'] },
    { id: 'crew-3', name: 'Rohan Patil', role: 'Photographer', city: 'Bengaluru', availableDates: ['2026-07-28', '2026-08-20'] },
    { id: 'crew-4', name: 'Aditi Rao', role: 'Project Co-ordinator', city: 'Delhi', availableDates: ['2026-08-02', '2026-08-14'] },
    { id: 'crew-5', name: 'Arjun Desai', role: 'Editor', city: 'Pune', availableDates: ['2026-07-24', '2026-08-02', '2026-09-06'] }
  ];
  enquiries: CoordinatorEnquiry[] = [
    { id: 'CKL-24091', customer: 'Riya Kapoor', city: 'Mumbai', service: 'Wedding', eventDate: '2026-08-14', projectManagerStatus: 'Done', assignedCrewId: 'crew-1' },
    { id: 'CKL-24072', customer: 'Neha Foods', city: 'Bengaluru', service: 'Food Photography', eventDate: '2026-07-28', projectManagerStatus: 'Done', assignedCrewId: 'crew-3' },
    { id: 'CKL-24058', customer: 'Aman Shah', city: 'Pune', service: 'Product Photography', eventDate: '2026-08-02', projectManagerStatus: 'Done', assignedCrewId: '' },
    { id: 'CKL-24033', customer: 'Urban Nest', city: 'Delhi', service: 'Interior Photography', eventDate: '2026-08-20', projectManagerStatus: 'Done', assignedCrewId: '' }
  ];

  isCrewAvailable(crewId: string, date: string): boolean {
    return !!this.crew.find((member) => member.id === crewId)?.availableDates.includes(date);
  }

  setCrewAvailability(crewId: string, date: string, available: boolean): void {
    const member = this.crew.find((item) => item.id === crewId);
    if (!member) {
      return;
    }
    member.availableDates = available
      ? Array.from(new Set([...member.availableDates, date])).sort()
      : member.availableDates.filter((item) => item !== date);
  }

  assignedProjectsForCrew(crewId: string): AssignedProject[] {
    return this.enquiries
      .filter((enquiry) => enquiry.assignedCrewId === crewId)
      .map((enquiry, index) => ({
        id: enquiry.id,
        customer: enquiry.customer,
        city: enquiry.city,
        service: enquiry.service,
        eventDate: enquiry.eventDate,
        time: index === 0 ? '06:00 PM' : '10:00 AM',
        status: 'Assigned' as const
      }));
  }

  rejectProject(projectId: string, reason: string): void {
    const enquiry = this.enquiries.find((item) => item.id === projectId);
    if (enquiry) {
      enquiry.assignedCrewId = '';
    }
  }
}
