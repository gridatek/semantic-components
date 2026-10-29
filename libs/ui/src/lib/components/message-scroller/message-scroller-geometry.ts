/**
 * Measures for the message scroller: where rows are in the viewport, how far
 * it can scroll, which rows are anchors. After shadcn's
 * `@shadcn/react/message-scroller`.
 */

/** Below this, two positions are the same (px). */
export const SAME = 0.5;

/** Where a row lands in the viewport when scrolled to. */
export type ScMessageScrollerAlign = 'start' | 'center' | 'end' | 'nearest';

/** Which edges the viewport can still scroll toward. */
export interface ScMessageScrollerScrollable {
  readonly start: boolean;
  readonly end: boolean;
}

/** The rows on screen, and the turn being read (the last anchor reached). */
export interface ScMessageScrollerVisibility {
  readonly currentAnchorId: string | null;
  readonly visibleMessageIds: readonly string[];
}

export const NOT_SCROLLABLE: ScMessageScrollerScrollable = {
  start: false,
  end: false,
};

export const NOTHING_VISIBLE: ScMessageScrollerVisibility = {
  currentAnchorId: null,
  visibleMessageIds: [],
};

/** The rows: the content's children but the spacer. */
export function rowsOf(content: HTMLElement, spacer: HTMLElement | null) {
  return Array.from(content.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child !== spacer,
  );
}

const isAnchor = (row: HTMLElement | undefined) =>
  row?.dataset['scrollAnchor'] === 'true';

/** The first anchor from `from` on. */
export function nextAnchor(rows: HTMLElement[], from: number) {
  for (let i = from; i < rows.length; i++)
    if (isAnchor(rows[i])) return rows[i];
  return null;
}

/** An anchor not yet scrolled to. */
export function unhandledAnchor(
  rows: HTMLElement[],
  handled: WeakSet<HTMLElement>,
) {
  return rows.find((row) => isAnchor(row) && !handled.has(row)) ?? null;
}

/** More than one anchor from `from` on — several turns arrived at once. */
export function severalAnchors(rows: HTMLElement[], from: number) {
  return rows.slice(from).filter(isAnchor).length > 1;
}

export function lastAnchor(rows: HTMLElement[]) {
  for (let i = rows.length - 1; i >= 0; i--)
    if (isAnchor(rows[i])) return rows[i];
  return null;
}

const pixels = (value: string | undefined) => {
  const number = Number.parseFloat(value ?? '');
  return Number.isFinite(number) ? number : 0;
};

function paddingOf(element: HTMLElement) {
  const style = getComputedStyle(element);
  return {
    start: pixels(style.paddingBlockStart || style.paddingTop),
    end: pixels(style.paddingBlockEnd || style.paddingBottom),
  };
}

/** The gap between rows: the spacer's margin cancels it. */
export function gapOf(element: HTMLElement | null) {
  if (!element) return 0;
  const style = getComputedStyle(element);
  return pixels(style.rowGap === 'normal' ? style.gap : style.rowGap);
}

/** An element's top from the viewport's top, now. */
export function topIn(element: HTMLElement, viewport: HTMLElement) {
  return (
    element.getBoundingClientRect().top - viewport.getBoundingClientRect().top
  );
}

/** An element's top in the viewport's scrolled content. */
function offsetIn(element: HTMLElement, viewport: HTMLElement) {
  return topIn(element, viewport) + viewport.scrollTop;
}

/** The rows' height in the viewport, the spacer left out. */
export function rowsHeight(
  content: HTMLElement,
  spacer: HTMLElement | null,
  viewport: HTMLElement,
) {
  const padding = paddingOf(content);
  const top = viewport.getBoundingClientRect().top;
  let height = padding.start + padding.end;
  for (const row of rowsOf(content, spacer))
    height = Math.max(
      height,
      row.getBoundingClientRect().bottom -
        top +
        viewport.scrollTop +
        padding.end,
    );
  return height;
}

export function maxScrollTop(viewport: HTMLElement) {
  return Math.max(0, viewport.scrollHeight - viewport.clientHeight);
}

