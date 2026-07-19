import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssignedProject, CrewOperationsService } from '../../../core/services/crew-operations.service';
import { LensSeoService } from '../../../core/services/lens-seo.service';

interface AvailabilityDay {
  date: Date;
  iso: string;
  disabled: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="admin-shell crew-dashboard-shell">
      <aside class="admin-sidebar">
        <strong>Crew Member</strong>
        <nav aria-label="Crew dashboard sections">
          <a href="#availability">Availability</a>
          <a href="#projects">Upcoming Projects</a>
        </nav>
      </aside>

      <main class="admin-main">
        <header class="admin-topbar">
          <div>
            <p>Crew Workspace</p>
            <h1>Availability & Assigned Projects</h1>
          </div>
          <div class="admin-identity">
            <span>crew&#64;click-kaar.com</span>
            <strong>{{ currentCrew.name }}</strong>
          </div>
        </header>

        <section class="admin-metrics" aria-label="Crew summary">
          <article>
            <span>Available dates</span>
            <strong>{{ currentMonthAvailableDates.length }}</strong>
            <em>Selected in current month</em>
          </article>
          <article>
            <span>Assigned projects</span>
            <strong>{{ assignedProjects.length }}</strong>
            <em>Upcoming coordinator assignments</em>
          </article>
          <article>
            <span>Rejected</span>
            <strong>{{ rejectedProjects.length }}</strong>
            <em>Projects declined with reason</em>
          </article>
          <article>
            <span>Role</span>
            <strong>{{ currentCrew.role }}</strong>
            <em>{{ currentCrew.city }}</em>
          </article>
        </section>

        <section class="admin-panel" id="availability">
          <div class="admin-panel-heading">
            <p>Current Month Availability</p>
            <h2>Click the dates you are available</h2>
          </div>

          <div class="availability-layout">
            <div class="availability-calendar">
              <div class="calendar-header">
                <button type="button" disabled>&lt;</button>
                <strong>{{ monthLabel }}</strong>
                <button type="button" disabled>&gt;</button>
              </div>
              <div class="calendar-weekdays">
                <span *ngFor="let day of weekdays">{{ day }}</span>
              </div>
              <div class="calendar-grid">
                <span class="calendar-empty" *ngFor="let empty of leadingEmptyDays"></span>
                <button
                  type="button"
                  class="calendar-day"
                  *ngFor="let day of calendarDays"
                  [class.selected]="isAvailable(day.iso)"
                  [disabled]="day.disabled"
                  (click)="toggleAvailability(day.iso)">
                  {{ day.date.getDate() }}
                </button>
              </div>
            </div>

            <div class="availability-note">
              <strong>Selected dates turn green.</strong>
              <p>Project co-ordinators can assign you only on dates you mark as available here.</p>
              <div class="selected-date-list">
                <span *ngFor="let date of currentMonthAvailableDates">{{ date }}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="admin-panel" id="projects">
          <div class="admin-panel-heading">
            <p>Upcoming Projects</p>
            <h2>Projects assigned by the project co-ordinator</h2>
          </div>

          <table class="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let project of assignedProjects">
                <td>{{ project.id }}</td>
                <td>{{ project.customer }}</td>
                <td>{{ project.service }}</td>
                <td>{{ project.eventDate }}</td>
                <td>{{ project.time }}</td>
                <td>{{ project.city }}</td>
                <td>
                  <div class="table-actions">
                    <button type="button" class="danger" (click)="startReject(project)">Reject</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p class="empty-state" *ngIf="!assignedProjects.length">No upcoming projects assigned right now.</p>

          <form class="reject-panel" *ngIf="rejectingProject" (ngSubmit)="confirmReject()">
            <div class="admin-panel-heading">
              <p>Reject Assigned Project</p>
              <h2>{{ rejectingProject.id }} - {{ rejectingProject.service }}</h2>
            </div>
            <label>Proper reason for rejection
              <textarea name="rejectReason" [(ngModel)]="rejectReason" placeholder="Explain why you cannot accept this assignment" required></textarea>
            </label>
            <div class="table-actions">
              <button type="submit" [disabled]="!rejectReason.trim()">Submit rejection</button>
              <button type="button" class="danger" (click)="cancelReject()">Cancel</button>
            </div>
          </form>

          <table class="admin-table" *ngIf="rejectedProjects.length">
            <thead><tr><th>Rejected project</th><th>Reason</th></tr></thead>
            <tbody>
              <tr *ngFor="let item of rejectedProjects"><td>{{ item.project.id }} - {{ item.project.service }}</td><td>{{ item.reason }}</td></tr>
            </tbody>
          </table>
        </section>
      </main>
    </section>
  `
})
export class CrewDashboardPageComponent implements OnInit {
  readonly weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  readonly today = new Date();
  readonly viewDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  rejectingProject?: AssignedProject;
  rejectReason = '';
  rejectedProjects: Array<{ project: AssignedProject; reason: string }> = [];

  constructor(private readonly operations: CrewOperationsService, private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Crew Dashboard | Click-Kaar Lens', description: 'Crew dashboard for availability and assigned project management.' });
  }

  get currentCrew() {
    return this.operations.crew.find((crew) => crew.id === this.operations.currentCrewId) || this.operations.crew[0];
  }

  get monthLabel(): string {
    return this.viewDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  }

  get leadingEmptyDays(): number[] {
    return Array.from({ length: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1).getDay() });
  }

  get calendarDays(): AvailabilityDay[] {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1);
      return { date, iso: this.toIsoDate(date), disabled: this.toIsoDate(date) < this.toIsoDate(this.today) };
    });
  }

  get currentMonthAvailableDates(): string[] {
    const monthPrefix = `${this.viewDate.getFullYear()}-${`${this.viewDate.getMonth() + 1}`.padStart(2, '0')}`;
    return this.currentCrew.availableDates.filter((date) => date.startsWith(monthPrefix)).sort();
  }

  get assignedProjects(): AssignedProject[] {
    return this.operations.assignedProjectsForCrew(this.currentCrew.id);
  }

  isAvailable(date: string): boolean {
    return this.operations.isCrewAvailable(this.currentCrew.id, date);
  }

  toggleAvailability(date: string): void {
    this.operations.setCrewAvailability(this.currentCrew.id, date, !this.isAvailable(date));
  }

  startReject(project: AssignedProject): void {
    this.rejectingProject = project;
    this.rejectReason = '';
  }

  cancelReject(): void {
    this.rejectingProject = undefined;
    this.rejectReason = '';
  }

  confirmReject(): void {
    if (!this.rejectingProject || !this.rejectReason.trim()) {
      return;
    }
    this.rejectedProjects = [...this.rejectedProjects, { project: this.rejectingProject, reason: this.rejectReason.trim() }];
    this.operations.rejectProject(this.rejectingProject.id, this.rejectReason.trim());
    this.cancelReject();
  }

  private toIsoDate(date: Date): string {
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }
}
