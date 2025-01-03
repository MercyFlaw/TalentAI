import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component that displays the platform's key features and benefits
 * Uses a responsive grid layout with feature cards
 */
@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-14">
        <div class="max-w-[1400px] mx-auto">
          <div class="mb-8">
            <h2 class="text-left text-[28px] xl:text-[36px] font-bold mb-2 text-[#2c2c2c]">Why Choose Our Platform?</h2>
            <p class="text-left text-[18px] text-[#2c2c2c]">Experience the power of AI-driven job matching technology</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <div class="flex justify-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 class="text-[18px] font-bold mb-3 text-[#2c2c2c]">AI-Powered Matching</h3>
              <p class="text-[18px] text-[#2c2c2c] leading-[27px]">Advanced GPT analysis for precise matches and detailed insights</p>
            </div>

            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <div class="flex justify-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 class="text-[18px] font-bold mb-3 text-[#2c2c2c]">Instant Results</h3>
              <p class="text-[18px] text-[#2c2c2c] leading-[27px]">Get immediate feedback and analysis of your job match potential</p>
            </div>

            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <div class="flex justify-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 class="text-[18px] font-bold mb-3 text-[#2c2c2c]">Secure Processing</h3>
              <p class="text-[18px] text-[#2c2c2c] leading-[27px]">Your data is encrypted and automatically deleted after analysis</p>
            </div>

            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
              <div class="flex justify-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <h3 class="text-[18px] font-bold mb-3 text-[#2c2c2c]">Detailed Analytics</h3>
              <p class="text-[18px] text-[#2c2c2c] leading-[27px]">Get comprehensive insights and improvement suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class InfoSectionComponent {}