import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LensSeoService } from '../../../core/services/lens-seo.service';

interface ManagerEnquiry {
  customer: string;
  phone: string;
  city: string;
  service: string;
  eventDate: string;
  budget: string;
  salesStatus: 'Done';
  projectStatus: 'New handoff' | 'Scheduled' | 'In production';
}

interface ScheduleItem {
  date: string;
  time: string;
  customer: string;
  service: string;
  city: string;
  photographer: string;
  coordinator: string;
  status: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="admin-shell project-manager-shell">
      <aside class="admin-sidebar">
        <strong>Project Manager</strong>
        <nav aria-label="Project manager dashboard sections">
          <a href="#handoffs">Sales Done Enquiries</a>
          <a href="#schedule">Full Schedule</a>
        </nav>
      </aside>

      <main class="admin-main">
        <header class="admin-topbar">
          <div>
            <p>Project Manager Workspace</p>
            <h1>Sales Handoffs & Shoot Schedule</h1>
          </div>
          <div class="admin-identity">
            <span>pm&#64;click-kaar.com</span>
            <strong>Project Manager</strong>
          </div>
        </header>

        <section class="admin-metrics" aria-label="Project manager summary">
          <article>
            <span>Sales done enquiries</span>
            <strong>{{ doneEnquiries.length }}</strong>
            <em>Ready for project planning</em>
          </article>
          <article>
            <span>Scheduled shoots</span>
            <strong>{{ schedule.length }}</strong>
            <em>Across all cities</em>
          </article>
          <article>
            <span>Today</span>
            <strong>{{ todayShootCount }}</strong>
            <em>Bookings on calendar</em>
          </article>
          <article>
            <span>Pending assignment</span>
            <strong>{{ pendingAssignmentCount }}</strong>
            <em>Need crew or coordinator</em>
          </article>
        </section>

        <section class="admin-panel" id="handoffs">
          <div class="admin-panel-heading">
            <p>Sales Done Enquiries</p>
            <h2>Only enquiries marked done by sales</h2>
          </div>

          <div class="filter-panel">
            <input class="search-input" [(ngModel)]="handoffSearch" placeholder="Search completed enquiry" />
            <select [(ngModel)]="projectStatusFilter">
              <option value="All">All project statuses</option>
              <option value="New handoff">New handoff</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In production">In production</option>
            </select>
          </div>

          <table class="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>City</th>
                <th>Service</th>
                <th>Date</th>
                <th>Budget</th>
                <th>Project status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let enquiry of filteredDoneEnquiries">
                <td>{{ enquiry.customer }}</td>
                <td>{{ enquiry.phone }}</td>
                <td>{{ enquiry.city }}</td>
                <td>{{ enquiry.service }}</td>
                <td>{{ enquiry.eventDate }}</td>
                <td>{{ enquiry.budget }}</td>
                <td><span class="status-pill done">{{ enquiry.projectStatus }}</span></td>
              </tr>
            </tbody>
          </table>
          <p class="empty-state" *ngIf="!filteredDoneEnquiries.length">No completed sales enquiries match this filter.</p>
        </section>

        <section class="admin-panel" id="schedule">
          <div class="admin-panel-heading">
            <p>Full Schedule</p>
            <h2>All upcoming shoots, teams, and booking states</h2>
          </div>

          <div class="filter-panel">
            <input class="search-input" [(ngModel)]="scheduleSearch" placeholder="Search schedule" />
            <select [(ngModel)]="scheduleStatusFilter">
              <option value="All">All statuses</option>
              <option>Confirmed</option>
              <option>Crew pending</option>
              <option>In production</option>
              <option>Delivery pending</option>
            </select>
          </div>

