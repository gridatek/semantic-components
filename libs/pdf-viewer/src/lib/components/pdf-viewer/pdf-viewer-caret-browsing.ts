/**
 * Caret browsing (the browser's F7) in the text layer, as pdf.js's viewer
 * does it (its CaretBrowsingMode): the text is absolutely positioned
 * spans, so the browser's own ↑ / ↓ jump about; these move the caret to
 * the line above / below — onto the next page at the end of one — keeping
 * its horizontal place, Shift extending the selection.
 */

const PRECISION = 1e-1;

function isOnSameLine(a: DOMRect, b: DOMRect): boolean {
  const midA = a.y + a.height / 2;
  const midB = b.y + b.height / 2;
  return (a.y <= midB && midB <= a.bottom) || (b.y <= midA && midA <= b.bottom);
}

function isUnderOver(
  rect: DOMRect,
  x: number,
  y: number,
  isUp: boolean,
): boolean {
  const midY = rect.y + rect.height / 2;
  return (
    (isUp ? y >= midY : y <= midY) &&
    rect.x - PRECISION <= x &&
    x <= rect.right + PRECISION
  );
}

/** The caret's place on screen: its x, and its top (up) or bottom (down). */
function caretPosition(selection: Selection, isUp: boolean): [number, number] {
  const range = document.createRange();
  range.setStart(selection.focusNode as Node, selection.focusOffset);
  range.setEnd(selection.focusNode as Node, selection.focusOffset);
  const rect = range.getBoundingClientRect();
  return [rect.x, isUp ? rect.top : rect.bottom];
}

function caretPositionFromPoint(
  x: number,
  y: number,
): { offsetNode: Node | null; offset: number } {
  const doc = document as Document & {
    caretPositionFromPoint?: (
      x: number,
      y: number,
    ) => { offsetNode: Node; offset: number } | null;
  };
  if (doc.caretPositionFromPoint) {
    return doc.caretPositionFromPoint(x, y) ?? { offsetNode: null, offset: 0 };
  }
  const range = document.caretRangeFromPoint(x, y);
  return {
    offsetNode: range?.startContainer ?? null,
    offset: range?.startOffset ?? 0,
  };
}

function place(
  selection: Selection,
  select: boolean,
  node: Node,
  offset: number,
): void {
  if (select) selection.extend(node, offset);
  else selection.setPosition(node, offset);
}

/** Puts the caret in `element`, as close to `caretX` as its text allows. */
function setCaretIn(
  selection: Selection,
  caretX: number,
  select: boolean,
  element: HTMLElement,
  rect = element.getBoundingClientRect(),
): void {
  const { firstChild, lastChild } = element;
  if (!firstChild || !lastChild) return;
  if (caretX <= rect.x + PRECISION) {
    place(selection, select, firstChild, 0);
    return;
  }
  if (rect.right - PRECISION <= caretX) {
    place(selection, select, lastChild, lastChild.textContent?.length ?? 0);
    return;
  }
  const midY = rect.y + rect.height / 2;
  let position = caretPositionFromPoint(caretX, midY);
  let parent = position.offsetNode?.parentElement;
  if (parent && parent !== element) {
    // Something's over the text (a highlight, an annotation): look through.
    const hidden: [HTMLElement, string][] = [];
    for (const over of document.elementsFromPoint(caretX, midY)) {
      if (over === element) break;
      const { style } = over as HTMLElement;
      hidden.push([over as HTMLElement, style.visibility]);
      style.visibility = 'hidden';
    }
    position = caretPositionFromPoint(caretX, midY);
    parent = position.offsetNode?.parentElement;
    for (const [over, visibility] of hidden) over.style.visibility = visibility;
  }
  if (parent !== element || !position.offsetNode) {
    place(selection, select, firstChild, 0);
    return;
  }
  place(selection, select, position.offsetNode, position.offset);
}

