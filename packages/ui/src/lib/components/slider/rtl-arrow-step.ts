/**
 * Right to left, across: ← raises a native range, → lowers it. The step's
 * sign for an arrow the code must handle (1 up, −1 down), else 0.
 *
 * FIXME(webkit): a workaround. Chrome and Firefox flip a native range's
 * arrows right to left by themselves; Safari (WebKit) doesn't, its arrows
 * stay left to right. Check again with each WebKit release; drop it once
 * Safari flips them (specs: "RTL" in the slider and range slider demos).
 * See docs/webkit-workarounds.md.
 */
export function rtlArrowStep(
  event: KeyboardEvent,
  orientation: 'horizontal' | 'vertical',
  direction: 'ltr' | 'rtl',
): -1 | 0 | 1 {
  if (
    orientation !== 'horizontal' ||
    direction !== 'rtl' ||
    (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey
  )
    return 0;
  return event.key === 'ArrowLeft' ? 1 : -1;
}
