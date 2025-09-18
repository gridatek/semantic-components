import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGridLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-grid-layout-flow',
  imports: [ScGridLayout],
  template: `
    <div class="space-y-8 w-full">
      <!-- Row Flow (Default) -->
      <div>
        <h4 class="text-sm font-medium mb-2">Row Flow (Default)</h4>
        <div sc-grid-layout cols="3" flow="row" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">1</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">2</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">3</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">4</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">5</div>
        </div>
      </div>

      <!-- Column Flow -->
      <div>
        <h4 class="text-sm font-medium mb-2">Column Flow</h4>
        <div sc-grid-layout rows="3" flow="col" gap="4">
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">1</div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">2</div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">3</div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">4</div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">5</div>
        </div>
      </div>

      <!-- Dense Packing -->
      <div>
        <h4 class="text-sm font-medium mb-2">Dense Packing</h4>
        <div sc-grid-layout cols="4" flow="dense" gap="4">
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">1</div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center col-span-2">
            2 (span 2)
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">3</div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">4</div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">5</div>
        </div>
      </div>

      <!-- Row Dense -->
      <div>
        <h4 class="text-sm font-medium mb-2">Row Dense Packing</h4>
        <div sc-grid-layout cols="3" flow="row-dense" gap="4">
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">1</div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center col-span-2">
            2 (span 2)
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">3</div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">4</div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutFlow {}
