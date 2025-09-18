import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScMasonryLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-masonry-layout-demo',
  imports: [ScMasonryLayout],
  template: `
    <div class="space-y-8 w-full">
      <!-- Basic Masonry -->
      <div>
        <h4 class="text-sm font-medium mb-2">Basic Masonry Layout</h4>
        <p class="text-xs text-gray-500 mb-4">
          Simple 3-column masonry layout with varied content heights
        </p>
        <div class="w-full" sc-masonry-layout cols="3" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Short Card</h5>
            <p class="text-sm">Brief content here.</p>
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Medium Card</h5>
            <p class="text-sm">
              This card has more content and will take up more vertical space in the masonry layout.
              The layout automatically adjusts to fit the content.
            </p>
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Tall Card</h5>
            <p class="text-sm mb-2">
              This is a much taller card with even more content. The masonry layout will distribute
              these cards across columns to create a balanced, Pinterest-style layout.
            </p>
            <p class="text-sm mb-2">
              Additional paragraph to make this card significantly taller than the others.
            </p>
            <div class="bg-purple-200 dark:bg-purple-800 rounded p-2">
              <p class="text-xs">Nested content block</p>
            </div>
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Another Short</h5>
            <p class="text-sm">Quick content.</p>
          </div>
          <div class="bg-red-100 dark:bg-red-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Variable Height</h5>
            <p class="text-sm mb-2">
              This card demonstrates how masonry layouts handle content of varying heights
              gracefully.
            </p>
            <ul class="text-sm space-y-1">
              <li>• Feature one</li>
              <li>• Feature two</li>
              <li>• Feature three</li>
            </ul>
          </div>
          <div class="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Image Card</h5>
            <div
              class="bg-yellow-200 dark:bg-yellow-800 rounded h-20 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Image Placeholder</span>
            </div>
            <p class="text-sm">Card with image content.</p>
          </div>
        </div>
      </div>

      <!-- Different Column Count -->
      <div>
        <h4 class="text-sm font-medium mb-2">Two Column Layout</h4>
        <p class="text-xs text-gray-500 mb-4">Fewer columns for wider content</p>
        <div class="w-full" sc-masonry-layout cols="2" gap="6">
          <div class="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-6 mb-6 break-inside-avoid">
            <h5 class="font-medium mb-3">Feature Showcase</h5>
            <p class="text-sm mb-3">
              With fewer columns, each item gets more horizontal space to display content. This is
              ideal for feature cards or detailed content blocks.
            </p>
            <div class="space-y-2">
              <div class="bg-indigo-200 dark:bg-indigo-800 rounded p-2">
                <p class="text-xs font-medium">Feature A</p>
              </div>
              <div class="bg-indigo-200 dark:bg-indigo-800 rounded p-2">
                <p class="text-xs font-medium">Feature B</p>
              </div>
            </div>
          </div>
          <div class="bg-pink-100 dark:bg-pink-900 rounded-lg p-6 mb-6 break-inside-avoid">
            <h5 class="font-medium mb-3">Content Block</h5>
            <p class="text-sm">
              Another content block that will flow naturally in the masonry layout.
            </p>
          </div>
          <div class="bg-teal-100 dark:bg-teal-900 rounded-lg p-6 mb-6 break-inside-avoid">
            <h5 class="font-medium mb-3">Extended Content</h5>
            <p class="text-sm mb-3">
              This block has more content to demonstrate how the masonry layout handles varying
              content heights in a two-column configuration.
            </p>
            <p class="text-sm mb-3">
              The layout will automatically balance the columns to create an aesthetically pleasing
              arrangement.
            </p>
            <div class="bg-teal-200 dark:bg-teal-800 rounded p-3">
              <p class="text-xs">Call-out section</p>
            </div>
          </div>
          <div class="bg-cyan-100 dark:bg-cyan-900 rounded-lg p-6 mb-6 break-inside-avoid">
            <h5 class="font-medium mb-3">Final Block</h5>
            <p class="text-sm">Last content block in this two-column masonry demonstration.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryLayoutDemo {}
