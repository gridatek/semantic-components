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
      <!-- Mobile First: Stack on mobile, row on desktop -->
      <div>
        <h4 class="text-sm font-medium mb-2">Mobile First (Column → Row)</h4>
        <div class="w-full" sc-flex-layout responsive="mobile" gap="4">
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center flex-1">
            Card 1
          </div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center flex-1">
            Card 2
          </div>
          <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center flex-1">
            Card 3
          </div>
        </div>
      </div>

      <!-- Stack on Tablet -->
      <div>
        <h4 class="text-sm font-medium mb-2">Stack on Tablet</h4>
        <div class="w-full" sc-flex-layout responsive="stack-tablet" gap="4">
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center flex-1">
            Content A
          </div>
          <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center flex-1">
            Content B
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
