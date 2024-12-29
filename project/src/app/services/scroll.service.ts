import { Injectable, OnDestroy } from '@angular/core';
import Lenis from '@studio-freight/lenis';

@Injectable({
  providedIn: 'root'
})
export class ScrollService implements OnDestroy {
  private lenis: Lenis;

  constructor() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    this.animate();
  }

  private animate(): void {
    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  ngOnDestroy(): void {
    this.lenis.destroy();
  }
} 