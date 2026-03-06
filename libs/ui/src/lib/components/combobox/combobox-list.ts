import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  afterRenderEffect,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScComboboxItem } from './combobox-item';

@Directive({
  selector: 'div[scComboboxList]',
  hostDirectives: [
    {
      directive: Listbox,
      inputs: ['values'],
      outputs: ['valuesChange'],
    },
  ],
  host: {
    'data-slot': 'combobox-list',
    '[class]': 'class()',
  },
})
export class ScComboboxList {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly listbox = inject(Listbox);
  private readonly items = contentChildren(ScComboboxItem, {
    descendants: true,
  });

  readonly values = computed(() => this.listbox.values());

  labelForValue(value: unknown): string {
    const item = this.items().find((i) => i.itemValue() === value);
    return item?.itemLabel() ?? '';
  }

  protected readonly class = computed(() =>
    cn('flex max-h-52 flex-col gap-0.5 overflow-auto p-1', this.classInput()),
  );

  constructor() {
    afterRenderEffect(() => this.listbox.scrollActiveItemIntoView());
  }
}
