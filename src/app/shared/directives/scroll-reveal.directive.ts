import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

type RevealVariant = 'fade-up' | 'slide-left' | 'slide-right' | 'scale';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  @Input('appScrollReveal') variant: RevealVariant = 'fade-up';
  private observer?: IntersectionObserver;

  constructor(private readonly element: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const host = this.element.nativeElement;
    host.classList.add('reveal-ready', `reveal-${this.variant || 'fade-up'}`);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      host.classList.add('reveal-in');
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          host.classList.add('reveal-in');
          this.observer?.disconnect();
          break;
        }
      }
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.16
    });

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
