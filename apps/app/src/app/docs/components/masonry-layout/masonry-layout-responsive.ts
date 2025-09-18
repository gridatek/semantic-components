import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScMasonryLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-masonry-layout-responsive',
  imports: [ScMasonryLayout],
  template: `
    <div class="space-y-8 w-full">
      <!-- Mobile First Responsive -->
      <div>
        <h4 class="text-sm font-medium mb-2">Mobile First Responsive</h4>
        <p class="text-xs text-gray-500 mb-4">
          cols="1" mdCols="2" lgCols="3" - Single column on mobile, scales up on larger screens
        </p>
        <div class="w-full" sc-masonry-layout cols="1" mdCols="2" lgCols="3" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Gallery Item 1</h5>
            <div
              class="bg-blue-200 dark:bg-blue-800 rounded h-16 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Photo</span>
            </div>
            <p class="text-sm">Beautiful landscape photo from our travels.</p>
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Gallery Item 2</h5>
            <div
              class="bg-green-200 dark:bg-green-800 rounded h-24 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Portrait</span>
            </div>
            <p class="text-sm mb-2">Portrait session from last weekend.</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">Location: Central Park</p>
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Gallery Item 3</h5>
            <div
              class="bg-purple-200 dark:bg-purple-800 rounded h-20 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Architecture</span>
            </div>
            <p class="text-sm">Modern building design captured at sunset.</p>
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Gallery Item 4</h5>
            <div
              class="bg-orange-200 dark:bg-orange-800 rounded h-32 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Nature</span>
            </div>
            <p class="text-sm mb-2">Macro photography of local flora.</p>
            <div class="flex gap-2 text-xs">
              <span class="bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded">macro</span>
              <span class="bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded">nature</span>
            </div>
          </div>
          <div class="bg-red-100 dark:bg-red-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Gallery Item 5</h5>
            <div
              class="bg-red-200 dark:bg-red-800 rounded h-28 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Street</span>
            </div>
            <p class="text-sm">Candid street photography from downtown.</p>
          </div>
          <div class="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-4 mb-4 break-inside-avoid">
            <h5 class="font-medium mb-2">Gallery Item 6</h5>
            <div
              class="bg-yellow-200 dark:bg-yellow-800 rounded h-20 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Event</span>
            </div>
            <p class="text-sm">Wedding photography highlights.</p>
          </div>
        </div>
      </div>

      <!-- High Density Responsive -->
      <div>
        <h4 class="text-sm font-medium mb-2">High Density Layout</h4>
        <p class="text-xs text-gray-500 mb-4">
          cols="2" smCols="3" mdCols="4" lgCols="6" - Scales from 2 to 6 columns for maximum density
        </p>
        <div class="w-full" sc-masonry-layout cols="2" smCols="3" mdCols="4" lgCols="6" gap="2">
          <div class="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-3 mb-2 break-inside-avoid">
            <div
              class="bg-indigo-200 dark:bg-indigo-800 rounded h-12 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Thumb</span>
            </div>
            <p class="text-xs">Quick item 1</p>
          </div>
          <div class="bg-pink-100 dark:bg-pink-900 rounded-lg p-3 mb-2 break-inside-avoid">
            <div
              class="bg-pink-200 dark:bg-pink-800 rounded h-16 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Thumb</span>
            </div>
            <p class="text-xs">Quick item 2</p>
          </div>
          <div class="bg-teal-100 dark:bg-teal-900 rounded-lg p-3 mb-2 break-inside-avoid">
            <div
              class="bg-teal-200 dark:bg-teal-800 rounded h-14 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Thumb</span>
            </div>
            <p class="text-xs">Quick item 3</p>
          </div>
          <div class="bg-cyan-100 dark:bg-cyan-900 rounded-lg p-3 mb-2 break-inside-avoid">
            <div
              class="bg-cyan-200 dark:bg-cyan-800 rounded h-18 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Thumb</span>
            </div>
            <p class="text-xs">Quick item 4</p>
          </div>
          <div class="bg-emerald-100 dark:bg-emerald-900 rounded-lg p-3 mb-2 break-inside-avoid">
            <div
              class="bg-emerald-200 dark:bg-emerald-800 rounded h-12 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Thumb</span>
            </div>
            <p class="text-xs">Quick item 5</p>
          </div>
          <div class="bg-violet-100 dark:bg-violet-900 rounded-lg p-3 mb-2 break-inside-avoid">
            <div
              class="bg-violet-200 dark:bg-violet-800 rounded h-20 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Thumb</span>
            </div>
            <p class="text-xs">Quick item 6</p>
          </div>
          <div class="bg-rose-100 dark:bg-rose-900 rounded-lg p-3 mb-2 break-inside-avoid">
            <div
              class="bg-rose-200 dark:bg-rose-800 rounded h-14 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Thumb</span>
            </div>
            <p class="text-xs">Quick item 7</p>
          </div>
          <div class="bg-amber-100 dark:bg-amber-900 rounded-lg p-3 mb-2 break-inside-avoid">
            <div
              class="bg-amber-200 dark:bg-amber-800 rounded h-16 mb-2 flex items-center justify-center"
            >
              <span class="text-xs">Thumb</span>
            </div>
            <p class="text-xs">Quick item 8</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryLayoutResponsive {}
