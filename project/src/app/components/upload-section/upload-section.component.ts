import { Component } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
  selector: 'app-upload-section',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <section class="bg-gray-50 py-12">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold mb-2">Job Role Analysis</h2>
              <p class="text-gray-600">Get insights about the ideal candidate profile for this role</p>
            </div>
            
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold mb-3">1. Upload Job Description</h3>
                <app-file-upload label="Job Description" />
              </div>
              
              <div>
                <h3 class="text-lg font-semibold mb-3">2. Compare Your Resume (Optional)</h3>
                <p class="text-gray-600 mb-3">After analyzing the ideal candidate profile, you can compare your resume to see how it matches.</p>
                <app-file-upload label="Resume" [isOptional]="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class UploadSectionComponent {}