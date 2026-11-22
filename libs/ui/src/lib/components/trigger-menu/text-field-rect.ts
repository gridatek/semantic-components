/** What lays out a text field's text: copied onto its mirror. */
const PROPERTIES = [
  'direction',
  'box-sizing',
  'width',
  'height',
  'border-top-width',
  'border-right-width',
  'border-bottom-width',
  'border-left-width',
  'border-style',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'font-style',
  'font-variant',
  'font-weight',
  'font-stretch',
  'font-size',
  'font-size-adjust',
  'line-height',
  'font-family',
  'text-align',
  'text-transform',
  'text-indent',
  'letter-spacing',
  'word-spacing',
  'tab-size',
] as const;

/**
 * Where the character at `offset` of a textarea or an input is drawn, in the
 * viewport: a hidden copy of the field (its box, its font, its text up to
 * there) measured, then moved by the field's place and scroll.
 */
export function scTextFieldRect(
  field: HTMLTextAreaElement | HTMLInputElement,
  offset: number,
): DOMRect {
  const document = field.ownerDocument;
  const mirror = document.createElement('div');
  const computed = getComputedStyle(field);
  for (const property of PROPERTIES)
    mirror.style.setProperty(property, computed.getPropertyValue(property));
  const multiline = field.tagName === 'TEXTAREA';
  mirror.style.position = 'fixed';
  mirror.style.top = '0';
  mirror.style.left = '0';
  mirror.style.visibility = 'hidden';
  mirror.style.overflow = 'hidden';
  mirror.style.whiteSpace = multiline ? 'pre-wrap' : 'pre';
  mirror.style.overflowWrap = multiline ? 'break-word' : 'normal';
  mirror.textContent = field.value.slice(0, offset);
  const mark = document.createElement('span');
  mark.textContent = field.value.slice(offset, offset + 1) || '.';
  mirror.append(mark);
  document.body.append(mirror);
  const at = mark.getBoundingClientRect();
  const box = mirror.getBoundingClientRect();
  mirror.remove();
  const place = field.getBoundingClientRect();
  return new DOMRect(
    place.left + at.left - box.left - field.scrollLeft,
    place.top + at.top - box.top - field.scrollTop,
    at.width,
    at.height,
  );
}
