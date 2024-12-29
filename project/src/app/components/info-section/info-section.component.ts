import { Component } from '@angular/core';

@Component({
  selector: 'app-info-section',
  standalone: true,
  template: `
    <section class="py-16 bg-gradient-to-b from-white to-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800 font-display">
          Why Choose Our Platform?
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <!-- AI-Powered Matching -->
          <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div class="bg-blue-100 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800 text-center">AI-Powered Matching</h3>
            <p class="text-gray-600 text-center leading-relaxed">Advanced GPT analysis for precise matches and detailed insights</p>
          </div>

          <!-- Skill Analysis -->
          <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div class="bg-blue-100 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800 text-center">Skill Analysis</h3>
            <p class="text-gray-600 text-center leading-relaxed">Comprehensive skill matching with detailed scoring</p>
          </div>

          <!-- Quick Results -->
          <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div class="bg-blue-100 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800 text-center">Quick Results</h3>
            <p class="text-gray-600 text-center leading-relaxed">Get instant matching results and analysis</p>
          </div>

          <!-- Secure Analysis -->
          <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div class="bg-blue-100 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800 text-center">Secure Analysis</h3>
            <p class="text-gray-600 text-center leading-relaxed">Private and encrypted document handling</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class InfoSectionComponent {}