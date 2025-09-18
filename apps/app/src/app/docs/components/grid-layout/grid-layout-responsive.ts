import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScGridLayout } from '@semantic-components/ui';

@Component({
  selector: 'app-grid-layout-responsive',
  imports: [ScGridLayout],
  template: `
    <div class="w-full" sc-grid-layout cols="1" smCols="2" mdCols="3" lgCols="4" gap="4">
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">Responsive Item 1</div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">Responsive Item 2</div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">Responsive Item 3</div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">Responsive Item 4</div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">Responsive Item 5</div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">Responsive Item 6</div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">Responsive Item 7</div>
      <div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">Responsive Item 8</div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridLayoutResponsive {}
