import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  template: `
    <div class="bg-white rounded-lg shadow-md">
      <button class="w-full px-6 py-4 text-left flex justify-between items-center">
        <span class="font-semibold">{{ question }}</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  `
})
export class FaqItemComponent {
  @Input() question: string = '';
}