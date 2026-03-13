import { Combobox } from '@angular/aria/combobox';
import {
  Directive,
  computed,
  contentChild,
  effect,
  input,
  signal,
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
  readonly selectedLabel = signal('');

  private readonly list = contentChild(ScComboboxList, { descendants: true });
  readonly origin = contentChild.required(ScComboboxOrigin);

  constructor() {
    effect(() => {
      const list = this.list();
      if (!list) return;
      const values = list.values();
      if (values.length > 0) {
        this.selectedLabel.set(list.labelForValue(values[0]));
      } else {
        this.selectedLabel.set('');
      }
    });
  }

  protected readonly class = computed(() =>
    cn('relative flex w-full flex-col', this.classInput()),
  );
}
