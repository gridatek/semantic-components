import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFlexLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-flex-layout-responsive',
  imports: [ScFlexLayout],
  template: `
    <div class="space-y-8 w-full">
      <!-- Mobile First: Stack on mobile, row on desktop -->
      <div>
        <h4 class="text-sm font-medium mb-2">Mobile First (Column → Row)</h4>
        <p class="text-xs text-gray-500 mb-4">responsive="mobile" - Stacks on mobile, row on md+</p>
        <div class="w-full" sc-flex-layout responsive="mobile" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center flex-1">Card 1</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center flex-1">Card 2</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center flex-1">Card 3</div>
        </div>
      </div>

      <!-- Stack on Tablet -->
      <div>
        <h4 class="text-sm font-medium mb-2">Stack on Tablet (Column → Row)</h4>
        <p class="text-xs text-gray-500 mb-4">
          responsive="stack-tablet" - Column until md, then row
        </p>
        <div class="w-full" sc-flex-layout responsive="stack-tablet" gap="4">
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center flex-1">
            Content A
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center flex-1">
            Content B
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center flex-1">
            Content C
          </div>
        </div>
      </div>

      <!-- Stack on Mobile -->
      <div>
        <h4 class="text-sm font-medium mb-2">Stack on Mobile Only (Column → Row)</h4>
        <p class="text-xs text-gray-500 mb-4">
          responsive="stack-mobile" - Column until lg, then row
        </p>
        <div class="w-full" sc-flex-layout responsive="stack-mobile" gap="4">
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center flex-1">
            Section 1
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center flex-1">
            Section 2
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center flex-1">
            Section 3
          </div>
        </div>
      </div>

      <!-- Always Row -->
      <div>
        <h4 class="text-sm font-medium mb-2">Always Row</h4>
        <p class="text-xs text-gray-500 mb-4">responsive="desktop" - Always row layout</p>
        <div class="w-full" sc-flex-layout responsive="desktop" gap="4">
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center flex-1">
            Always
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center flex-1">
            Horizontal
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center flex-1">
            Layout
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutResponsive {}
