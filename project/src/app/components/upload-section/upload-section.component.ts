import { Component } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
  selector: 'app-upload-section',
  standalone: true,
  imports: [FileUploadComponent],
  template: `
    <section class="bg-blue-600 py-12 overflow-x-auto min-h-screen md:min-h-fit">
      <div class="flex justify-center min-w-full h-full">
        <div class="w-[95%] max-w-[1900px] h-full">
          <div class="bg-white p-8 md:p-12 rounded-lg shadow-lg min-h-[calc(100vh-6rem)] md:min-h-[450px] mx-4 md:mx-0">
            <div class="text-center mb-8">
              <h2 class="text-[36px] md:text-[44px] font-bold mb-2 text-[#222222]">Job Analysis</h2>
            </div>

            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 min-h-[400px] md:min-h-[300px] flex items-center justify-center">
              <div class="flex flex-col items-center space-y-6">
                <svg class="w-20 h-20 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <app-file-upload label="Upload Documents" />
                <p class="text-[16px] md:text-[18px] text-[#222222] text-center">Upload your job description and resume to assess role fit.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class UploadSectionComponent {}