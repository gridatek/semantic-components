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
import { SC_COMBOBOX } from './combobox-tokens';

@Directive({
  selector: 'div[scComboboxList]',
  hostDirectives: [Listbox, ComboboxWidget],
  host: {
    'data-slot': 'combobox-list',
    '[class]': 'class()',
  },
})
export class ScComboboxList {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly combobox = inject(SC_COMBOBOX);
  private readonly listbox = inject<Listbox<string>>(Listbox);
  private readonly widget = inject(ComboboxWidget);

  protected readonly class = computed(() =>
    cn(
      'flex max-h-64 scroll-py-1 flex-col gap-0.5 overflow-y-auto p-1',
      this.classInput(),
    ),
  );

  constructor() {
    // Focus stays in the search box; the active option is announced through
    // aria-activedescendant, and only Enter/click selects.
    bindInput(this.listbox.focusMode, 'activedescendant');
    bindInput(this.listbox.selectionMode, 'explicit');
    bindInput(this.widget.activeDescendant, this.listbox.activeDescendant);

    // combobox → listbox (re-applied when filtering brings the option back)
    effect(() => {
      this.combobox.rendered();
      const value = this.combobox.value();
      untracked(() => {
        const [current] = this.listbox.value();
        if (current !== value) {
          this.listbox.value.set(value === '' ? [] : [value]);
        }
      });
    });

    // listbox → combobox
    effect(() => {
      const [value] = this.listbox.value();
      untracked(() => {
        if (value !== undefined) {
          if (value !== this.combobox.value()) this.combobox.select(value);
        } else if (this.combobox.rendered().has(this.combobox.value())) {
          // Picking the current option toggles it off in a single-select
          // listbox; keep the value and close instead. (When the search
          // filters the option out, the listbox drops it too — ignore that.)
          this.listbox.value.set([this.combobox.value()]);
          this.combobox.close();
        }
      });
    });
  }
}
