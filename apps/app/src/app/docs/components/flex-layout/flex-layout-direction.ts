import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFlexLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-flex-layout-direction',
  imports: [ScFlexLayout],
  template: `
    <div class="space-y-8 w-full">
      <!-- Row Direction -->
      <div>
        <h4 class="text-sm font-medium mb-2">Row Direction (Default)</h4>
        <div class="w-full" sc-flex-layout direction="row" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">1</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">2</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">3</div>
        </div>
      </div>

      <!-- Column Direction -->
      <div>
        <h4 class="text-sm font-medium mb-2">Column Direction</h4>
        <div class="w-full" sc-flex-layout direction="col" gap="4">
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">1</div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">2</div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">3</div>
        </div>
      </div>

      <!-- Row Reverse -->
      <div>
        <h4 class="text-sm font-medium mb-2">Row Reverse</h4>
        <div class="w-full" sc-flex-layout direction="row-reverse" gap="4">
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">1</div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">2</div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">3</div>
        </div>
      </div>

      <!-- Column Reverse -->
      <div>
        <h4 class="text-sm font-medium mb-2">Column Reverse</h4>
        <div class="w-full" sc-flex-layout direction="col-reverse" gap="4">
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">1</div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">2</div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">3</div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutDirection {}
