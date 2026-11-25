import { ElementRef, type Signal, effect, inject } from '@angular/core';
import { ScCheckbox, setInput } from '@semantic-components/ui';

/**
 * Keeps a checkbox showing table state. With `scCheckbox` on the element its
 * model/inputs are driven (it owns the `checked` binding); otherwise the
 * native properties are set. Call from a directive's injection context.
 */
export function syncDataTableCheckbox(
  checked: Signal<boolean>,
  indeterminate?: Signal<boolean>,
): void {
  const element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  const checkbox = inject(ScCheckbox, { optional: true, self: true });

  effect(() => {
    const value = checked();
    if (checkbox) checkbox.checked.set(value);
    else element.checked = value;
  });

  if (indeterminate) {
    effect(() => {
      const value = indeterminate();
      if (checkbox) setInput(checkbox.indeterminate, value);
      else element.indeterminate = value;
    });
  }
}
