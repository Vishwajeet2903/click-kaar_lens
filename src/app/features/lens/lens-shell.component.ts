import { DOCUMENT, CommonModule } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FloatingContactComponent } from '../../shared/components/lens-ui.components';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { businessCategories, occasionCategories } from './data/lens-content.data';

@Component({
  standalone: true,
  selector: 'app-lens-shell',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, FloatingContactComponent, ScrollRevealDirective],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/lens" aria-label="Click-Kaar Lens home">
        <img class="brand-logo" src="assets/images/lens/clickkaar-lens-logo.png" alt="Click-Kaar Lens" width="220" height="88" />
      </a>
      <button class="menu-toggle" type="button" [attr.aria-expanded]="mobileOpen" aria-controls="lens-nav" (click)="toggleMobile()">Menu</button>
      <nav id="lens-nav" [class.open]="mobileOpen" aria-label="Lens navigation">
        <a routerLink="/lens" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
        <div class="nav-group" (mouseenter)="openMenu = 'business'" (mouseleave)="openMenu = ''">
          <button type="button" [attr.aria-expanded]="openMenu === 'business'" (click)="toggleMenu('business')">Business</button>
          <div class="mega" *ngIf="openMenu === 'business'">
            <a *ngFor="let item of business" [routerLink]="['/lens/business', item.slug]">{{ item.title }}</a>
          </div>
        </div>
        <a routerLink="/lens/blog" routerLinkActive="active">Blog</a>
        <a routerLink="/lens/about" routerLinkActive="active">About</a>
        <a routerLink="/lens/contact" routerLinkActive="active">Contact</a>
        <a routerLink="/lens/join/photographer" routerLinkActive="active">Join Us</a>
        <a class="nav-cta" routerLink="/lens/contact">Enquire Now </a>
      </nav>
    </header>
    <main><router-outlet /></main>
    <footer class="site-footer">
      <div class="footer-shell">
        <section class="landing-footer" appScrollReveal="fade-up">
          <div class="footer-copy">
            <p class="eyebrow">Click-Kaar Lens</p>
            <h2>Ready to plan your next visual story?</h2>
            <div class="footer-actions">
              <a routerLink="/lens/services" class="footer-btn dark">Start exploring</a>
              <a routerLink="/lens/contact" class="footer-btn light">Talk to us</a>
            </div>
          </div>
        </section>
        <div class="footer-grid" appScrollReveal="fade-up">
          <nav aria-label="Occasion photography links"><h3>Occasions</h3><a *ngFor="let item of occasions" [routerLink]="['/lens/occasions', item.slug]">{{ item.shortTitle }}</a></nav>
          <nav aria-label="Business photography links"><h3>Business</h3><a *ngFor="let item of business" [routerLink]="['/lens/business', item.slug]">{{ item.shortTitle }}</a></nav>
          <nav aria-label="Company links"><h3>Company</h3><a routerLink="/lens/about">About us</a><a routerLink="/lens/contact">Contact</a><a routerLink="/lens/partners">Partners</a><a routerLink="/lens/legal/privacy">Privacy Policy</a></nav>
          <nav aria-label="Contact links"><h3>Support</h3><a [href]="'tel:' + phone">{{ phone }}</a><a [href]="'mailto:' + email">{{ email }}</a><a [href]="social.instagram" target="_blank" rel="noopener noreferrer">Instagram</a><button type="button" (click)="toTop()">Back to top</button></nav>
        </div>
        <div class="footer-bottom"><span>Copyright (c) 2026 CLICK-KAAR LLP.</span><a routerLink="/lens/legal/terms">Terms & Conditions</a></div>
      </div>
    </footer>
    <app-floating-contact />
  `
})
export class LensShellComponent {
  occasions = occasionCategories;
  business = businessCategories;
  mobileOpen = false;
  openMenu = '';
  phone = environment.contactPhone;
  email = environment.contactEmail;
  social = environment.socialLinks;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
    this.document.body.classList.toggle('nav-locked', this.mobileOpen);
  }

  toggleMenu(menu: string): void {
    this.openMenu = this.openMenu === menu ? '' : menu;
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.mobileOpen = false;
    this.openMenu = '';
    this.document.body.classList.remove('nav-locked');
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (!(event.target as HTMLElement).closest('.site-header')) {
      this.openMenu = '';
    }
  }

  toTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
