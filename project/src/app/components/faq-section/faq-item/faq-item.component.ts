import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border-b border-gray-200">
      <div class="py-8 px-6">
        <button 
          (click)="isOpen = !isOpen"
          class="w-full flex justify-between items-center"
        >
          <span class="text-[18px] font-semibold text-gray-800">{{ question }}</span>
          <svg 
            class="w-5 h-5 text-gray-400 transition-transform duration-200"
            [class.rotate-180]="isOpen"
            fill="none" 
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div 
          *ngIf="isOpen"
          class="mt-4 pr-12"
        >
          <p class="text-[18px] text-gray-600 leading-[27px]">{{ answer }}</p>
        </div>
      </div>
    </div>
  `
})
export class FaqItemComponent {
  @Input() question: string = '';
  @Input() answer: string = '';
  isOpen: boolean = false;
}