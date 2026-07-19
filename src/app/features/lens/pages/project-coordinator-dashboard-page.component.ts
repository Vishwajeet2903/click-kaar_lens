import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoordinatorEnquiry, CrewMember, CrewOperationsService } from '../../../core/services/crew-operations.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="admin-shell coordinator-shell">
      <aside class="admin-sidebar">
        <strong>Project Co-ordinator</strong>
        <nav aria-label="Project co-ordinator dashboard sections">
          <a href="#manager-done">PM Done Enquiries</a>
          <a href="#crew">Crew Availability</a>
        </nav>
      </aside>

      <main class="admin-main">
        <header class="admin-topbar">
          <div>
            <p>Project Co-ordinator Workspace</p>
            <h1>Crew Assignment Dashboard</h1>
          </div>
          <div class="admin-identity">
            <span>coordinator&#64;click-kaar.com</span>
            <strong>Project Co-ordinator</strong>
          </div>
        </header>

        <section class="admin-metrics" aria-label="Project co-ordinator summary">
          <article>
            <span>PM done enquiries</span>
            <strong>{{ enquiries.length }}</strong>
            <em>Ready for crew assignment</em>
          </article>
          <article>
            <span>Assigned</span>
            <strong>{{ assignedCount }}</strong>
            <em>Crew already mapped</em>
          </article>
          <article>
            <span>Available crew</span>
            <strong>{{ availableCrew.length }}</strong>
            <em>For selected date</em>
          </article>
          <article>
            <span>Selected date</span>
            <strong>{{ selectedDate }}</strong>
            <em>Availability filter</em>
          </article>
        </section>

        <section class="admin-panel" id="manager-done">
          <div class="admin-panel-heading">
            <p>Project Manager Done Enquiries</p>
            <h2>Assign available crew to each approved enquiry</h2>
          </div>

          <div class="filter-panel">
            <input class="search-input" [(ngModel)]="enquirySearch" placeholder="Search enquiry" />
            <select [(ngModel)]="selectedDate">
              <option *ngFor="let date of enquiryDates" [value]="date">{{ date }}</option>
            </select>
          </div>

          <table class="admin-table">
            <thead>
              <tr>
                <th>Enquiry</th>
                <th>Customer</th>
                <th>City</th>
                <th>Service</th>
                <th>Date</th>
                <th>PM status</th>
                <th>Assign crew</th>
                <th>Assigned</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let enquiry of filteredEnquiries">
                <td>{{ enquiry.id }}</td>
                <td>{{ enquiry.customer }}</td>
                <td>{{ enquiry.city }}</td>
                <td>{{ enquiry.service }}</td>
                <td>{{ enquiry.eventDate }}</td>
                <td><span class="status-pill done">{{ enquiry.projectManagerStatus }}</span></td>
                <td>
                  <select class="table-select" [(ngModel)]="enquiry.assignedCrewId">
                    <option value="">Select crew</option>
                    <option *ngFor="let crew of availableCrewForDate(enquiry.eventDate)" [value]="crew.id">{{ crew.name }} - {{ crew.role }}</option>
                  </select>
                </td>
                <td>{{ assignedCrewName(enquiry.assignedCrewId) || 'Not assigned' }}</td>
              </tr>
            </tbody>
          </table>
          <p class="empty-state" *ngIf="!filteredEnquiries.length">No PM-completed enquiries match this filter.</p>
        </section>

        <section class="admin-panel" id="crew">
          <div class="admin-panel-heading">
            <p>Crew Availability</p>
            <h2>View all crew and mark available or unavailable by date</h2>
          </div>

          <div class="settings-grid">
            <label>Availability date
              <select [(ngModel)]="selectedDate">
                <option *ngFor="let date of scheduleDates" [value]="date">{{ date }}</option>
              </select>
            </label>
            <label>Crew search <input [(ngModel)]="crewSearch" placeholder="Search crew" /></label>
          </div>

          <div class="crew-availability-grid">
            <article *ngFor="let crew of filteredCrew">
              <div>
                <strong>{{ crew.name }}</strong>
                <span>{{ crew.role }} - {{ crew.city }}</span>
              </div>
              <span class="status-pill" [class.blocked]="!isCrewAvailable(crew.id, selectedDate)">
                {{ isCrewAvailable(crew.id, selectedDate) ? 'Available' : 'Unavailable' }}
              </span>
              <div class="table-actions">
                <button type="button" (click)="markAvailability(crew, true)">Available</button>
                <button type="button" class="danger" (click)="markAvailability(crew, false)">Unavailable</button>
              </div>
            </article>
          </div>
        </section>
      </main>
    </section>
  `
})
export class ProjectCoordinatorDashboardPageComponent implements OnInit {
  enquirySearch = '';
  crewSearch = '';
  selectedDate = '2026-08-14';
  enquiries = this.operations.enquiries;
  crew = this.operations.crew;

  constructor(private readonly operations: CrewOperationsService, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Project Co-ordinator Dashboard | Click-Kaar Lens', description: 'Crew availability and assignment dashboard for Click-Kaar Lens project co-ordinators.' });
  }

  get assignedCount(): number {
    return this.enquiries.filter((enquiry) => !!enquiry.assignedCrewId).length;
  }

  get scheduleDates(): string[] {
    return Array.from(new Set(this.enquiries.map((enquiry) => enquiry.eventDate))).sort();
  }

  get enquiryDates(): string[] {
    return ['All dates', ...this.scheduleDates];
  }

  get availableCrew(): CrewMember[] {
    return this.availableCrewForDate(this.selectedDate);
  }

  get filteredEnquiries(): CoordinatorEnquiry[] {
    const term = this.enquirySearch.trim().toLowerCase();
    return this.enquiries.filter((enquiry) => {
      const matchesDate = this.selectedDate === 'All dates' || enquiry.eventDate === this.selectedDate;
      const matchesSearch = !term || [enquiry.id, enquiry.customer, enquiry.city, enquiry.service].some((value) => value.toLowerCase().includes(term));
      return matchesDate && matchesSearch;
    });
  }

  get filteredCrew(): CrewMember[] {
    const term = this.crewSearch.trim().toLowerCase();
    return this.crew.filter((crew) => !term || [crew.name, crew.role, crew.city].some((value) => value.toLowerCase().includes(term)));
  }

  availableCrewForDate(date: string): CrewMember[] {
    if (date === 'All dates') {
      return this.crew;
    }
    return this.crew.filter((crew) => this.isCrewAvailable(crew.id, date));
  }

  isCrewAvailable(crewId: string, date: string): boolean {
    return date === 'All dates' || this.operations.isCrewAvailable(crewId, date);
  }

  markAvailability(crew: CrewMember, available: boolean): void {
    if (this.selectedDate === 'All dates') {
      return;
    }
    this.operations.setCrewAvailability(crew.id, this.selectedDate, available);
  }

  assignedCrewName(crewId: string): string {
    return this.crew.find((crew) => crew.id === crewId)?.name || '';
  }
}
