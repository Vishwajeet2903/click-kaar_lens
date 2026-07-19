import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LensSeoService } from '../../../core/services/lens-seo.service';

interface SalesEnquiry {
  customer: string;
  phone: string;
  city: string;
  service: string;
  eventDate: string;
  budget: string;
  status: 'Open' | 'Done';
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="admin-shell sales-shell">
      <aside class="admin-sidebar">
        <strong>Sales Person</strong>
        <nav aria-label="Sales dashboard sections">
          <a href="#enquiries">Enquiries</a>
          <a href="#summary">Summary</a>
        </nav>
      </aside>

      <main class="admin-main">
        <header class="admin-topbar">
          <div>
            <p>Sales Workspace</p>
            <h1>Enquiry Follow-up Dashboard</h1>
          </div>
          <div class="admin-identity">
            <span>sales&#64;click-kaar.com</span>
            <strong>Sales Person</strong>
          </div>
        </header>

        <section class="admin-metrics" id="summary" aria-label="Sales enquiry summary">
          <article>
            <span>Total enquiries</span>
            <strong>{{ enquiries.length }}</strong>
            <em>Assigned to sales</em>
          </article>
          <article>
            <span>Open</span>
            <strong>{{ openCount }}</strong>
            <em>Needs follow-up</em>
          </article>
          <article>
            <span>Done</span>
            <strong>{{ doneCount }}</strong>
            <em>Completed by sales</em>
          </article>
          <article>
            <span>Conversion focus</span>
            <strong>{{ topService }}</strong>
            <em>Top requested service</em>
          </article>
        </section>

        <section class="admin-panel" id="enquiries">
          <div class="admin-panel-heading">
            <p>All Enquiries</p>
            <h2>Review customer requests and mark follow-up done</h2>
          </div>

          <div class="filter-panel">
            <input class="search-input" [(ngModel)]="search" placeholder="Search enquiry" />
            <select [(ngModel)]="statusFilter">
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="Done">Done</option>
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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let enquiry of filteredEnquiries; let index = index">
                <td>{{ enquiry.customer }}</td>
                <td>{{ enquiry.phone }}</td>
                <td>{{ enquiry.city }}</td>
                <td>{{ enquiry.service }}</td>
                <td>{{ enquiry.eventDate }}</td>
                <td>{{ enquiry.budget }}</td>
                <td><span class="status-pill" [class.done]="enquiry.status === 'Done'">{{ enquiry.status }}</span></td>
                <td>
                  <div class="table-actions">
                    <button type="button" [disabled]="enquiry.status === 'Done'" (click)="markDone(enquiry)">
                      {{ enquiry.status === 'Done' ? 'Done' : 'Mark done' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <p class="empty-state" *ngIf="!filteredEnquiries.length">No enquiries match this filter.</p>
        </section>
      </main>
    </section>
  `
})
export class SalesDashboardPageComponent implements OnInit {
  search = '';
  statusFilter: 'All' | SalesEnquiry['status'] = 'All';
  enquiries: SalesEnquiry[] = [
    { customer: 'Riya Kapoor', phone: '9876543210', city: 'Mumbai', service: 'Wedding', eventDate: '2026-08-14', budget: 'Rs. 75k', status: 'Open' },
    { customer: 'Aman Shah', phone: '9988776655', city: 'Pune', service: 'Product Photography', eventDate: '2026-08-02', budget: 'Rs. 25k', status: 'Open' },
    { customer: 'Neha Foods', phone: '9123456780', city: 'Bengaluru', service: 'Food Photography', eventDate: '2026-07-28', budget: 'Rs. 40k', status: 'Done' },
    { customer: 'Varun Mehta', phone: '9096820033', city: 'Delhi', service: 'Pre-Wedding', eventDate: '2026-09-06', budget: 'Rs. 55k', status: 'Open' }
  ];

  constructor(private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Sales Dashboard | Click-Kaar Lens', description: 'Sales person enquiry follow-up dashboard for Click-Kaar Lens.' });
  }

  get openCount(): number {
    return this.enquiries.filter((enquiry) => enquiry.status === 'Open').length;
  }

  get doneCount(): number {
    return this.enquiries.filter((enquiry) => enquiry.status === 'Done').length;
  }

  get topService(): string {
    return 'Wedding';
  }

  get filteredEnquiries(): SalesEnquiry[] {
    const term = this.search.trim().toLowerCase();
    return this.enquiries.filter((enquiry) => {
      const matchesStatus = this.statusFilter === 'All' || enquiry.status === this.statusFilter;
      const matchesSearch = !term || [enquiry.customer, enquiry.phone, enquiry.city, enquiry.service].some((value) => value.toLowerCase().includes(term));
      return matchesStatus && matchesSearch;
    });
  }

  markDone(enquiry: SalesEnquiry): void {
    enquiry.status = 'Done';
  }
}
