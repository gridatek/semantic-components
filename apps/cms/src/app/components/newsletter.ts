import { Component } from '@angular/core';

@Component({
  selector: 'cms-newsletter',
  template: `
    <div class="max-w-md mx-auto">
      <h4 class="text-sm font-semibold text-gray-900 mb-3">Stay Updated</h4>
      <p class="text-xs text-muted-foreground mb-4">
        Get the latest updates and news about our CMS platform.
      </p>
      <form class="flex flex-col sm:flex-row gap-2">
        <input
          class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="email"
          placeholder="Enter your email"
        />
        <button
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  `,
  styles: ``,
})
export class CmsNewsletter {}
