import { Combobox } from '@angular/aria/combobox';
import {
  Directive,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScComboboxList } from './combobox-list';
import { ScComboboxOrigin } from './combobox-origin';

@Directive({
  selector: 'div[scCombobox]',
  exportAs: 'scCombobox',
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['disabled', 'alwaysExpanded'],
    },
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScCombobox {
  readonly classInput = input<string>('', { alias: 'class' });

  /** The underlying aria combobox, for binding to `ngComboboxPopup`. */
  readonly comboboxRef = inject(Combobox);

  readonly selectedValue = computed(() => this.list()?.values()[0]);

  readonly hasValue = computed(() => this.selectedValue() !== undefined);

  private readonly list = contentChild(ScComboboxList, { descendants: true });
  readonly origin = contentChild.required(ScComboboxOrigin);

  protected readonly class = computed(() =>
    cn('relative flex w-full flex-col', this.classInput()),
  );
}
