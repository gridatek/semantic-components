import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFlexLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-flex-layout-alignment',
  imports: [ScFlexLayout],
  template: `
    <div class="space-y-8 w-full">
      <!-- Justify Content -->
      <div>
        <h4 class="text-sm font-medium mb-4">Justify Content</h4>
        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 mb-2">justify="start"</p>
            <div
              class="w-full"
              class="border border-gray-200 dark:border-gray-700 rounded p-4"
              sc-flex-layout
              justify="start"
              gap="4"
            >
              <div class="bg-blue-100 dark:bg-blue-900 rounded p-2">1</div>
              <div class="bg-blue-100 dark:bg-blue-900 rounded p-2">2</div>
              <div class="bg-blue-100 dark:bg-blue-900 rounded p-2">3</div>
            </div>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-2">justify="center"</p>
            <div
              class="w-full"
              class="border border-gray-200 dark:border-gray-700 rounded p-4"
              sc-flex-layout
              justify="center"
              gap="4"
            >
              <div class="bg-green-100 dark:bg-green-900 rounded p-2">1</div>
              <div class="bg-green-100 dark:bg-green-900 rounded p-2">2</div>
              <div class="bg-green-100 dark:bg-green-900 rounded p-2">3</div>
            </div>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-2">justify="between"</p>
            <div
              class="w-full"
              class="border border-gray-200 dark:border-gray-700 rounded p-4"
              sc-flex-layout
              justify="between"
              gap="4"
            >
              <div class="bg-purple-100 dark:bg-purple-900 rounded p-2">1</div>
              <div class="bg-purple-100 dark:bg-purple-900 rounded p-2">2</div>
              <div class="bg-purple-100 dark:bg-purple-900 rounded p-2">3</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Align Items -->
      <div>
        <h4 class="text-sm font-medium mb-4">Align Items</h4>
        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 mb-2">align="start"</p>
            <div
              class="w-full"
              class="border border-gray-200 dark:border-gray-700 rounded p-4 h-24"
              sc-flex-layout
              align="start"
              gap="4"
            >
              <div class="bg-red-100 dark:bg-red-900 rounded p-2">Small</div>
              <div class="bg-red-100 dark:bg-red-900 rounded p-2 h-16 flex items-center">
                Taller
              </div>
              <div class="bg-red-100 dark:bg-red-900 rounded p-2">Small</div>
            </div>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-2">align="center"</p>
            <div
              class="w-full"
              class="border border-gray-200 dark:border-gray-700 rounded p-4 h-24"
              sc-flex-layout
              align="center"
              gap="4"
            >
              <div class="bg-orange-100 dark:bg-orange-900 rounded p-2">Small</div>
              <div class="bg-orange-100 dark:bg-orange-900 rounded p-2 h-16 flex items-center">
                Taller
              </div>
              <div class="bg-orange-100 dark:bg-orange-900 rounded p-2">Small</div>
            </div>
          </div>

          <div>
            <p class="text-xs text-gray-500 mb-2">align="stretch"</p>
            <div
              class="w-full"
              class="border border-gray-200 dark:border-gray-700 rounded p-4 h-24"
              sc-flex-layout
              align="stretch"
              gap="4"
            >
              <div class="bg-teal-100 dark:bg-teal-900 rounded p-2 flex items-center">
                Stretched
              </div>
              <div class="bg-teal-100 dark:bg-teal-900 rounded p-2 flex items-center">
                All Equal
              </div>
              <div class="bg-teal-100 dark:bg-teal-900 rounded p-2 flex items-center">Height</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutAlignment {}
