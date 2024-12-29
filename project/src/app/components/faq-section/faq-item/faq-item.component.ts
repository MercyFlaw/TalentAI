import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mb-4">
      <button 
        (click)="isOpen = !isOpen"
        class="w-full px-8 py-6 text-left flex justify-between items-center group">
        <span class="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
          {{ question }}
        </span>
        <svg 
          class="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-all duration-300" 
          [class.rotate-180]="isOpen"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        *ngIf="isOpen" 
        class="px-8 py-6 border-t border-gray-100">
        <p class="text-gray-600 leading-relaxed">{{ answer }}</p>
      </div>
    </div>
  `
})
export class FaqItemComponent {
  @Input() question: string = '';
  @Input() answer: string = '';
  isOpen: boolean = false;
}