import { ComboboxWidget } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import {
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { bindInput, cn } from '../../utils';
import { SC_SELECT } from './select-tokens';

@Component({
  selector: 'div[scSelectList]',
  template: `
    <ng-content />
  `,
  hostDirectives: [Listbox, ComboboxWidget],
  host: {
    'data-slot': 'select-list',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScSelectList {
  private readonly select = inject(SC_SELECT);
  private readonly listbox = inject<Listbox<string>>(Listbox);
  private readonly widget = inject(ComboboxWidget);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-full flex-col overflow-x-hidden overflow-y-auto',
      this.classInput(),
    ),
  );

  constructor() {
    // Focus stays on the trigger; the active option is announced through
    // aria-activedescendant, and only Enter/Space/click selects.
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
