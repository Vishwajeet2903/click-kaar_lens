import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LensSeoService } from '../../../core/services/lens-seo.service';

interface CrewRegistration {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  crewRole: string;
  portfolioUrl: string;
  experienceYears: number | null;
  shootCount: number | null;
  previousWork: string;
  camera1: string;
  camera2: string;
  lens1: string;
  lens2: string;
  lens3: string;
  equipmentDetails: string;
  noCameraDetails: string;
  editingSkill: string;
  readyToTravel: string;
  aboutYourself: string;
  source: string;
  hourlyRate: number | null;
  dayRate: number | null;
  documentType: string;
  documentNumber: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-section crew-register-page">
      <div class="crew-register-shell">
        <aside class="crew-register-copy">
          <p>Join the creator network</p>
          <h1>Crew member registration</h1>
          <span>Share your basic details, portfolio, equipment, travel availability and rate card so the Click-Kaar Lens team can review your profile.</span>
          <div class="crew-step-list">
            <button type="button" *ngFor="let label of stepLabels; let index = index" [class.active]="step === index" (click)="step = index">
              <b>{{ index + 1 }}</b>
              <span>{{ label }}</span>
            </button>
          </div>
        </aside>

        <form class="lens-form crew-register-card" (ngSubmit)="submit()">
          <header class="crew-register-top">
            <button class="crew-back" type="button" aria-label="Previous step" (click)="previous()" [disabled]="step === 0"></button>
            <div class="crew-progress" aria-label="Crew registration progress">
              <span [style.width.%]="progress"></span>
            </div>
            <strong>Step {{ step + 1 }} of {{ lastStep + 1 }}</strong>
          </header>

          <section class="crew-step" *ngIf="step === 0">
          <p class="crew-stage">Basic information</p>
          <h2>Crew member details</h2>
          <div class="crew-fields">
            <label>Full name <input name="fullName" [(ngModel)]="form.fullName" placeholder="add name" required /></label>
            <label>Phone number <input name="phone" [(ngModel)]="form.phone" placeholder="add mobile number" required /></label>
            <label>Email address <input name="email" [(ngModel)]="form.email" type="email" placeholder="add email" required /></label>
            <label>City / location <input name="city" [(ngModel)]="form.city" placeholder="add city" required /></label>
            <label>Crew role
              <select name="crewRole" [(ngModel)]="form.crewRole" required>
                <option>Photographer</option>
                <option>Videographer</option>
                <option>Editor</option>
                <option>Drone Operator</option>
                <option>Project Co-ordinator</option>
              </select>
            </label>
          </div>
          </section>

          <section class="crew-step" *ngIf="step === 1">
          <p class="crew-stage">Portfolio details</p>
          <h2>Experience and work categories</h2>
          <div class="crew-fields">
            <label>Portfolio link <input name="portfolioUrl" [(ngModel)]="form.portfolioUrl" type="url" placeholder="add url" /></label>
            <label>How many year of experience? <input name="experienceYears" [(ngModel)]="form.experienceYears" type="number" min="0" placeholder="add number" /></label>
            <label>Approx. number of shoot till date? <input name="shootCount" [(ngModel)]="form.shootCount" type="number" min="0" placeholder="add number" /></label>
          </div>

          <label class="crew-chip-label">Categories you already worked for?</label>
          <div class="crew-chip-grid">
            <button
              type="button"
              *ngFor="let category of categories"
              [class.selected]="selectedCategories.includes(category)"
              (click)="toggleCategory(category)">
              {{ category }}
            </button>
          </div>

          <label>Previously with whom you were working if yes please mention all details.
            <textarea name="previousWork" [(ngModel)]="form.previousWork" placeholder="describe"></textarea>
          </label>
          </section>

          <section class="crew-step" *ngIf="step === 2">
          <p class="crew-stage">Equipment details</p>
          <h2>Camera, lens and editing setup</h2>
          <div class="crew-fields">
            <label>Camera 1 <input name="camera1" [(ngModel)]="form.camera1" placeholder="add details" /></label>
            <div class="crew-upload-box"><span></span></div>
            <label>Camera 2 <input name="camera2" [(ngModel)]="form.camera2" placeholder="add details" /></label>
            <div class="crew-upload-box"><span></span></div>
            <label>Lens 1 <input name="lens1" [(ngModel)]="form.lens1" placeholder="add details" /></label>
            <label>Lens 2 <input name="lens2" [(ngModel)]="form.lens2" placeholder="add details" /></label>
            <label>Lens 3 <input name="lens3" [(ngModel)]="form.lens3" placeholder="add details" /></label>
          </div>
          <label>Additional equipment details including lights and other equipments
            <textarea name="equipmentDetails" [(ngModel)]="form.equipmentDetails" placeholder="add details"></textarea>
          </label>
          <label>In case if you don't have camera mention.
            <textarea name="noCameraDetails" [(ngModel)]="form.noCameraDetails" placeholder="add details"></textarea>
          </label>
          <label>Editing skill if yes please mention
            <textarea name="editingSkill" [(ngModel)]="form.editingSkill" placeholder="describe"></textarea>
          </label>
          </section>

