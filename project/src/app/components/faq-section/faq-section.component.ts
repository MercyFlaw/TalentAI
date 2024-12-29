import { Component } from '@angular/core';
import { FaqItemComponent } from './faq-item/faq-item.component';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [FaqItemComponent],
  template: `
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div class="max-w-3xl mx-auto space-y-4">
          <app-faq-item question="How accurate is the matching?" />
          <app-faq-item question="What file formats are supported?" />
        </div>
      </div>
    </section>
  `
})
export class FaqSectionComponent {}