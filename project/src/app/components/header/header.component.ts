import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="bg-blue-600 text-white">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold tracking-wide">Talent Match AI</h1>
          </div>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {}