import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full max-w-[280px] md:max-w-none">
      <button 
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-8 md:px-16 py-3 md:py-4 flex items-center justify-center gap-2 md:gap-3 transition-colors"
      >
        <svg class="w-6 md:w-7 h-6 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
        </svg>
        <span class="text-[14px] md:text-[18px] whitespace-nowrap">{{ label }}</span>
      </button>
    </div>
  `
})
export class FileUploadComponent {
  @Input() label: string = '';
  @Input() isOptional: boolean = false;
}