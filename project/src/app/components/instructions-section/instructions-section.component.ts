import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component that displays step-by-step instructions for using the application
 * Provides both desktop and mobile-friendly layouts
 */
@Component({
  selector: 'app-instructions-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 bg-white">
      <div class="container mx-auto px-14 max-w-[1400px] min-h-[669px] h-auto">
        <div class="w-full">
          <div class="mb-8">
            <h2 class="text-left text-[28px] xl:text-[36px] font-bold mb-2 text-[#2c2c2c]">How to Get Your Job Match Analysis?</h2>
            <p class="text-left text-[18px] text-[#2c2c2c]">Follow these steps to analyze the job requirements and your potential match:</p>
          </div>
          
          <!-- Desktop Layout -->
          <div class="hidden md:flex md:flex-col leading-[27px]">
            <div *ngFor="let step of steps" class="border-t border-gray-200">
              <div class="py-8 px-6">
                <div class="flex gap-4">
                  <span class="text-[28px] font-bold text-blue-600">{{step.number}}</span>
                  <p class="text-[#2c2c2c] text-[18px] flex-1">{{step.description}}</p>
                </div>
              </div>
            </div>
            <div class="border-t border-gray-200"></div>
          </div>

          <!-- Mobile Layout -->
          <div class="md:hidden leading-[27px]">
            <div *ngFor="let step of steps" class="border-t border-gray-200">
              <div class="py-8 px-4">
                <div class="flex gap-3">
                  <span class="text-[18px] font-bold text-blue-600">{{step.number}}.</span>
                  <p class="text-[#2c2c2c] text-[18px]">{{step.description}}</p>
                </div>
              </div>
            </div>
            <div class="border-t border-gray-200"></div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class InstructionsSectionComponent {
  /** 
   * Defines the steps for using the application
   * Each step includes a number, title, and description
   */
  steps = [
    {
      number: 1,
      title: 'Upload Job Description',
      description: 'Upload the job posting in PDF format.',
    },
    {
      number: 2,
      title: 'Review Generated Profile',
      description: 'Once analyzed, review the AI-generated ideal candidate profile.',
    },
    {
      number: 3,
      title: 'Upload Your Resume (Optional)',
      description: 'Upload your resume for a detailed comparison analysis.',
    },
    {
      number: 4,
      title: 'View Match Results',
      description: 'Get your match score and detailed skills comparison.',
    },
    {
      number: 5,
      title: 'Get Optimization Insights',
      description: 'Receive personalized suggestions on how to improve your resume.',
    }
  ];
} 