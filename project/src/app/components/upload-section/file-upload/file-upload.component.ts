import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'border-2 border-dashed rounded-lg p-6 ' + (isOptional ? 'bg-yellow-50 border-yellow-300' : 'border-gray-300')">
      <div class="text-center">
        <svg class="mx-auto w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="text-[18px] text-gray-600 mb-2">
          Upload {{ label }}
          <span *ngIf="isOptional" class="text-yellow-600 text-sm">(Optional)</span>
        </p>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-[18px]">
          Select {{ label }}
        </button>
      </div>
    </div>
  `
})
export class FileUploadComponent {
  @Input() label: string = '';
  @Input() isOptional: boolean = false;
}