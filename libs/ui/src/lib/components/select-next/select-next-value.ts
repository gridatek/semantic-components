import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_SELECT_NEXT } from './select-next-tokens';

/**
 * The selected option's label in the trigger, or the placeholder. Project
 * content to show a value your way.
 */
@Component({
  selector: 'span[scSelectNextValue]',
  template: `
    @if (select.hasValue()) {
      <ng-content>{{ select.selectedLabel() }}</ng-content>
    } @else {
      {{ placeholder() }}
    }
  `,
  host: {
    // Read by the trigger (its value's layout).
    'data-slot': 'select-value',
    '[attr.data-placeholder]': '!select.hasValue() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSelectNextValue {
  protected readonly select = inject(SC_SELECT_NEXT);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Shown while nothing is selected. */
  readonly placeholder = input('');

  protected readonly class = computed(() => cn(this.classInput()));
}
