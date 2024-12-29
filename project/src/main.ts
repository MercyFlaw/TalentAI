import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HeaderComponent } from './app/components/header/header.component';
import { UploadSectionComponent } from './app/components/upload-section/upload-section.component';
import { AnalysisSectionComponent } from './app/components/analysis-section/analysis-section.component';
import { InfoSectionComponent } from './app/components/info-section/info-section.component';
import { FaqSectionComponent } from './app/components/faq-section/faq-section.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { InstructionsSectionComponent } from './app/components/instructions-section/instructions-section.component';
import { ScrollService } from './app/services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UploadSectionComponent,
    InstructionsSectionComponent,
    AnalysisSectionComponent,
    InfoSectionComponent,
    FaqSectionComponent,
    FooterComponent
  ],
  providers: [ScrollService],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-header />
      <main class="flex-grow">
        <app-upload-section />
        <app-instructions-section />
        <app-analysis-section />
        <app-info-section />
        <app-faq-section />
      </main>
      <app-footer />
    </div>
  `
})
export class App {
  constructor(private scrollService: ScrollService) {}
}

bootstrapApplication(App);