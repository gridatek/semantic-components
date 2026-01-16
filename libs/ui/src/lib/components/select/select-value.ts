import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScSelectState } from './select-state';

@Component({
  selector: '[scSelectValue]',
  template: `
    {{ state.displayValue() }}
  `,
  host: {
    'data-slot': 'select-value',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectValue {
  protected readonly state = inject(ScSelectState);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'absolute left-3 line-clamp-1 flex flex-1 items-center gap-2 pointer-events-none',
      this.classInput(),
    ),
  );
}
