import { ComboboxWidget } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import { Directive, computed, effect, inject, input } from '@angular/core';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { cn } from '../../utils';

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
    effect(() =>
      signalSetFn(
        this.widget.activeDescendant[SIGNAL],
        this.listbox.activeDescendant(),
      ),
    );
  }
}
