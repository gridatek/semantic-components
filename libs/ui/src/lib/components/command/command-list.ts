import { ComboboxWidget } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { bindInput, cn } from '../../utils';

@Directive({
  selector: 'div[scCommandList]',
  hostDirectives: [
    {
      directive: Listbox,
      inputs: ['value: values'],
      outputs: ['valueChange: valuesChange'],
    },
    ComboboxWidget,
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScCommandList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none',
      this.classInput(),
    ),
  );

  private readonly listbox = inject(Listbox);
  private readonly widget = inject(ComboboxWidget);

  constructor() {
    afterRenderEffect(() => this.listbox.scrollActiveItemIntoView());
    bindInput(this.widget.activeDescendant, this.listbox.activeDescendant);
  }
}
