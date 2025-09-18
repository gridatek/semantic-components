import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { MasonryLayoutDemo } from './masonry-layout-demo';

@Component({
  selector: 'app-masonry-layout-demo-section',
  imports: [MasonryLayoutDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-masonry-layout-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryLayoutDemoSection {
  readonly title = input<string>('Masonry Layout');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScMasonryLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-masonry-layout-demo',
  imports: [ScMasonryLayout],
  template: \`
    <!-- Basic 3-column masonry -->
    <div sc-masonry-layout cols="3" gap="4">
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-4 break-inside-avoid">
        <h5 class="font-medium mb-2">Short Card</h5>
        <p class="text-sm">Brief content here.</p>
      </div>
      <div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 mb-4 break-inside-avoid">
        <h5 class="font-medium mb-2">Medium Card</h5>
        <p class="text-sm">
          This card has more content and will take up more vertical space.
        </p>
      </div>
      <div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 mb-4 break-inside-avoid">
        <h5 class="font-medium mb-2">Tall Card</h5>
        <p class="text-sm mb-2">
          This is a much taller card with even more content.
        </p>
        <p class="text-sm">Additional content paragraph.</p>
      </div>
      <!-- More cards... -->
    </div>

    <!-- 2-column layout -->
    <div sc-masonry-layout cols="2" gap="6">
      <div class="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-6 mb-6 break-inside-avoid">
        <h5 class="font-medium mb-3">Feature Showcase</h5>
        <p class="text-sm">Wider content in fewer columns.</p>
      </div>
      <!-- More content blocks... -->
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryLayoutDemo {}`;
}
