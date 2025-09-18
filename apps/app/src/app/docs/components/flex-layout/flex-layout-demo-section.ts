import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { FlexLayoutDemo } from './flex-layout-demo';

@Component({
  selector: 'app-flex-layout-demo-section',
  imports: [FlexLayoutDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-flex-layout-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFlexLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-flex-layout-demo',
  imports: [ScFlexLayout],
  template: \`
    <div class="w-full" sc-flex-layout direction="row" justify="between" align="center" gap="4">
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
        Item 1
      </div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
        Item 2
      </div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
        Item 3
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutDemo {}`;
}
