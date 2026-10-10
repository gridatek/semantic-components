import { ComboboxWidget } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { bindInput, cn } from '../../utils';
import { SC_AUTOCOMPLETE } from './autocomplete-tokens';

@Directive({
  selector: 'div[scAutocompleteList]',
  hostDirectives: [Listbox, ComboboxWidget],
  host: {
    'data-slot': 'autocomplete-list',
    '[class]': 'class()',
  },
})
export class ScAutocompleteList {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly autocomplete = inject(SC_AUTOCOMPLETE);
  private readonly listbox = inject<Listbox<string>>(Listbox);
  private readonly widget = inject(ComboboxWidget);

  protected readonly class = computed(() =>
    cn('flex flex-col gap-0.5', this.classInput()),
  );

  constructor() {
    // Focus stays in the input; the active option is announced through
    // aria-activedescendant, and only Enter/click selects.
    bindInput(this.listbox.focusMode, 'activedescendant');
    bindInput(this.listbox.selectionMode, 'explicit');
    bindInput(this.widget.activeDescendant, this.listbox.activeDescendant);

    // Mark the option whose label matches the current text as selected.
    effect(() => {
      const text = this.autocomplete.value();
      untracked(() => {
        const value = this.autocomplete.optionValueFor(text);
        this.listbox.value.set(value === undefined ? [] : [value]);
      });
    });

    // listbox → autocomplete
    effect(() => {
      const [value] = this.listbox.value();
      untracked(() => {
        const text = this.autocomplete.value();
        if (value !== undefined) {
          if (this.autocomplete.labelFor(value) !== text) {
            this.autocomplete.select(value);
          }
          return;
        }
        const current = this.autocomplete.optionValueFor(text);
        if (current !== undefined) {
          // Picking the current option toggles it off in a single-select
          // listbox; keep the text and close instead.
          this.listbox.value.set([current]);
          this.autocomplete.close();
        }
      });
    });
  }
}
