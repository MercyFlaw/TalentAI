import { Component, Output, EventEmitter } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AnalysisResult } from '../../services/gpt-analysis.service';
import { ResumeComparisonResult } from '../../services/resume-comparison.service';

/**
 * Component responsible for handling file uploads for both job descriptions and resumes
 * Manages the upload state and coordinates analysis between components
 */
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

            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 md:p-8 min-h-[300px] flex items-center justify-center">
              <div class="flex flex-col items-center space-y-4 sm:space-y-6">
                <svg class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                  <app-file-upload 
                    label="Upload Job Description" 
                    (analysisComplete)="onAnalysisComplete($event)"
                  />
                  <app-file-upload 
                    label="Upload Resume" 
                    [isOptional]="true"
                    [isDisabled]="!jobAnalysisComplete"
                    [isResumeUpload]="true"
                    [idealCandidateProfile]="analysisResult"
                    buttonClass="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    (comparisonComplete)="onResumeUploaded($event)"
                  />
                </div>
                <p class="text-[14px] sm:text-[16px] md:text-[18px] text-[#222222] text-center px-4">
                  Upload your job description and resume to assess role fit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class UploadSectionComponent {
  /** Event emitter for when job analysis is complete */
  @Output() analysisComplete = new EventEmitter<AnalysisResult>();
  
  /** Event emitter for when resume comparison is complete */
  @Output() comparisonComplete = new EventEmitter<ResumeComparisonResult>();
  
  /** Flag to track if job analysis is complete before allowing resume upload */
  jobAnalysisComplete = false;
  
  /** Stores the analysis result for the job description */
  analysisResult?: AnalysisResult;

  /**
   * Handles the completion of job description analysis
   * Resets comparison state and emits analysis results
   */
  onAnalysisComplete(result: AnalysisResult): void {
    console.log('Upload section: Analysis complete', result);
    this.comparisonComplete.emit(undefined);
    this.jobAnalysisComplete = true;
    this.analysisResult = result;
    this.analysisComplete.emit(result);
  }

  onResumeUploaded(result: ResumeComparisonResult): void {
    console.log('Upload section: Resume comparison complete', result);
    this.comparisonComplete.emit(result);
  }
}