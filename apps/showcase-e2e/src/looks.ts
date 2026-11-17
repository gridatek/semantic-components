import { type Locator, type Page, expect } from '@playwright/test';

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

/**
 * Its `scrollbar-width`. Not in Firefox: Playwright's headless Firefox
 * draws no scrollbars, and computes `scrollbar-width: none` for every
 * element — even one that sets `thin` inline.
 */
export async function expectScrollbarWidth(
  locator: Locator,
  width: 'auto' | 'thin' | 'none',
): Promise<void> {
  const browser = locator.page().context().browser()?.browserType().name();
  if (browser === 'firefox') return;
  await expect(locator).toHaveCSS('scrollbar-width', width);
}

/**
 * Its scrollbar is ui's scrollbars.css: no `scrollbar-width` of its own
 * (`auto` — any other value makes Chromium drop `::-webkit-scrollbar`), and,
 * in Chromium, the thumb that file draws: a colour, and the preset's corners
 * (`round` or `square`) when given. The thumb is read in Chromium only: it is
 * the one whose computed `::-webkit-scrollbar-thumb` is known to be the drawn one.
 */
export async function expectStyledScrollbar(
  locator: Locator,
  corners?: 'round' | 'square',
): Promise<void> {
  await expectScrollbarWidth(locator, 'auto');
  const browser = locator.page().context().browser()?.browserType().name();
  if (browser !== 'chromium') return;
  await expect
    .poll(() =>
      locator.evaluate((el) => {
        const s = getComputedStyle(el, '::-webkit-scrollbar-thumb');
        return {
          painted: s.backgroundColor !== 'rgba(0, 0, 0, 0)',
          corners: s.borderTopLeftRadius === '0px' ? 'square' : 'round',
        };
      }),
    )
    .toEqual({ painted: true, corners: corners ?? expect.any(String) });
}
