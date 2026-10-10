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
import { SC_MULTISELECT } from './multiselect-tokens';

const sameValues = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((value, i) => value === b[i]);

@Component({
  selector: 'div[scMultiselectList]',
  template: `
    <ng-content />
  `,
  hostDirectives: [Listbox, ComboboxWidget],
  host: {
    'data-slot': 'multiselect-list',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMultiselectList {
  private readonly multiselect = inject(SC_MULTISELECT);
  private readonly listbox = inject<Listbox<string>>(Listbox);
  private readonly widget = inject(ComboboxWidget);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex max-h-44 flex-col gap-0.5 overflow-auto', this.classInput()),
  );

  constructor() {
    // Focus stays on the trigger; the active option is announced through
    // aria-activedescendant, and only Enter/Space/click toggles an option.
    bindInput(this.listbox.multi, true);
    bindInput(this.listbox.focusMode, 'activedescendant');
    bindInput(this.listbox.selectionMode, 'explicit');
    bindInput(this.widget.activeDescendant, this.listbox.activeDescendant);

    // multiselect → listbox
    effect(() => {
      const values = this.multiselect.value();
      untracked(() => {
        if (!sameValues(values, this.listbox.value())) {
          this.listbox.value.set([...values]);
        }
      });
    });

    // listbox → multiselect (the popup stays open while toggling)
    effect(() => {
      const values = this.listbox.value();
      untracked(() => {
        if (!sameValues(values, this.multiselect.value())) {
          this.multiselect.value.set([...values]);
        }
      });
    });
  }
}