          <table class="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Customer</th>
                <th>Service</th>
                <th>City</th>
                <th>Photographer</th>
                <th>Coordinator</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of filteredSchedule">
                <td>{{ item.date }}</td>
                <td>{{ item.time }}</td>
                <td>{{ item.customer }}</td>
                <td>{{ item.service }}</td>
                <td>{{ item.city }}</td>
                <td>{{ item.photographer }}</td>
                <td>{{ item.coordinator }}</td>
                <td><span class="status-pill" [class.blocked]="item.status === 'Crew pending'" [class.done]="item.status !== 'Crew pending'">{{ item.status }}</span></td>
              </tr>
            </tbody>
          </table>
          <p class="empty-state" *ngIf="!filteredSchedule.length">No schedule items match this filter.</p>
        </section>
      </main>
    </section>
  `
})
export class ProjectManagerDashboardPageComponent implements OnInit {
  handoffSearch = '';
  scheduleSearch = '';
  projectStatusFilter: 'All' | ManagerEnquiry['projectStatus'] = 'All';
  scheduleStatusFilter = 'All';

  doneEnquiries: ManagerEnquiry[] = [
    { customer: 'Neha Foods', phone: '9123456780', city: 'Bengaluru', service: 'Food Photography', eventDate: '2026-07-28', budget: 'Rs. 40k', salesStatus: 'Done', projectStatus: 'Scheduled' },
    { customer: 'Riya Kapoor', phone: '9876543210', city: 'Mumbai', service: 'Wedding', eventDate: '2026-08-14', budget: 'Rs. 75k', salesStatus: 'Done', projectStatus: 'New handoff' },
    { customer: 'Aman Shah', phone: '9988776655', city: 'Pune', service: 'Product Photography', eventDate: '2026-08-02', budget: 'Rs. 25k', salesStatus: 'Done', projectStatus: 'In production' }
  ];

  schedule: ScheduleItem[] = [
    { date: '2026-07-28', time: '10:00 AM', customer: 'Neha Foods', service: 'Food Photography', city: 'Bengaluru', photographer: 'Kabir Khan', coordinator: 'Meera S', status: 'Confirmed' },
    { date: '2026-08-02', time: '02:30 PM', customer: 'Aman Shah', service: 'Product Photography', city: 'Pune', photographer: 'Rohan P', coordinator: 'Assign needed', status: 'Crew pending' },
    { date: '2026-08-14', time: '06:00 PM', customer: 'Riya Kapoor', service: 'Wedding', city: 'Mumbai', photographer: 'Nisha M', coordinator: 'Aditi R', status: 'Confirmed' },
    { date: '2026-08-20', time: '11:00 AM', customer: 'Urban Nest', service: 'Interior Photography', city: 'Delhi', photographer: 'Assign needed', coordinator: 'Varun K', status: 'Crew pending' },
    { date: '2026-09-06', time: '04:00 PM', customer: 'Varun Mehta', service: 'Pre-Wedding', city: 'Delhi', photographer: 'Arjun D', coordinator: 'Pooja N', status: 'Delivery pending' }
  ];

  constructor(private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Project Manager Dashboard | Click-Kaar Lens', description: 'Project manager dashboard for completed sales enquiries and full shoot scheduling.' });
  }

  get todayShootCount(): number {
    return this.schedule.filter((item) => item.date === '2026-07-28').length;
  }

  get pendingAssignmentCount(): number {
    return this.schedule.filter((item) => item.status === 'Crew pending').length;
  }

  get filteredDoneEnquiries(): ManagerEnquiry[] {
    const term = this.handoffSearch.trim().toLowerCase();
    return this.doneEnquiries.filter((enquiry) => {
      const matchesStatus = this.projectStatusFilter === 'All' || enquiry.projectStatus === this.projectStatusFilter;
      const matchesSearch = !term || [enquiry.customer, enquiry.phone, enquiry.city, enquiry.service].some((value) => value.toLowerCase().includes(term));
      return matchesStatus && matchesSearch;
    });
  }

  get filteredSchedule(): ScheduleItem[] {
    const term = this.scheduleSearch.trim().toLowerCase();
    return this.schedule.filter((item) => {
      const matchesStatus = this.scheduleStatusFilter === 'All' || item.status === this.scheduleStatusFilter;
      const matchesSearch = !term || [item.customer, item.city, item.service, item.photographer, item.coordinator].some((value) => value.toLowerCase().includes(term));
      return matchesStatus && matchesSearch;
    });
  }
}
