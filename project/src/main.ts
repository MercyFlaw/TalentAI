import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeaderComponent } from './app/components/header/header.component';
import { UploadSectionComponent } from './app/components/upload-section/upload-section.component';
import { AnalysisSectionComponent } from './app/components/analysis-section/analysis-section.component';
import { InfoSectionComponent } from './app/components/info-section/info-section.component';
import { FaqSectionComponent } from './app/components/faq-section/faq-section.component';
import { ToolsSectionComponent } from './app/components/tools-section/tools-section.component';
import { FooterComponent } from './app/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UploadSectionComponent,
    AnalysisSectionComponent,
    InfoSectionComponent,
    FaqSectionComponent,
    ToolsSectionComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header />
      <main class="flex-grow">
        <app-upload-section />
        <app-analysis-section />
        <app-info-section />
        <app-faq-section />
        <app-tools-section />
      </main>
      <app-footer />
    </div>
  `
})
export class App {}

bootstrapApplication(App);