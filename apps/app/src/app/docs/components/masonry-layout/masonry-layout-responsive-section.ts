import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { MasonryLayoutResponsive } from './masonry-layout-responsive';

@Component({
  selector: 'app-masonry-layout-responsive-section',
  imports: [MasonryLayoutResponsive, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-masonry-layout-responsive />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryLayoutResponsiveSection {
  readonly title = input<string>('Responsive Masonry');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScMasonryLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-masonry-layout-responsive',
  imports: [ScMasonryLayout],
  template: \`
    <!-- Mobile first: 1 column → 2 → 3 columns -->
    <div sc-masonry-layout cols="1" mdCols="2" lgCols="3" gap="4">
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-4 break-inside-avoid">
        <h5 class="font-medium mb-2">Gallery Item 1</h5>
        <div class="bg-blue-200 dark:bg-blue-800 rounded h-16 mb-2"></div>
        <p class="text-sm">Beautiful landscape photo from our travels.</p>
      </div>
      <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 mb-4 break-inside-avoid">
        <h5 class="font-medium mb-2">Gallery Item 2</h5>
        <div class="bg-green-200 dark:bg-green-800 rounded h-24 mb-2"></div>
        <p class="text-sm mb-2">Portrait session from last weekend.</p>
        <p class="text-sm text-gray-600">Location: Central Park</p>
      </div>
      <!-- More gallery items... -->
    </div>

    <!-- High density: 2 → 3 → 4 → 6 columns -->
    <div sc-masonry-layout cols="2" smCols="3" mdCols="4" lgCols="6" gap="2">
      <div class="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-3 mb-2 break-inside-avoid">
        <div class="bg-indigo-200 dark:bg-indigo-800 rounded h-12 mb-2"></div>
        <p class="text-xs">Quick item 1</p>
      </div>
      <!-- More quick items... -->
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryLayoutResponsive {}`;
}
