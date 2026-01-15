import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'span[sc-select-value-legacy]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectValueLegacy {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  readonly placeholder = input<string>('');

  protected readonly class = computed(() => cn('pointer-events-none', this.classInput()));
}
