import { type Locator, expect } from '@playwright/test';

/**
 * Right-to-left checks, for the RTL demos (`<div dir="rtl" lang="ar">`, see
 * docs/rtl-demos.md).
 */

/** The element is laid out right to left. */
export async function expectRtl(locator: Locator): Promise<void> {
  await expect
    .poll(() =>
      locator.evaluate((element) => getComputedStyle(element).direction),
    )
    .toBe('rtl');
}

/**
 * The elements read in this order along the line — in right to left, from
 * the right: each one's start edge past the next one's. Fails on a layout
 * that didn't mirror.
 */
export async function expectInlineOrder(items: Locator[]): Promise<void> {
  const boxes = await Promise.all(
    items.map(async (item) => {
      const box = await item.boundingBox();
      if (!box) throw new Error(`not visible: ${item}`);
      const direction = await item.evaluate(
        (element) => getComputedStyle(element).direction,
      );
      return { box, rtl: direction === 'rtl' };
    }),
  );
  for (let i = 1; i < boxes.length; i++) {
    const [before, after] = [boxes[i - 1], boxes[i]];
    if (before.rtl) {
      expect(
        before.box.x + before.box.width,
        `item ${i} should be left of item ${i - 1} (right to left)`,
      ).toBeGreaterThan(after.box.x + after.box.width);
    } else {
      expect(
        before.box.x,
        `item ${i} should be right of item ${i - 1} (left to right)`,
      ).toBeLessThan(after.box.x);
    }
  }
}

/** The arrow key that moves to the next or previous item along the line. */
export function inlineKey(
  direction: 'ltr' | 'rtl',
  to: 'next' | 'previous',
): 'ArrowLeft' | 'ArrowRight' {
  const forward = direction === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  const back = direction === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  return to === 'next' ? forward : back;
}
