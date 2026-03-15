import { Combobox } from '@angular/aria/combobox';
import { Directive, computed, contentChild, input } from '@angular/core';
import { cn } from '../../utils';
import { ScComboboxList } from './combobox-list';
import { ScComboboxOrigin } from './combobox-origin';

@Directive({
  selector: 'div[scCombobox]',
  exportAs: 'scCombobox',
  hostDirectives: [
    {
      directive: Combobox,
      inputs: [
        'filterMode',
        'disabled',
        'readonly',
        'firstMatch',
        'alwaysExpanded',
      ],
    },
  ],
  host: {
    'data-slot': 'combobox',
    '[class]': 'class()',
  },
})
export class ScCombobox {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly selectedValue = computed(() => this.list()?.values()[0]);

  readonly hasValue = computed(() => this.selectedValue() !== undefined);

  private readonly list = contentChild(ScComboboxList, { descendants: true });
  readonly origin = contentChild.required(ScComboboxOrigin);

  protected readonly class = computed(() =>
    cn('relative flex w-full flex-col', this.classInput()),
  );
}
