import {
  Component,
  ViewEncapsulation,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { inputStyles } from '../input/input';
import { ScCombobox } from './combobox';

@Component({
  selector: '[scComboboxDisplayValue]',
  template: `
    {{ displayValue() }}
  `,
  host: {
    'data-slot': 'control',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScComboboxDisplayValue {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly displayValueFn = input<((value: unknown) => string) | undefined>(
    undefined,
  );

  private readonly combobox = inject(forwardRef(() => ScCombobox));

  readonly displayValue = computed(() => {
    const fn = this.displayValueFn();
    if (fn) {
      const value = this.combobox.selectedValue();
      return value !== undefined ? fn(value) : '';
    }
    return this.combobox.selectedValue();
  });

  protected readonly class = computed(() =>
    cn(
      inputStyles,
      'pointer-events-none flex items-center gap-1.5 truncate [&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );
}
