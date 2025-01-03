import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GptAnalysisService } from '../../../services/gpt-analysis.service';
import { ResumeComparisonService, ResumeComparisonResult } from '../../../services/resume-comparison.service';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { AnalysisResult } from '../../../services/gpt-analysis.service';

// Configure PDF.js worker
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

/**
 * Component handling file uploads for both job descriptions and resumes
 * Manages file processing, validation, and upload states
 */
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full max-w-[280px] md:max-w-none">
      <input
        type="file"
        accept=".pdf,.txt"
        class="hidden"
        #fileInput
        (change)="onFileSelected($event)"
      >
      
      <ng-container *ngIf="!isAnalyzing && !error && !analysisSuccess; else statusTemplate">
        <button 
          (click)="fileInput.click()"
          [disabled]="isDisabled"
          [class]="'w-full ' + buttonClass + ' text-white font-semibold rounded-full px-4 sm:px-8 py-2 sm:py-3 flex items-center justify-center gap-1 sm:gap-2 transition-colors'"
        >
          <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
          </svg>
          <span class="text-[14px] sm:text-[16px] md:text-[18px] whitespace-nowrap">
            {{ label }}{{ isOptional ? ' (Optional)' : '' }}
          </span>
        </button>
      </ng-container>

      <ng-template #statusTemplate>
        <div class="w-full">
          <div class="flex flex-col items-center justify-center space-y-4">
            <!-- Loading State -->
            <ng-container *ngIf="isAnalyzing">
              <div class="relative w-12 h-12">
                <div class="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
                <div class="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <div class="text-center">
                <p class="text-[16px] sm:text-[18px] text-[#2c2c2c]">This may take a few moments...</p>
              </div>
            </ng-container>

            <!-- Success State -->
            <ng-container *ngIf="analysisSuccess">
              <div class="text-center">
                <div class="mb-4">
                  <svg class="w-12 h-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-[18px] font-semibold text-[#2c2c2c] mb-2">{{ isResumeUpload ? 'Match Analysis Complete!' : 'Job Analysis Complete!' }}</p>
                <p class="text-[16px] text-[#2c2c2c] mb-4">Scroll down to view your results</p>
                <button 
                  (click)="resetState(); fileInput.click()"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-2 text-[16px] transition-colors"
                >
                  {{ isResumeUpload ? 'Compare Another Resume' : 'Analyze New Job Description' }}
                </button>
              </div>
            </ng-container>

            <!-- Error State -->
            <ng-container *ngIf="error">
              <div class="text-center">
                <div class="mb-4">
                  <svg class="w-12 h-12 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p class="text-[18px] font-semibold text-[#2c2c2c] mb-2">Analysis Failed</p>
                <p class="text-[16px] text-[#2c2c2c] mb-4">{{ errorMessage }}</p>
                <button 
                  (click)="resetState()"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-2 text-[16px] transition-colors"
                >
                  Try Again
                </button>
              </div>
            </ng-container>
          </div>
        </div>
      </ng-template>
    </div>
  `
})
export class FileUploadComponent {
  /** Label text for the upload button */
  @Input() label = '';
  
  /** Indicates if this is a resume upload instance */
  @Input() isResumeUpload = false;
  
  /** Indicates if the upload is optional */
  @Input() isOptional = false;
  
  /** Controls if the upload button is disabled */
  @Input() isDisabled = false;
  
  /** Custom CSS classes for styling the button */
  @Input() buttonClass = 'bg-blue-600 hover:bg-blue-700';
  
  /** Reference to the ideal candidate profile for resume comparison */
  @Input() idealCandidateProfile?: AnalysisResult;

  /** Emits when file analysis is complete */
  @Output() analysisComplete = new EventEmitter<AnalysisResult>();
  
  /** Emits when resume comparison is complete */
  @Output() comparisonComplete = new EventEmitter<ResumeComparisonResult>();

  /** State variables for managing upload process */
  isAnalyzing = false;
  error = false;
  errorMessage = '';
  analysisSuccess = false;
  private jobDescriptionText: string = '';

  constructor(
    private gptAnalysisService: GptAnalysisService,
    private resumeComparisonService: ResumeComparisonService
  ) {}


  /** Resets component state for new upload attempt */
  resetState() {
    this.error = false;
    this.errorMessage = '';
    this.isAnalyzing = false;
    this.analysisSuccess = false;
  }

  /** Handles file selection and starts analysis */
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.isAnalyzing = true;
    this.error = false;

    try {
      const text = await this.readFileAsText(file);
      
      if (this.isResumeUpload) {
        console.log('Starting resume comparison...');
        if (!this.isResumeUpload) {
          this.jobDescriptionText = text;
        }
        this.resumeComparisonService.compareResumes(text, this.jobDescriptionText)
          .subscribe({
            next: (result) => {
              console.log('Resume comparison complete:', result);
              this.isAnalyzing = false;
              this.analysisSuccess = true;
              this.comparisonComplete.emit(result);
            },
            error: (error) => {
              console.error('Resume comparison failed:', error);
              this.handleError(error);
            }
          });
      } else {
        console.log('Starting job description analysis...');
        this.jobDescriptionText = text;
        this.gptAnalysisService.analyzeJobDescription(text)
          .subscribe({
            next: (result) => {
              console.log('Job description analysis complete:', result);
              this.isAnalyzing = false;
              this.analysisSuccess = true;
              this.analysisComplete.emit(result);
            },
            error: (error) => {
              console.error('Job description analysis failed:', error);
              this.handleError(error);
            }
          });
      }
    } catch (error) {
      console.error('File reading failed:', error);
      this.handleError(error);
    }
  }

  /** Reads a file as text and returns a promise */
  private readFileAsText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (file.type === 'text/plain') {
        // Handle text files
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
      } else if (file.type === 'application/pdf') {
        // Handle PDF files
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const pdfData = new Uint8Array(e.target?.result as ArrayBuffer);
            const pdf = await getDocument({ data: pdfData }).promise;
            let fullText = '';
            
            // Get all pages
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
              fullText += pageText + '\n';
            }
            
            resolve(fullText);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = (e) => reject(e);
        reader.readAsArrayBuffer(file);
      } else {
        reject(new Error('Unsupported file type'));
      }
    });
  }

  private handleError(error: any) {
    this.isAnalyzing = false;
    this.error = true;
    this.errorMessage = 'Please try uploading a different file or check if the file contains valid job description text.';
  }
}