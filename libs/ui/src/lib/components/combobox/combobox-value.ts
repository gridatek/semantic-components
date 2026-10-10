import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_COMBOBOX } from './combobox-tokens';

/**
 * Shows the selected option's label, or the combobox's placeholder.
 * Project content to customise how a selected value is rendered.
 */
@Component({
  selector: '[scComboboxValue]',
  template: `
    @if (combobox.hasValue()) {
      <ng-content>{{ combobox.selectedLabel() }}</ng-content>
    } @else {
      {{ combobox.placeholder() }}
    }
  `,
  host: {
    'data-slot': 'select-value',
    '[attr.data-placeholder]': '!combobox.hasValue() || null',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScComboboxValue {
  protected readonly combobox = inject(SC_COMBOBOX);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex flex-1 text-start data-placeholder:text-muted-foreground',
      this.classInput(),
    ),
  );
}
