import { Component } from '@angular/core';

@Component({
  selector: 'app-tools-section',
  standalone: true,
  template: `
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8">Additional Features</h2>
        <div class="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <a href="#" class="block text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <span class="block font-semibold text-blue-600">Batch Analysis</span>
          </a>
          <a href="#" class="block text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <span class="block font-semibold text-blue-600">Export Reports</span>
          </a>
          <a href="#" class="block text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <span class="block font-semibold text-blue-600">Training Data</span>
          </a>
          <a href="#" class="block text-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <span class="block font-semibold text-blue-600">API Access</span>
          </a>
        </div>
      </div>
    </section>
  `
})
export class ToolsSectionComponent {}