import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGridLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-grid-layout-sizing',
  imports: [ScGridLayout],
  template: `
    <div class="space-y-8 w-full">
      <!-- Auto Sizing -->
      <div>
        <h4 class="text-sm font-medium mb-2">Column Auto Sizing</h4>
        <div sc-grid-layout colSizing="auto" gap="4">
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">Short</div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">
            Much longer content here
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">Medium text</div>
        </div>
      </div>

      <!-- Min Content Sizing -->
      <div>
        <h4 class="text-sm font-medium mb-2">Column Min Content Sizing</h4>
        <div sc-grid-layout colSizing="min" gap="4">
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">Minimal</div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">
            This text will wrap to take minimum space
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center">Text</div>
        </div>
      </div>

      <!-- Fractional Units -->
      <div>
        <h4 class="text-sm font-medium mb-2">Column Fractional Sizing</h4>
        <div sc-grid-layout colSizing="fr" gap="4">
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">Equal</div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">Equal</div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">Equal</div>
        </div>
      </div>

      <!-- Rows with Auto Sizing -->
      <div>
        <h4 class="text-sm font-medium mb-2">Row Auto Sizing</h4>
        <div sc-grid-layout cols="2" rowSizing="auto" gap="4">
          <div class="bg-red-100 dark:bg-red-900 rounded-lg p-4 text-center">Short content</div>
          <div
            class="bg-red-100 dark:bg-red-900 rounded-lg p-4 text-center min-h-[120px] flex items-center"
          >
            Taller content that will make this row bigger
          </div>
          <div class="bg-red-100 dark:bg-red-900 rounded-lg p-4 text-center">Regular</div>
          <div class="bg-red-100 dark:bg-red-900 rounded-lg p-4 text-center">Regular</div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutSizing {}
