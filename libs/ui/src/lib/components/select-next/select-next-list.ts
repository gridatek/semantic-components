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
import { injectPreset } from '../../config/preset';
import { bindInput, cn } from '../../utils';
import { SC_SELECT_NEXT } from './select-next-tokens';

/**
 * The options: a listbox, named by the select's label. Focus stays on the
 * trigger; the active option is announced through `aria-activedescendant`,
 * and only Enter, Space or a click selects.
 */
@Directive({
  selector: 'div[scSelectNextList]',
  hostDirectives: [Listbox, ComboboxWidget],
  host: {
    '[attr.aria-labelledby]': 'select.labelId()',
    '[attr.data-position]':
      'select.side() === "none" ? "item-aligned" : "popper"',
    '[class]': 'class()',
  },
})
export class ScSelectNextList {
  protected readonly select = inject(SC_SELECT_NEXT);
  private readonly listbox = inject<Listbox<string>>(Listbox);
  private readonly widget = inject(ComboboxWidget);
  private readonly styles = injectPreset().select;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('outline-none', this.styles.viewport, this.classInput()),
  );

  constructor() {
    bindInput(this.listbox.focusMode, 'activedescendant');
    bindInput(this.listbox.selectionMode, 'explicit');
    bindInput(this.widget.activeDescendant, this.listbox.activeDescendant);

    // select → listbox
    effect(() => {
      const value = this.select.value();
      untracked(() => this.listbox.value.set(value === '' ? [] : [value]));
    });

    // listbox → select
    effect(() => {
      const [value] = this.listbox.value();
      untracked(() => {
        if (value !== undefined) {
          if (value !== this.select.value()) this.select.select(value);
        } else if (this.select.hasValue()) {
          // Picking the current option toggles it off in a single-select
          // listbox; a select keeps its value instead.
          this.listbox.value.set([this.select.value()]);
          this.select.close();
        }
      });
    });
  }
}