          <section class="crew-step" *ngIf="step === 3">
          <p class="crew-note">Upload original document instead of photocopy or anything else.</p>
          <h2>Final stage</h2>
          <label class="crew-chip-label">Ready to travel</label>
          <div class="crew-choice-row">
            <button type="button" [class.selected]="form.readyToTravel === 'Yes'" (click)="form.readyToTravel = 'Yes'">Yes</button>
            <button type="button" [class.selected]="form.readyToTravel === 'No'" (click)="form.readyToTravel = 'No'">No</button>
          </div>
          <label>About yourself <textarea name="aboutYourself" [(ngModel)]="form.aboutYourself" placeholder="describe" required></textarea></label>
          <label>Source <input name="source" [(ngModel)]="form.source" placeholder="describe" /></label>
          <label>Expected per hour rate <input name="hourlyRate" [(ngModel)]="form.hourlyRate" type="number" min="0" placeholder="add cost" /></label>
          <label>Current per day rate (14 hours) <input name="dayRate" [(ngModel)]="form.dayRate" type="number" min="0" placeholder="add cost" /></label>
          <div class="crew-document-grid">
            <label>Document type
              <select name="documentType" [(ngModel)]="form.documentType">
                <option>Aadhaar Card</option>
                <option>PAN Card</option>
                <option>Passport</option>
                <option>Driving Licence</option>
              </select>
            </label>
            <label>Document number <input name="documentNumber" [(ngModel)]="form.documentNumber" placeholder="add document number" /></label>
            <div class="crew-upload-box document-upload"><span></span><strong>Original document upload</strong></div>
          </div>
          </section>

          <p class="form-status success" *ngIf="success">{{ success }}</p>

          <footer class="crew-actions">
            <button class="btn primary" type="button" *ngIf="step > 0" (click)="previous()">Previous</button>
            <button class="btn primary" type="button" *ngIf="step < lastStep" (click)="next()">Continue</button>
            <button class="btn primary" type="submit" *ngIf="step === lastStep">Submit</button>
          </footer>
        </form>
      </div>
    </section>
  `
})
export class CrewRegisterPageComponent implements OnInit {
  step = 0;
  readonly lastStep = 3;
  readonly stepLabels = ['Basic info', 'Portfolio', 'Equipment', 'Final stage'];
  success = '';
  categories = ['Personal', 'Event', 'Wedding', 'Portrait', 'Fashion', 'Fine art', 'Travel', 'Architectural', 'Wildlife', 'Product', 'Interior', 'Advertise or lifestyle', 'Photojournalism', 'Pet', 'Sports', 'aerial', 'scientific', 'stock'];
  selectedCategories: string[] = [];
  form: CrewRegistration = {
    fullName: '',
    phone: '',
    email: '',
    city: '',
    crewRole: 'Photographer',
    portfolioUrl: '',
    experienceYears: null,
    shootCount: null,
    previousWork: '',
    camera1: '',
    camera2: '',
    lens1: '',
    lens2: '',
    lens3: '',
    equipmentDetails: '',
    noCameraDetails: '',
    editingSkill: '',
    readyToTravel: 'Yes',
    aboutYourself: '',
    source: '',
    hourlyRate: null,
    dayRate: null,
    documentType: 'Aadhaar Card',
    documentNumber: ''
  };

  constructor(private readonly seo: LensSeoService) {}

  ngOnInit(): void {
    this.seo.update({ title: 'Crew Member Register | Click-Kaar Lens', description: 'Register as a Click-Kaar Lens crew member with basic details, portfolio, equipment, and rate information.' });
  }

  get progress(): number {
    return ((this.step + 1) / (this.lastStep + 1)) * 100;
  }

  next(): void {
    this.success = '';
    this.step = Math.min(this.step + 1, this.lastStep);
  }

  previous(): void {
    this.success = '';
    this.step = Math.max(this.step - 1, 0);
  }

  toggleCategory(category: string): void {
    this.selectedCategories = this.selectedCategories.includes(category)
      ? this.selectedCategories.filter((item) => item !== category)
      : [...this.selectedCategories, category];
  }

  submit(): void {
    this.success = 'Crew registration details saved for review.';
  }
}
