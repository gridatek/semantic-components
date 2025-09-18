import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FlexLayoutSizing } from './flex-layout-sizing';

@Component({
  selector: 'app-flex-layout-sizing-section',
  imports: [FlexLayoutSizing, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-flex-layout-sizing />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutSizingSection {
  readonly title = input<string>('Flex Sizing');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFlexLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-flex-layout-sizing',
  imports: [ScFlexLayout],
  template: \`
    <div class="space-y-8 w-full">
      <!-- Flex Basis -->
      <div>
        <h4 class="text-sm font-medium mb-2">Flex Basis</h4>
        <p class="text-xs text-gray-500 mb-4">
          Control the initial main size of flex items
        </p>
        <div class="w-full" sc-flex-layout direction="row" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center" sc-flex-layout basis="auto">
            basis="auto"
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center" sc-flex-layout basis="0">
            basis="0"
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center" sc-flex-layout basis="1">
            basis="1"
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center" sc-flex-layout basis="full">
            basis="full"
          </div>
        </div>
      </div>

      <!-- Flex Grow -->
      <div>
        <h4 class="text-sm font-medium mb-2">Flex Grow</h4>
        <p class="text-xs text-gray-500 mb-4">
          Allow flex items to grow to fill available space
        </p>
        <div class="w-full" sc-flex-layout direction="row" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
            No grow
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center" sc-flex-layout grow>
            grow="true"
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
            No grow
          </div>
        </div>
      </div>

      <!-- Flex Shrink -->
      <div>
        <h4 class="text-sm font-medium mb-2">Flex Shrink</h4>
        <p class="text-xs text-gray-500 mb-4">
          Control how flex items shrink when space is limited
        </p>
        <div class="w-96" sc-flex-layout direction="row" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center w-32">
            Default shrink behavior
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center w-32" sc-flex-layout shrink="false">
            shrink="false"
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center w-32">
            Default shrink
          </div>
        </div>
      </div>

      <!-- Combined Properties -->
      <div>
        <h4 class="text-sm font-medium mb-2">Combined Properties</h4>
        <p class="text-xs text-gray-500 mb-4">
          Using basis, grow, and shrink together
        </p>
        <div class="w-full" sc-flex-layout direction="row" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center" sc-flex-layout basis="auto">
            basis="auto"
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center" sc-flex-layout basis="0" grow>
            basis="0" grow
          </div>
          <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center" sc-flex-layout basis="1" shrink="false">
            basis="1" no shrink
          </div>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutSizing {}`;
}
