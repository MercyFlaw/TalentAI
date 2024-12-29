import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-analysis-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-8 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Match Score -->
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-4">Match Score</h3>
            <div class="flex items-center justify-center">
              <div class="relative w-32 h-32">
                <svg #scoreCircle class="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    stroke-width="8"
                    fill="none"
                  />
                  <circle
                    #progressCircle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#3b82f6"
                    stroke-width="8"
                    fill="none"
                    [attr.stroke-dasharray]="'352'"
                    stroke-dashoffset="352"
                    class="transition-all duration-1000"
                  />
                </svg>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span #scoreNumber class="text-3xl font-bold">0%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Ideal Skills -->
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-4">Required Skills</h3>
            <ul class="space-y-3">
              <li class="text-green-600">
                ★ Experience building large scale mobile applications using Swift
              </li>
              <li class="text-green-600">
                ★ 5+ years of iOS development experience
              </li>
              <li class="text-blue-800">
                ◆ Experience using Golang
              </li>
              <li class="text-blue-800">
                ◆ Experience with CI/CD pipelines
              </li>
            </ul>
          </div>

          <!-- Your Skills -->
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-semibold mb-4">Your Skills Match</h3>
            <ul class="space-y-3">
              <li class="text-red-500 flex items-start">
                <span class="mr-2">❌</span>
                <span>Experience building large scale mobile applications using Swift</span>
              </li>
              <li class="text-red-500 flex items-start">
                <span class="mr-2">❌</span>
                <span>5+ years of iOS development experience</span>
              </li>
              <li class="text-green-600 flex items-start">
                <span class="mr-2">✓</span>
                <span>Experience using Golang</span>
              </li>
              <li class="text-green-600 flex items-start">
                <span class="mr-2">✓</span>
                <span>Experience with CI/CD pipelines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AnalysisSectionComponent implements AfterViewInit {
  @ViewChild('progressCircle') progressCircle!: ElementRef;
  @ViewChild('scoreNumber') scoreNumber!: ElementRef;

  ngAfterViewInit() {
    ScrollTrigger.create({
      trigger: this.progressCircle.nativeElement,
      start: 'top center+=100',
      onEnter: () => this.animateScore()
    });
  }

  private animateScore(): void {
    const duration = 2;
    const targetScore = 75;
    
    gsap.to(this.progressCircle.nativeElement, {
      strokeDashoffset: 352 * (1 - targetScore/100),
      duration,
      ease: 'power2.out'
    });

    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetScore,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        this.scoreNumber.nativeElement.textContent = `${Math.round(obj.val)}%`;
      }
    });
  }
}