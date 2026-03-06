import { Directive, computed, forwardRef, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScCombobox } from './combobox';

@Directive({
  selector: 'button[scComboboxClear]',
  host: {
    'data-slot': 'combobox-clear',
    '[class]': 'class()',
    '[hidden]': '!hasValue()',
    type: 'button',
  },
})
export class ScComboboxClear {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(forwardRef(() => ScCombobox));

  readonly hasValue = computed(() => this.combobox.selectedLabel() !== '');

  protected readonly class = computed(() =>
    cn(
      'absolute right-7 flex size-4 items-center justify-center rounded-full opacity-50 hover:opacity-100 [&_svg]:size-3',
      this.classInput(),
    ),
  );
}
