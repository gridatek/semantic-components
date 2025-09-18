import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { GridLayoutDemo } from './grid-layout-demo';

@Component({
  selector: 'app-grid-layout-demo-section',
  imports: [GridLayoutDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-grid-layout-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGridLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-grid-layout-demo',
  imports: [ScGridLayout],
  template: \`
    <div sc-grid-layout cols="3" gap="4" class="w-full">
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
        Item 1
      </div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
        Item 2
      </div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
        Item 3
      </div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
        Item 4
      </div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
        Item 5
      </div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
        Item 6
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutDemo {}`;
}
