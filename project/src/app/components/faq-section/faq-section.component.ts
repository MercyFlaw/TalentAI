import { Component } from '@angular/core';
import { FaqItemComponent } from './faq-item/faq-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule, FaqItemComponent],
  template: `
    <section class="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-14">
        <div class="max-w-[1400px] mx-auto">
          <div class="mb-8">
            <h2 class="text-left text-[28px] xl:text-[36px] font-bold mb-2">Frequently Asked Questions</h2>
            <p class="text-left text-[18px] text-gray-600">Find answers to common questions about our AI-powered job matching platform</p>
          </div>
          <div class="border-t border-gray-200">
            <app-faq-item 
              *ngFor="let faq of faqs"
              [question]="faq.question"
              [answer]="faq.answer"
            />
          </div>
        </div>
      </div>
    </section>
  `
})
export class FaqSectionComponent {
  faqs = [
    {
      question: "How do I upload a job description?",
      answer: "To analyze a job posting, you'll need to upload it as a PDF file. You can easily create this by taking a screenshot of the job listing from any job board or company website, then saving it as a PDF. Alternatively, you can use your browser's 'Print to PDF' function when viewing the job posting. This ensures we get the complete job description for accurate analysis."
    },
    {
      question: "How accurate is the AI matching system?",
      answer: "Our AI system uses advanced natural language processing to analyze job requirements and resumes with high accuracy. However, we recommend using the analysis as a guide alongside your own judgment, as some nuanced aspects of experience may need human interpretation."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data security seriously. All uploaded documents are encrypted, processed securely, and automatically deleted after analysis. We never store your personal information or share it with third parties."
    },
    {
      question: "How long does the analysis take?",
      answer: "The analysis is typically completed within seconds. You'll receive instant insights about the ideal candidate profile after uploading a job description, and immediate match results if you choose to upload your resume."
    }
  ];
}