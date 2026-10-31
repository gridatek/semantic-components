import type { Locator, Page } from '@playwright/test';

/**
 * Reading how things look: computed styles and boxes, with transitions off so
 * a look read mid-transition isn't taken for its own.
 */

/** Opens a page with transitions off and animations at their end. */
export async function openStill(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await page.addStyleTag({
    content:
      '*, *::before, *::after { transition: none !important; animation-duration: 0s !important; animation-delay: 0s !important; }',
  });
}

/** Whether each corner is rounded: top-left, top-right, bottom-right, bottom-left. */
export const corners = (locator: Locator) =>
  locator.evaluate((el) => {
    const style = getComputedStyle(el);
    return [
      style.borderTopLeftRadius,
      style.borderTopRightRadius,
      style.borderBottomRightRadius,
      style.borderBottomLeftRadius,
    ].map((radius) => parseFloat(radius) > 0);
  });

/** One computed style property. */
export const computed = (locator: Locator, property: string) =>
  locator.evaluate(
    (el, name) => getComputedStyle(el).getPropertyValue(name),
    property,
  );

/** Its box; fails if it isn't laid out. */
export async function box(locator: Locator) {
  const found = await locator.boundingBox();
  if (!found) throw new Error(`not visible: ${locator}`);
  return found;
}
