import { Listbox } from '@angular/aria/listbox';
import {
  Directive,
  booleanAttribute,
  effect,
  input,
  model,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { ScListboxBase } from './listbox-base';

/**
 * A list to choose one option from, always in view — a `[formField]`, its
 * value the option's (or `null`). Selection follows focus by default
 * (`activation`); `deselectable` lets the selected option be pressed off.
 * Name it (its field's label, or `aria-label`). `#list="scListbox"`:
 * `clear()`, `focus()`.
 */
@Directive({
  selector: 'div[scListbox]:not([multiple])',
  exportAs: 'scListbox',
  hostDirectives: [Listbox],
  providers: [{ provide: ScListboxBase, useExisting: ScListbox }],
})
export class ScListbox<T = string>
  extends ScListboxBase<T>
  implements FormValueControl<T | null>
{
  readonly ɵmultiple = false;

  /** The option chosen: two-way, or `[formField]`. */
  readonly value = model<T | null>(null);
  /** The selected option, pressed again, is no longer chosen. */
  readonly deselectable = input(false, { transform: booleanAttribute });

  constructor() {
    super();
    // The value, into the listbox; and back — never empty but on purpose.
    effect(() => {
      const value = this.value();
      untracked(() => {
        const chosen = this.listbox.value();
        if (value === null ? chosen.length : chosen[0] !== value)
          this.listbox.value.set(value === null ? [] : [value]);
      });
    });
    effect(() => {
      const chosen = this.listbox.value();
      untracked(() => {
        const next = chosen[chosen.length - 1] ?? null;
        const cleared = this.ɵcleared;
        this.ɵcleared = false;
        const previous = this.value();
        if (
          next === null &&
          previous !== null &&
          !cleared &&
          !this.deselectable()
        ) {
          this.listbox.value.set([previous]);
          return;
        }
        if (next !== previous) this.value.set(next);
      });
    });
  }

  ɵdeselect(): void {
    if (!this.deselectable() || this.readonly() || this.disabled()) return;
    this.ɵcleared = true;
    this.listbox.value.set([]);
  }
}
