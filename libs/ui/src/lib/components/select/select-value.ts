import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_SELECT } from './select-tokens';

/**
 * Shows the selected option's label, or the select's placeholder.
 * Project content to customise how a selected value is rendered.
 */
@Component({
  selector: '[scSelectValue]',
  template: `
    @if (select.hasValue()) {
      <ng-content>{{ select.selectedLabel() }}</ng-content>
    } @else {
      {{ select.placeholder() }}
    }
  `,
  host: {
    'data-slot': 'select-value',
    '[attr.data-placeholder]': '!select.hasValue() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSelectValue {
  protected readonly select = inject(SC_SELECT);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex flex-1 text-start data-placeholder:text-muted-foreground',
      this.classInput(),
    ),
  );
}
