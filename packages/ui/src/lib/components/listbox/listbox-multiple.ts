import { Listbox } from '@angular/aria/listbox';
import { Directive, effect, model, untracked } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { ScListboxBase } from './listbox-base';

const same = <T>(a: readonly T[], b: readonly T[]) =>
  a.length === b.length && a.every((value, i) => value === b[i]);

/**
 * A list to choose several options from, always in view — a `[formField]`,
 * its value the options' (an array). Space, Enter or a click toggles by
 * default (`activation`); Shift chooses a range, Ctrl + A all. Name it.
 * `#list="scListbox"`: `selectAll()`, `clear()`, `focus()`.
 */
@Directive({
  selector: 'div[scListbox][multiple]',
  exportAs: 'scListbox',
  hostDirectives: [Listbox],
  host: { '[attr.multiple]': 'null' },
  providers: [{ provide: ScListboxBase, useExisting: ScListboxMultiple }],
})
export class ScListboxMultiple<T = string>
  extends ScListboxBase<T>
  implements FormValueControl<T[]>
{
  readonly ɵmultiple = true;

  /** The options chosen, in the list's order: two-way, or `[formField]`. */
  readonly value = model<T[]>([]);

  constructor() {
    super();
    effect(() => {
      const value = this.value();
      untracked(() => {
        if (!same(this.listbox.value(), value))
          this.listbox.value.set([...value]);
      });
    });
    effect(() => {
      const chosen = this.listbox.value();
      untracked(() => {
        this.ɵcleared = false;
        // In the options' order, whatever the order they were chosen in.
        const order = this.ɵitems().map((item) => item.value());
        const next = [...chosen].sort(
          (a, b) => order.indexOf(a) - order.indexOf(b),
        );
        if (!same(this.value(), next)) this.value.set(next);
      });
    });
  }

  ɵdeselect(): void {
    // Several: pressing toggles already.
  }
}
