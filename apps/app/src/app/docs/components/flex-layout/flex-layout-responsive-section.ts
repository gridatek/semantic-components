import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FlexLayoutResponsive } from './flex-layout-responsive';

@Component({
  selector: 'app-flex-layout-responsive-section',
  imports: [FlexLayoutResponsive, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-flex-layout-responsive />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutResponsiveSection {
  readonly title = input<string>('Responsive Layouts');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFlexLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-flex-layout-responsive',
  imports: [ScFlexLayout],
  template: \`
    <div class="space-y-8 w-full">
      <!-- Mobile First: Stack on mobile, row on medium+ -->
      <div>
        <h4 class="text-sm font-medium mb-2">Mobile First (Column → Row)</h4>
        <p class="text-xs text-gray-500 mb-4">direction="col" mdDirection="row" - Stacks on mobile, row on md+</p>
        <div class="w-full" sc-flex-layout direction="col" mdDirection="row" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center flex-1">Card 1</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center flex-1">Card 2</div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center flex-1">Card 3</div>
        </div>
      </div>

      <!-- Stack on Small Devices -->
      <div>
        <h4 class="text-sm font-medium mb-2">Stack on Small Devices</h4>
        <p class="text-xs text-gray-500 mb-4">
          direction="col" smDirection="row" - Column until sm, then row
        </p>
        <div class="w-full" sc-flex-layout direction="col" smDirection="row" gap="4">
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

      <!-- Desktop Only Row -->
      <div>
        <h4 class="text-sm font-medium mb-2">Desktop Only Row</h4>
        <p class="text-xs text-gray-500 mb-4">
          direction="col" lgDirection="row" - Column until lg, then row
        </p>
        <div class="w-full" sc-flex-layout direction="col" lgDirection="row" gap="4">
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

      <!-- Multiple Breakpoints -->
      <div>
        <h4 class="text-sm font-medium mb-2">Multiple Breakpoints</h4>
        <p class="text-xs text-gray-500 mb-4">direction="col" smDirection="row" lgDirection="col-reverse" - Changes at multiple breakpoints</p>
        <div class="w-full" sc-flex-layout direction="col" smDirection="row" lgDirection="col-reverse" gap="4">
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center flex-1">
            Item 1
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center flex-1">
            Item 2
          </div>
          <div class="bg-orange-100 dark:bg-orange-900 rounded-lg p-4 text-center flex-1">
            Item 3
          </div>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutResponsive {}`;
}
