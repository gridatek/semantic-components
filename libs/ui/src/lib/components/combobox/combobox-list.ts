import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';

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

  protected readonly class = computed(() =>
    cn('flex max-h-52 flex-col gap-0.5 overflow-auto p-1', this.classInput()),
  );

  private readonly listbox = inject(Listbox);

  constructor() {
    afterRenderEffect(() => this.listbox.scrollActiveItemIntoView());
  }
}
