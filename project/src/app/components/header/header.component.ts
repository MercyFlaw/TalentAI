import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="bg-blue-600 text-white">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold">Talent Match AI</h1>
          </div>
          
          <nav class="hidden md:flex space-x-4">
            <a href="#" class="text-white hover:text-blue-200">Dashboard</a>
            <a href="#" class="text-white hover:text-blue-200">Match History</a>
            <a href="#" class="text-white hover:text-blue-200">Training Data</a>
          </nav>

          <button class="md:hidden p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {}