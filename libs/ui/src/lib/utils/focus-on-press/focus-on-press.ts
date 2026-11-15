/**
 * Focuses a trigger when it is pressed, so the overlay it opens gives focus
 * back to it on close.
 *
 * FIXME(webkit): a workaround. Chrome and Firefox focus a pressed button by
 * themselves; Safari (WebKit) doesn't, and focus went back to the page.
 * Check again with each WebKit release; drop it once Safari focuses pressed
 * buttons (specs: "focus back" in the dialog, drawer and command demos).
 * See docs/webkit-workarounds.md.
 */
export function ɵfocusOnPress(trigger: HTMLElement): void {
  trigger.focus();
}
