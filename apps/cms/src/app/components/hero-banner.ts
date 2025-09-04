import { Component } from '@angular/core';

@Component({
  selector: 'cms-hero-banner',
  template: `
    <div class="text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 p-8">
      <h1 class="text-4xl font-bold mb-4">Welcome to CMS</h1>
      <p class="text-xl">A powerful content management system built with semantic components</p>
    </div>
  `,
  styles: ``,
})
export class CmsHeroBanner {}
