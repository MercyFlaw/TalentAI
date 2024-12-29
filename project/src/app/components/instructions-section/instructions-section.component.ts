import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructions-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold mb-2">How to Get Your Job Match Analysis?</h2>
            <p class="text-gray-600">Follow these steps to analyze the job requirements and your potential match:</p>
          </div>
          
          <!-- Desktop Layout -->
          <div class="hidden md:flex md:flex-col space-y-6">
            <div *ngFor="let step of steps" class="flex items-start">
              <span class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {{step.number}}
              </span>
              <div class="ml-4">
                <h3 class="font-semibold mb-1">{{step.title}}</h3>
                <p class="text-gray-600">{{step.description}}</p>
              </div>
            </div>
          </div>

          <!-- Mobile Layout with Dropdowns -->
          <div class="md:hidden space-y-4">
            <div *ngFor="let step of steps" class="bg-white rounded-lg shadow-sm border border-gray-100">
              <button 
                (click)="step.isOpen = !step.isOpen"
                class="w-full px-4 py-3 flex justify-between items-center"
              >
                <div class="flex items-center gap-3">
                  <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {{step.number}}
                  </span>
                  <h3 class="font-semibold">{{step.title}}</h3>
                </div>
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  [class.rotate-180]="step.isOpen"
                  fill="none" 
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div 
                *ngIf="step.isOpen"
                class="px-4 py-3 text-gray-600 border-t"
              >
                {{step.description}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class InstructionsSectionComponent {
  steps = [
    {
      number: 1,
      title: 'Upload Job Description',
      description: 'Upload the job posting in PDF format. Our AI will analyze the requirements to create an ideal candidate profile.',
      isOpen: false
    },
    {
      number: 2,
      title: 'Review Generated Profile',
      description: 'Once analyzed, review the AI-generated ideal candidate profile showing required skills, experience levels, and qualifications.',
      isOpen: false
    },
    {
      number: 3,
      title: 'Upload Your Resume (Optional)',
      description: 'To see how you match with the ideal profile, upload your resume for a detailed comparison analysis.',
      isOpen: false
    },
    {
      number: 4,
      title: 'View Match Results',
      description: 'Get your match score, detailed skills comparison, and see which requirements you meet or need to develop.',
      isOpen: false
    },
    {
      number: 5,
      title: 'Get Optimization Insights',
      description: 'Receive personalized suggestions on how to improve your resume and highlight relevant experience using optimal keywords.',
      isOpen: false
    },
    {
      number: 6,
      title: 'Review Action Items',
      description: 'Get specific recommendations on skill development and experience presentation to better align with the role requirements.',
      isOpen: false
    }
  ];
} 