import { Listbox, Option } from '@angular/aria/listbox';
import { ElementRef, effect, inject } from '@angular/core';

/**
 * Active-option behaviour for an option in a popup listbox (activedescendant
 * focus, explicit selection):
 *
 * - the highlight follows the pointer, like keyboard navigation — so only one
 *   row is ever tinted (no separate `hover:` style);
 * - the active option scrolls into view when reached with the keyboard (not
 *   when hovered, which would make the list jump under the pointer).
 *
 * Call from an option's injection context; bind the returned handler to
 * `(pointermove)`.
 */
export function useActiveOption<T>(option: Option<T>): () => void {
  const listbox = inject(Listbox);
  const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  let fromPointer = false;

  effect(() => {
    if (option.active() && !fromPointer) {
      element.scrollIntoView({ block: 'nearest' });
    }
    fromPointer = false;
  });

  return () => {
    if (option.active() || option.disabled()) return;
    const options = Array.from(
      element.closest('[role=listbox]')?.querySelectorAll('[role=option]') ??
        [],
    );
    const index = options.indexOf(element);
    if (index < 0) return;
    fromPointer = true;
    listbox.gotoIndex(index);
  };
}
