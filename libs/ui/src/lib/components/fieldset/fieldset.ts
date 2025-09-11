import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'fieldset[sc-fieldset]',
  imports: [],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'fieldset',
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScFieldset {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      // '[&>*+[data-slot=field]]:mt-6 *:data-[slot=text]:mt-1',
      'space-y-2',
      this.classInput(),
    ),
  );
}
