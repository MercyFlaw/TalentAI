import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
                <svg class="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    stroke-width="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#3b82f6"
                    stroke-width="8"
                    fill="none"
                    [attr.stroke-dasharray]="'352'"
                    [attr.stroke-dashoffset]="352 * (1 - 0.75)"
                    class="transition-all duration-1000"
                  />
                </svg>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span class="text-3xl font-bold">75%</span>
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
export class AnalysisSectionComponent {}