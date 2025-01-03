// scroll.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import Lenis from '@studio-freight/lenis';

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  private lenis: Lenis | null = null;

  constructor() {
    // Initialize after a brief delay to ensure DOM is ready
    setTimeout(() => {
      this.initializeLenis();
    }, 0);
  }

  private initializeLenis(): void {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1
    });

    this.startRaf();
  }

  private startRaf(): void {
    const raf = (time: number): void => {
      this.lenis?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  scrollTo(target: string | HTMLElement, options?: { offset?: number }): void {
    this.lenis?.scrollTo(target, { offset: options?.offset || 0 });
  }

  stop(): void {
    this.lenis?.stop();
  }

  start(): void {
    this.lenis?.start();
  }

  ngOnDestroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
  }
}
