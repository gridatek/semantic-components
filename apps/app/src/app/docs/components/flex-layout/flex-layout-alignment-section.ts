import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FlexLayoutAlignment } from './flex-layout-alignment';

@Component({
  selector: 'app-flex-layout-alignment-section',
  imports: [FlexLayoutAlignment, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-flex-layout-alignment />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutAlignmentSection {
  readonly title = input<string>('Flex Alignment');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFlexLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-flex-layout-alignment',
  imports: [ScFlexLayout],
  template: \`
    <div class="space-y-8 w-full">
      <!-- Justify Content Examples -->
      <div>
        <h4 class="text-sm font-medium mb-4">Justify Content</h4>
        <div class="space-y-4">
          <div>
            <p class="text-xs text-gray-500 mb-2">justify="start"</p>
            <div class="w-full" sc-flex-layout justify="start" gap="4" class="border rounded p-4">
              <div class="bg-blue-100 rounded p-2">1</div>
              <div class="bg-blue-100 rounded p-2">2</div>
              <div class="bg-blue-100 rounded p-2">3</div>
            </div>
          </div>
          <!-- More examples... -->
        </div>
      </div>

      <!-- Align Items Examples -->
      <div>
        <h4 class="text-sm font-medium mb-4">Align Items</h4>
        <!-- Examples with different heights to show alignment -->
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutAlignment {}`;
}
