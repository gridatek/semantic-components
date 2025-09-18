import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGridLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-grid-layout-demo',
  imports: [ScGridLayout],
  template: `
    <div class="w-full" sc-grid-layout cols="3" gap="4">
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">Item 1</div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">Item 2</div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">Item 3</div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">Item 4</div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">Item 5</div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">Item 6</div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutDemo {}
