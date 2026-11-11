import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScComboboxNextBase } from './combobox-next-base';

/**
 * The selected value's label in a trigger, or the placeholder. Project
 * content to show a value your way.
 */
@Component({
  selector: 'span[scComboboxNextValue]',
  template: `
    @if (root.hasValue()) {
      <ng-content>{{ root.selectedLabel() }}</ng-content>
    } @else {
      {{ placeholder() }}
    }
  `,
  host: {
    'data-slot': 'combobox-value',
    '[attr.data-placeholder]': 'root.hasValue() ? null : ""',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScComboboxNextValue {
  protected readonly root = inject(ScComboboxNextBase);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Shown while nothing is selected. */
  readonly placeholder = input('');

  protected readonly class = computed(() =>
    cn(
      'truncate',
      !this.root.hasValue() && 'text-muted-foreground',
      this.classInput(),
    ),
  );
}
