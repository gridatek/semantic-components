import type { Combobox } from '@angular/aria/combobox';
import { Injector, afterNextRender } from '@angular/core';

/**
 * Type-ahead on a closed select-only combobox (APG): a printable key opens the
 * list, then is replayed so the list moves to the first matching option.
 * Call from the trigger's `keydown` handler. Shared by select and multiselect.
 */
export function openOnTypeahead(
  event: KeyboardEvent,
  combobox: Combobox,
  element: HTMLElement,
  injector: Injector,
): void {
  if (
    combobox.expanded() ||
    combobox.disabled() ||
    combobox.readonly() ||
    event.key.length !== 1 ||
    event.key === ' ' ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey
  ) {
    return;
  }
  event.preventDefault();
  combobox.expanded.set(true);
  const { key, code, shiftKey } = event;
  // The list registers with the combobox only after the overlay has rendered.
  afterNextRender(
    () =>
      setTimeout(() =>
        element.dispatchEvent(
          new KeyboardEvent('keydown', { key, code, shiftKey, bubbles: true }),
        ),
      ),
    { injector },
  );
}
