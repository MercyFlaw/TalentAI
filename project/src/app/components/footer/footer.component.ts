import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-semibold mb-4"></h3>
            <ul class="space-y-2">
              <li></li>
              <li></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4"></h3>
            <ul class="space-y-2">
              <li></li>
              <li></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4"></h3>
            <ul class="space-y-2">
              <li></li>
              <li></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-4"></h3>
            <ul class="space-y-2">
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}