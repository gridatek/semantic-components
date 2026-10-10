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
import { SC_COMMAND } from './command-tokens';

@Directive({
  selector: 'div[scCommandList]',
  hostDirectives: [Listbox, ComboboxWidget],
  host: {
    'data-slot': 'command-list',
    '[class]': 'class()',
  },
})
export class ScCommandList {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly command = inject(SC_COMMAND);
  private readonly listbox = inject<Listbox<string>>(Listbox);
  private readonly widget = inject(ComboboxWidget);

  protected readonly class = computed(() =>
    cn(
      'no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none',
      this.classInput(),
    ),
  );

  constructor() {
    // Focus stays in the input; the active item is announced through
    // aria-activedescendant, and Enter/click runs it.
    bindInput(this.listbox.focusMode, 'activedescendant');
    bindInput(this.listbox.selectionMode, 'explicit');
    bindInput(this.widget.activeDescendant, this.listbox.activeDescendant);

    // Commands are actions, not a value: run the picked item, then clear the
    // selection so the same item can be picked again.
    effect(() => {
      const [value] = this.listbox.value();
      if (value === undefined) return;
      untracked(() => {
        this.listbox.value.set([]);
        this.command.itemFor(value)?.select.emit();
      });
    });
  }
}
