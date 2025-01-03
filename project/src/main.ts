import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './app/components/header/header.component';
import { UploadSectionComponent } from './app/components/upload-section/upload-section.component';
import { AnalysisSectionComponent } from './app/components/analysis-section/analysis-section.component';
import { InfoSectionComponent } from './app/components/info-section/info-section.component';
import { FaqSectionComponent } from './app/components/faq-section/faq-section.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { InstructionsSectionComponent } from './app/components/instructions-section/instructions-section.component';
import { IdealCandidateSectionComponent } from './app/components/ideal-candidate-section/ideal-candidate-section.component';
import { AnalysisResult } from './app/services/gpt-analysis.service';
import { ResumeComparisonResult } from './app/services/resume-comparison.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UploadSectionComponent,
    InstructionsSectionComponent,
    IdealCandidateSectionComponent,
    AnalysisSectionComponent,
    InfoSectionComponent,
    FaqSectionComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header />
      <main class="flex-grow">
        <app-upload-section 
          (analysisComplete)="onAnalysisComplete($event)"
          (comparisonComplete)="onComparisonComplete($event)" 
        />
        <app-ideal-candidate-section [analysis]="analysisResult" />
        <app-instructions-section />
        <app-analysis-section [comparisonResult]="comparisonResult" />
        <app-info-section />
        <app-faq-section />
      </main>
      <app-footer />
    </div>
  `
})
class App {
  analysisResult?: AnalysisResult;
  comparisonResult?: ResumeComparisonResult;

  onAnalysisComplete(result: AnalysisResult): void {
    this.analysisResult = result;
    console.log('Analysis Complete:', result);
  }

  onComparisonComplete(result: ResumeComparisonResult): void {
    this.comparisonResult = result;
    console.log('Comparison Complete:', result);
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));