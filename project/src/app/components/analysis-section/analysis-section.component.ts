import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComparisonResult } from '../../services/resume-comparison.service';

/**
 * Component that displays the resume analysis results
 * Shows match score and skills comparison in a visual format
 */
@Component({
  selector: 'app-analysis-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-8 sm:py-12 bg-white">
      <div class="container mx-auto px-4 sm:px-14">
        <div class="grid md:grid-cols-2 gap-6 sm:gap-12 max-w-[1400px] mx-auto">
          <!-- Match Score -->
          <div class="bg-white p-6 sm:p-10 rounded-lg shadow-lg">
            <h3 class="text-[28px] xl:text-[36px] font-semibold mb-6 text-[#2c2c2c]">Match Score</h3>
            <div class="flex items-center justify-center mb-6">
              <div class="relative w-36 h-36 sm:w-48 sm:h-48">
                <svg #scoreCircle class="transform -rotate-90 w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    [attr.r]="radius"
                    stroke="#e5e7eb"
                    stroke-width="8"
                    fill="none"
                  />
                  <circle
                    #progressCircle
                    cx="50%"
                    cy="50%"
                    [attr.r]="radius"
                    stroke="#3b82f6"
                    stroke-width="8"
                    fill="none"
                    [attr.stroke-dasharray]="circumference"
                    [attr.stroke-dashoffset]="dashOffset"
                    class="transition-all duration-1000"
                  />
                </svg>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span class="text-[28px] sm:text-[36px] font-bold text-[#2c2c2c]">
                    {{comparisonResult ? comparisonResult.matchScore + '%' : '0%'}}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Analysis -->
          <div class="bg-white p-6 sm:p-10 rounded-lg shadow-lg">
            <h3 class="text-[28px] xl:text-[36px] font-semibold mb-6 text-[#2c2c2c]">Skills Analysis</h3>
            <div class="space-y-6 sm:space-y-8">
              <ng-container *ngIf="comparisonResult; else defaultAnalysis">
                <!-- Matching Skills -->
                <div>
                  <h4 class="text-[18px] sm:text-[20px] font-medium text-green-600 mb-3 sm:mb-4">Matching Skills</h4>
                  <p class="text-[16px] leading-relaxed text-gray-700">
                    Your profile demonstrates strong alignment in: 
                    <span *ngFor="let skill of comparisonResult.skillsComparison.matching; let last = last">
                      <span class="text-green-700 font-medium">{{skill}}</span>{{last ? '' : ', '}}
                    </span>
                  </p>
                </div>

                <!-- Missing Skills -->
                <div>
                  <h4 class="text-[18px] sm:text-[20px] font-medium text-amber-600 mb-3 sm:mb-4">Areas for Development</h4>
                  <p class="text-[16px] leading-relaxed text-gray-700">
                    Consider focusing on: 
                    <span *ngFor="let skill of comparisonResult.skillsComparison.missing; let last = last">
                      <span class="text-amber-700 font-medium">{{skill}}</span>{{last ? '' : ', '}}
                    </span>
                  </p>
                </div>
              </ng-container>
              <ng-template #defaultAnalysis>
                <p class="text-gray-500 text-[16px]">Upload your resume to see skills analysis</p>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AnalysisSectionComponent implements OnChanges {
  @Input() comparisonResult?: ResumeComparisonResult;
  @ViewChild('progressCircle') progressCircle!: ElementRef;
  
  /** Progress circle radius calculation for SVG animation */
  radius = 88;
  
  /** Progress circle circumference calculation for SVG animation */
  circumference = 2 * Math.PI * this.radius;

  /**
   * Calculates the stroke dash offset for the progress circle
   * Used to animate the match score percentage
   */
  get dashOffset(): number {
    if (!this.comparisonResult) return this.circumference;
    const progress = this.comparisonResult.matchScore / 100;
    return this.circumference * (1 - progress);
  }

  ngOnChanges(): void {
    // Adjust radius for mobile screens
    this.radius = window.innerWidth < 640 ? 66 : 88;
    this.circumference = 2 * Math.PI * this.radius;
  }
}