import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'div[sc-color-picker-swatch]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    '[style.backgroundColor]': 'color()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScColorPickerSwatch {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly color = input<string>('#000000');

  protected readonly class = computed(() =>
    cn('border border-border rounded-md shadow-sm', this.classInput()),
  );
}
