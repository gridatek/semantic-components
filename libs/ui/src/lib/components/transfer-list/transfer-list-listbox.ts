import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { bindInput } from '../../utils/bind-input/bind-input';
import { cn } from '../../utils/cn/cn';
import { ScTransferListPane } from './transfer-list-pane';

/**
 * A side's items: a listbox, many selectable — ↑ ↓ Home End and typeahead,
 * Space selects, Shift extends, Ctrl+A all; Enter moves the selection to
 * the other side. One Tab stop. Name it (`aria-labelledby` its title).
 */
@Directive({
  selector: '[scTransferListListbox]',
  hostDirectives: [Listbox],
  host: {
    'data-slot': 'transfer-list-listbox',
    '[class]': 'class()',
    '(keydown.enter)': 'onEnter($event)',
    '(focusout)': 'pane.list.touch.emit()',
  },
})
export class ScTransferListListbox {
  protected readonly pane = inject(ScTransferListPane);
  private readonly listbox = inject<Listbox<string>>(Listbox);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-72 flex-col gap-0.5 overflow-y-auto p-1 outline-none',
      'focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTransferListListbox');
    bindInput(this.listbox.multi, true);
    bindInput(this.listbox.selectionMode, 'explicit');
    bindInput(
      this.listbox.disabled,
      computed(() => this.pane.list.disabled()),
    );
    // The pane's selection, into the listbox; and back.
    effect(() => {
      const selected = this.pane.selected();
      untracked(() => {
        if (!same(this.listbox.value(), selected)) {
          this.listbox.value.set([...selected]);
        }
      });
    });
    effect(() => {
      const value = this.listbox.value();
      untracked(() => {
        if (!same(this.pane.selected(), value))
          this.pane.selected.set([...value]);
      });
    });
  }

  protected onEnter(event: Event): void {
    event.preventDefault();
    this.pane.moveSelected();
  }
}

const same = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((id) => b.includes(id));
