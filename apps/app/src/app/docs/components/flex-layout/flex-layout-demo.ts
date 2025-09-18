import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScFlexLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-flex-layout-demo',
  imports: [ScFlexLayout],
  template: `
    <div class="w-full" sc-flex-layout direction="row" justify="between" align="center" gap="4">
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">Item 1</div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">Item 2</div>
      <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">Item 3</div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexLayoutDemo {}
