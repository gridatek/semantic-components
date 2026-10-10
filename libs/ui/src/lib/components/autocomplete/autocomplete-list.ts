import { ComboboxWidget } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, cn } from '../../utils';

@Directive({
  selector: 'div[scAutocompleteList]',
  hostDirectives: [Listbox, ComboboxWidget],
  host: {
    '[class]': 'class()',
  },
})
export class ScAutocompleteList {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly listbox = inject(Listbox);
  private readonly widget = inject(ComboboxWidget);

  protected readonly class = computed(() =>
    cn('flex flex-col gap-0.5', this.classInput()),
  );

  constructor() {
    bindInput(this.widget.activeDescendant, this.listbox.activeDescendant);
  }
}