/** Moves the caret there — once scrolled to, if it's out of view. */
function setCaret(
  selection: Selection,
  caretX: number,
  select: boolean,
  element: HTMLElement,
): void {
  const rect = element.getBoundingClientRect();
  const view = element
    .closest('[role="document"]')
    ?.getBoundingClientRect() ?? {
    top: 0,
    left: 0,
    bottom: window.innerHeight,
    right: window.innerWidth,
  };
  const visible =
    rect.top >= view.top &&
    rect.left >= view.left &&
    rect.bottom <= view.bottom &&
    rect.right <= view.right;
  if (visible) {
    setCaretIn(selection, caretX, select, element, rect);
    return;
  }
  const scroller = element.closest<HTMLElement>('[role="document"]');
  scroller?.addEventListener(
    'scrollend',
    () => setCaretIn(selection, caretX, select, element),
    { once: true },
  );
  element.scrollIntoView({ block: 'nearest' });
}

/** The first (down) / last (up) text of the next / previous page with text. */
function textOnNextPage(textLayer: HTMLElement, isUp: boolean): Node | null {
  const root = textLayer.closest('[role="document"]');
  let page = parseInt(textLayer.getAttribute('data-textlayer-page') ?? '', 10);
  for (;;) {
    page += isUp ? -1 : 1;
    const next = root?.querySelector<HTMLElement>(
      `[data-textlayer-page="${page}"]`,
    );
    if (!next) return null;
    const walker = document.createTreeWalker(next, NodeFilter.SHOW_TEXT);
    const node = isUp ? walker.lastChild() : walker.firstChild();
    if (node) return node;
  }
}

/**
 * Moves the caret a line up / down (Shift: extends the selection). Returns
 * false when the caret isn't in a text layer.
 */
export function moveCaret(isUp: boolean, select: boolean): boolean {
  const selection = document.getSelection();
  const focusNode = selection?.focusNode;
  if (!selection || !focusNode || selection.rangeCount === 0) return false;
  const focusElement =
    focusNode.nodeType === Node.ELEMENT_NODE
      ? (focusNode as HTMLElement)
      : focusNode.parentElement;
  const textLayer = focusElement?.closest<HTMLElement>('.textLayer');
  if (!focusElement || !textLayer) return false;

  const walker = document.createTreeWalker(textLayer, NodeFilter.SHOW_TEXT);
  walker.currentNode = focusNode;
  const step = () => (isUp ? walker.previousNode() : walker.nextNode());
  const focusRect = focusElement.getBoundingClientRect();

  // The first text on another line.
  let lineElement: HTMLElement | null = null;
  while (step()) {
    const element = walker.currentNode.parentElement;
    if (element && !isOnSameLine(focusRect, element.getBoundingClientRect())) {
      lineElement = element;
      break;
    }
  }

  if (!lineElement) {
    // The page's last (first) line: on to the next (previous) page.
    const node = textOnNextPage(textLayer, isUp);
    if (!node?.parentElement) return true;
    if (select) {
      const edge =
        (isUp ? walker.firstChild() : walker.lastChild()) ?? focusNode;
      selection.extend(edge, isUp ? 0 : (edge.textContent?.length ?? 0));
      const range = document.createRange();
      const offset = isUp ? (node.textContent?.length ?? 0) : 0;
      range.setStart(node, offset);
      range.setEnd(node, offset);
      selection.addRange(range);
      return true;
    }
    const [caretX] = caretPosition(selection, isUp);
    setCaret(selection, caretX, select, node.parentElement);
    return true;
  }

  // On that line, the text right above / below the caret.
  const [caretX, caretY] = caretPosition(selection, isUp);
  const lineRect = lineElement.getBoundingClientRect();
  if (isUnderOver(lineRect, caretX, caretY, isUp)) {
    setCaret(selection, caretX, select, lineElement);
    return true;
  }
  while (step()) {
    const element = walker.currentNode.parentElement;
    if (!element) continue;
    const rect = element.getBoundingClientRect();
    if (!isOnSameLine(lineRect, rect)) break;
    if (isUnderOver(rect, caretX, caretY, isUp)) {
      setCaret(selection, caretX, select, element);
      return true;
    }
  }
  setCaret(selection, caretX, select, lineElement);
  return true;
}
