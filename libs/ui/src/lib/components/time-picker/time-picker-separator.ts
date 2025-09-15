import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

@Component({
  selector: 'span[sc-time-picker-separator]',
  imports: [],
  template: `
    <ng-content>{{ separator() }}</ng-content>
  `,
  host: {
    '[class]': 'class()',
    'data-slot': 'time-picker-separator',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTimePickerSeparator {
  readonly separator = input<string>(':');
  readonly classInput = input<string>('text-sm font-medium', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
