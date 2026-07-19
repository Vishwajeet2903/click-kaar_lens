import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LensSeoService } from '../../../core/services/lens-seo.service';

interface PermissionItem {
  label: string;
  enabled: boolean;
}

interface RolePolicy {
  role: string;
  users: number;
  permissions: PermissionItem[];
}

interface Employee {
  name: string;
  email: string;
  role: string;
  blocked: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="admin-shell">
      <aside class="admin-sidebar">
        <strong>Super Admin</strong>
        <nav aria-label="Super admin sections">
          <a *ngFor="let section of sections" [href]="'#' + section.id">{{ section.label }}</a>
        </nav>
      </aside>

      <main class="admin-main">
        <header class="admin-topbar">
          <div>
            <p>Click-Kaar Lens Control Center</p>
            <h1>Platform Command Dashboard</h1>
          </div>
          <div class="admin-identity">
            <span>clickkaar&#64;lens.com</span>
            <strong>Protected Super Admin</strong>
          </div>
        </header>

        <section class="admin-metrics" aria-label="Platform analytics">
          <article *ngFor="let metric of metrics">
            <span>{{ metric.label }}</span>
            <strong>{{ metric.value }}</strong>
            <em>{{ metric.trend }}</em>
          </article>
        </section>

        <section class="admin-panel" id="rbac">
          <div class="admin-panel-heading">
            <p>Advanced User Management</p>
            <h2>Roles and strict access permissions</h2>
          </div>
          <form class="employee-form" (ngSubmit)="addEmployee()">
            <label>Employee name <input name="employeeName" [(ngModel)]="employeeDraft.name" maxlength="80" required /></label>
            <label>Email <input name="employeeEmail" [(ngModel)]="employeeDraft.email" type="email" maxlength="120" required /></label>
            <label>Employee role
              <select name="employeeRole" [(ngModel)]="employeeDraft.role" required>
                <option *ngFor="let role of employeeRoles" [value]="role">{{ role }}</option>
              </select>
            </label>
            <button class="btn primary" type="submit">Add employee</button>
          </form>
          <table class="admin-table" *ngIf="employees.length">
            <thead><tr><th>Employee</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <tr *ngFor="let employee of employees; let index = index">
                <td>{{ employee.name }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.role }}</td>
                <td><span class="status-pill" [class.blocked]="employee.blocked">{{ employee.blocked ? 'Blocked' : 'Active' }}</span></td>
                <td>
                  <div class="table-actions">
                    <button type="button" (click)="toggleEmployeeBlock(index)">{{ employee.blocked ? 'Unblock' : 'Block' }}</button>
                    <button type="button" class="danger" (click)="deleteEmployee(index)">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="role-grid">
            <article class="role-card" *ngFor="let policy of rolePolicies">
              <div>
                <strong>{{ policy.role }}</strong>
                <span>{{ policy.users }} active users</span>
              </div>
              <label class="toggle-row" *ngFor="let permission of policy.permissions">
                <input type="checkbox" [(ngModel)]="permission.enabled" />
                <span>{{ permission.label }}</span>
              </label>
            </article>
          </div>
        </section>

        <section class="admin-panel split-panel" id="finance">
          <div class="admin-panel-heading">
            <p>Financial & Payout Settings</p>
            <h2>Packages, commissions, gateways, revenue</h2>
          </div>
          <div class="settings-grid">
            <label>Wedding starter package <input type="number" [(ngModel)]="finance.weddingPackage" /></label>
            <label>Corporate starter package <input type="number" [(ngModel)]="finance.corporatePackage" /></label>
            <label>Freelancer commission % <input type="number" [(ngModel)]="finance.commissionRate" /></label>
            <label>Payment gateway
              <select [(ngModel)]="finance.gateway">
                <option>Stripe</option>
                <option>PayPal</option>
                <option>Razorpay</option>
              </select>
            </label>
          </div>
          <table class="admin-table">
            <thead><tr><th>Revenue stream</th><th>This month</th><th>Status</th></tr></thead>
            <tbody>
              <tr *ngFor="let item of revenue"><td>{{ item.name }}</td><td>{{ item.amount }}</td><td>{{ item.status }}</td></tr>
            </tbody>
          </table>
        </section>

        <section class="admin-panel" id="content">
          <div class="admin-panel-heading">
            <p>Content & Storage Governance</p>
            <h2>Portfolio approvals, watermarking, cloud storage</h2>
          </div>
          <div class="governance-grid">
            <article>
              <strong>Portfolio review queue</strong>
              <span>18 pending creator submissions</span>
              <button type="button" class="btn primary">Review queue</button>
            </article>
            <article>
              <strong>Global watermarking</strong>
              <label class="toggle-row"><input type="checkbox" [(ngModel)]="watermarkEnabled" /> Apply watermark to public previews</label>
              <label>Opacity <input type="range" min="10" max="80" [(ngModel)]="watermarkOpacity" /></label>
            </article>
            <article>
              <strong>Storage monitor</strong>
              <div class="storage-bar"><span [style.width.%]="storageUsed"></span></div>
              <em>{{ storageUsed }}% of cloud storage used</em>
            </article>
          </div>
        </section>

        <section class="admin-panel" id="disputes">
          <div class="admin-panel-heading">
            <p>Dispute & Booking Control</p>
            <h2>Cancellation policy and conflict review</h2>
          </div>
          <div class="settings-grid">
            <label>Client cancellation window
              <select [(ngModel)]="cancellationWindow">
                <option>24 hours</option>
                <option>48 hours</option>
                <option>7 days</option>
              </select>
            </label>
            <label>Creator no-show penalty <input type="number" [(ngModel)]="creatorPenalty" /></label>
          </div>
          <table class="admin-table">
            <thead><tr><th>Case</th><th>Booking</th><th>Evidence</th><th>Priority</th></tr></thead>
            <tbody>
              <tr *ngFor="let dispute of disputes"><td>{{ dispute.case }}</td><td>{{ dispute.booking }}</td><td>{{ dispute.evidence }}</td><td>{{ dispute.priority }}</td></tr>
            </tbody>
          </table>
        </section>

        <section class="admin-panel" id="security">
          <div class="admin-panel-heading">
            <p>Security & Audit Logs</p>
            <h2>Immutable admin history, backups, integrations</h2>
          </div>
          <div class="security-layout">
            <table class="admin-table">
              <thead><tr><th>Time</th><th>Admin</th><th>Action</th></tr></thead>
              <tbody>
                <tr *ngFor="let log of auditLogs"><td>{{ log.time }}</td><td>{{ log.admin }}</td><td>{{ log.action }}</td></tr>
              </tbody>
            </table>
            <div class="integration-panel">
              <label class="toggle-row"><input type="checkbox" [(ngModel)]="backupsEnabled" /> Nightly platform backups</label>
              <label class="toggle-row"><input type="checkbox" [(ngModel)]="apiAccessEnabled" /> API integration access</label>
              <button type="button" class="btn primary">Generate audit export</button>
            </div>
          </div>
        </section>

        <section class="admin-panel" id="analytics">
          <div class="admin-panel-heading">
            <p>Platform-Wide Analytics</p>
            <h2>Bookings, creators, genres, growth</h2>
          </div>
          <div class="analytics-grid">
            <article *ngFor="let genre of genres">
              <span>{{ genre.name }}</span>
              <div class="storage-bar"><span [style.width.%]="genre.share"></span></div>
              <strong>{{ genre.share }}%</strong>
            </article>
          </div>
        </section>
      </main>
    </section>
  `
})
export class SuperAdminDashboardPageComponent implements OnInit {
  sections = [
    { id: 'rbac', label: 'RBAC' },
    { id: 'finance', label: 'Finance' },
    { id: 'content', label: 'Content' },
    { id: 'disputes', label: 'Disputes' },
    { id: 'security', label: 'Security' },
    { id: 'analytics', label: 'Analytics' }
  ];
  metrics = [
    { label: 'Total bookings', value: '1,284', trend: '+18% month over month' },
    { label: 'Active creators', value: '342', trend: '42 verified this quarter' },
    { label: 'Revenue tracked', value: 'Rs. 18.6L', trend: '+11% from last month' },
    { label: 'Open disputes', value: '7', trend: '3 high priority' }
  ];
  rolePolicies: RolePolicy[] = [
    { role: 'Photographers', users: 126, permissions: this.permissions(true, true, false, false) },
    { role: 'Videographers', users: 84, permissions: this.permissions(true, true, false, false) },
    { role: 'Editors', users: 51, permissions: this.permissions(false, true, false, false) },
    { role: 'Clients', users: 1480, permissions: this.permissions(false, false, false, false) },
    { role: 'Standard Admins', users: 8, permissions: this.permissions(true, true, true, false) }
  ];
  employeeRoles = ['Sales Person', 'Project Manager', 'Project Co-ordinator'];
  employeeDraft: Employee = { name: '', email: '', role: this.employeeRoles[0], blocked: false };
  employees: Employee[] = [
    { name: 'Aarav Sharma', email: 'aarav.sales@click-kaar.com', role: 'Sales Person', blocked: false },
    { name: 'Nisha Mehta', email: 'nisha.pm@click-kaar.com', role: 'Project Manager', blocked: false },
    { name: 'Kabir Khan', email: 'kabir.coord@click-kaar.com', role: 'Project Co-ordinator', blocked: true }
  ];
  finance = { weddingPackage: 4999, corporatePackage: 7999, commissionRate: 18, gateway: 'Razorpay' };
  revenue = [
    { name: 'Bookings', amount: 'Rs. 14.2L', status: 'Healthy' },
    { name: 'Editing add-ons', amount: 'Rs. 2.8L', status: 'Growing' },
    { name: 'Creator payouts', amount: 'Rs. 7.6L', status: 'Scheduled' }
  ];
  watermarkEnabled = true;
  watermarkOpacity = 42;
  storageUsed = 68;
  cancellationWindow = '48 hours';
  creatorPenalty = 1500;
  disputes = [
    { case: 'Late delivery complaint', booking: 'CKL-24091', evidence: 'Chat and contract', priority: 'High' },
    { case: 'RAW file dispute', booking: 'CKL-24072', evidence: 'Upload history', priority: 'Medium' },
    { case: 'Cancellation refund', booking: 'CKL-24033', evidence: 'Payment trail', priority: 'Medium' }
  ];
  auditLogs = [
    { time: 'Today 10:42', admin: 'ops@click-kaar.com', action: 'Changed enquiry status' },
    { time: 'Today 09:10', admin: 'admin@click-kaar.com', action: 'Approved portfolio' },
    { time: 'Yesterday 18:24', admin: 'finance@click-kaar.com', action: 'Updated commission rate' }
  ];
  backupsEnabled = true;
  apiAccessEnabled = true;
  genres = [
    { name: 'Weddings', share: 42 },
    { name: 'Corporate', share: 24 },
    { name: 'Food', share: 14 },
    { name: 'Products', share: 12 },
    { name: 'Headshots', share: 8 }
  ];

  constructor(private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Super Admin Dashboard | Click-Kaar Lens', description: 'Platform control dashboard for Click-Kaar Lens super administrators.' });
  }

  addEmployee(): void {
    const name = this.employeeDraft.name.trim();
    const email = this.employeeDraft.email.trim();
    if (!name || !email || !this.employeeDraft.role) {
      return;
    }
    this.employees = [...this.employees, { name, email, role: this.employeeDraft.role, blocked: false }];
    this.employeeDraft = { name: '', email: '', role: this.employeeRoles[0], blocked: false };
  }

  toggleEmployeeBlock(index: number): void {
    this.employees = this.employees.map((employee, employeeIndex) => employeeIndex === index ? { ...employee, blocked: !employee.blocked } : employee);
  }

  deleteEmployee(index: number): void {
    this.employees = this.employees.filter((_, employeeIndex) => employeeIndex !== index);
  }

  private permissions(viewBookings: boolean, uploadContent: boolean, manageUsers: boolean, financialAccess: boolean): PermissionItem[] {
    return [
      { label: 'View bookings', enabled: viewBookings },
      { label: 'Upload or approve content', enabled: uploadContent },
      { label: 'Manage users and roles', enabled: manageUsers },
      { label: 'Financial and payout access', enabled: financialAccess }
    ];
  }
}
