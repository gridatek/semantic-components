const textareaProperties = [
  'direction',
  'boxSizing',
  'width',
  'height',
  'overflowX',
  'overflowY',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',
  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',
  'letterSpacing',
  'wordSpacing',
  'tabSize',
  'MozTabSize',
] as const;

/**
 * Returns the caret offset {x, y} relative to the textarea's top-left corner
 * at the given position, using the mirror-div technique.
 */
export function getCaretOffset(
  textarea: HTMLTextAreaElement,
  position: number,
): { x: number; y: number } {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const style = div.style;
  const computed = window.getComputedStyle(textarea);

  style.whiteSpace = 'pre-wrap';
  style.wordWrap = 'break-word';
  style.position = 'absolute';
  style.visibility = 'hidden';
  style.overflow = 'hidden';

  for (const prop of textareaProperties) {
    style.setProperty(
      prop.replace(/([A-Z])/g, '-$1').toLowerCase(),
      computed.getPropertyValue(prop.replace(/([A-Z])/g, '-$1').toLowerCase()),
    );
  }

  div.textContent = textarea.value.substring(0, position);

  const span = document.createElement('span');
  span.textContent = textarea.value.substring(position) || '.';
  div.appendChild(span);

  const spanRect = span.getBoundingClientRect();
  const divRect = div.getBoundingClientRect();

  const x = spanRect.left - divRect.left - textarea.scrollLeft;
  const y = spanRect.top - divRect.top - textarea.scrollTop + spanRect.height;

  document.body.removeChild(div);

  return { x, y };
}
