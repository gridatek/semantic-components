import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { GridLayoutResponsive } from './grid-layout-responsive';

@Component({
  selector: 'app-grid-layout-responsive-section',
  imports: [GridLayoutResponsive, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-grid-layout-responsive />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutResponsiveSection {
  readonly title = input<string>('Responsive Grid');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGridLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-grid-layout-responsive',
  imports: [ScGridLayout],
  template: \`
    <div sc-grid-layout cols="1" smCols="2" mdCols="3" lgCols="4" gap="4" class="w-full">
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
        Responsive Item 1
      </div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
        Responsive Item 2
      </div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
        Responsive Item 3
      </div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
        Responsive Item 4
      </div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
        Responsive Item 5
      </div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
        Responsive Item 6
      </div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
        Responsive Item 7
      </div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
        Responsive Item 8
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutResponsive {}`;
}