export function scrollableOf(
  content: HTMLElement | null,
  spacer: HTMLElement | null,
  viewport: HTMLElement | null,
  threshold: number,
): ScMessageScrollerScrollable {
  if (!content || !viewport) return NOT_SCROLLABLE;
  const height = rowsHeight(content, spacer, viewport);
  return {
    start: viewport.scrollTop > threshold,
    end: height - viewport.scrollTop - viewport.clientHeight > threshold,
  };
}

/** The scroll position that puts `element` where `align` says. */
export function targetTop(
  element: HTMLElement,
  align: ScMessageScrollerAlign,
  margin: number,
  spacer: HTMLElement | null,
  viewport: HTMLElement,
) {
  const top = offsetIn(element, viewport);
  const height = element.getBoundingClientRect().height;
  const padding = spacer?.parentElement
    ? paddingOf(spacer.parentElement)
    : { start: 0, end: 0 };
  if (align === 'center') {
    const room = Math.max(
      0,
      viewport.clientHeight - padding.start - padding.end,
    );
    return top - padding.start - (room - height) / 2 - margin;
  }
  if (align === 'end')
    return top - viewport.clientHeight + height + padding.end + margin;
  if (align === 'nearest') {
    const bottom = top + height;
    const from = viewport.scrollTop + padding.start;
    const to = viewport.scrollTop + viewport.clientHeight - padding.end;
    if (top >= from && bottom <= to) return viewport.scrollTop;
    return top < from
      ? top - padding.start - margin
      : bottom - viewport.clientHeight + padding.end + margin;
  }
  return top - padding.start - margin;
}

/** The room to add below the rows so `scrollTop` can be reached. */
export function spacerFor(
  content: HTMLElement,
  spacer: HTMLElement | null,
  viewport: HTMLElement,
  scrollTop: number,
) {
  return (
    scrollTop + viewport.clientHeight - rowsHeight(content, spacer, viewport)
  );
}

/** The first row on screen. */
export function firstVisibleRow(
  content: HTMLElement,
  spacer: HTMLElement | null,
  viewport: HTMLElement,
) {
  const box = viewport.getBoundingClientRect();
  for (const row of rowsOf(content, spacer)) {
    if (!row.dataset['messageId']) continue;
    const rect = row.getBoundingClientRect();
    if (rect.bottom > box.top && rect.top < box.bottom) return row;
  }
  return null;
}

/**
 * The rows on screen (from the intersection observer's `seen`, or measured
 * without one) and the last anchor whose top has passed the reading line.
 */
export function visibilityOf(
  content: HTMLElement | null,
  spacer: HTMLElement | null,
  viewport: HTMLElement | null,
  readingLine: number,
  seen: ReadonlySet<string> | null,
): ScMessageScrollerVisibility {
  if (!content || !viewport) return NOTHING_VISIBLE;
  const box = viewport.getBoundingClientRect();
  const line = box.top + readingLine;
  const visibleMessageIds: string[] = [];
  let currentAnchorId: string | null = null;
  for (const row of rowsOf(content, spacer)) {
    const id = row.dataset['messageId'];
    if (!id) continue;
    const anchor = isAnchor(row);
    const rect = anchor || !seen ? row.getBoundingClientRect() : null;
    const visible = seen
      ? seen.has(id)
      : !!rect && rect.bottom > line && rect.top < box.bottom;
    if (visible) visibleMessageIds.push(id);
    if (anchor && rect && rect.top <= line + SAME) currentAnchorId = id;
  }
  return visibleMessageIds.length === 0 && currentAnchorId === null
    ? NOTHING_VISIBLE
    : { currentAnchorId, visibleMessageIds };
}

export const sameScrollable = (
  a: ScMessageScrollerScrollable,
  b: ScMessageScrollerScrollable,
) => a.start === b.start && a.end === b.end;

export const sameVisibility = (
  a: ScMessageScrollerVisibility,
  b: ScMessageScrollerVisibility,
) =>
  a.currentAnchorId === b.currentAnchorId &&
  a.visibleMessageIds.length === b.visibleMessageIds.length &&
  a.visibleMessageIds.every((id, i) => id === b.visibleMessageIds[i]);
