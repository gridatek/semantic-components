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
 * Its scrollbar is ui's scrollbar.css: no `scrollbar-width` of its own
 * (`auto` — any other value makes Chromium drop `::-webkit-scrollbar`), and,
 * in Chromium, the thumb that file draws: a colour, and the style's corners
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

/**
 * A scrollbar thumb's contrast on what it is drawn over — WCAG 1.4.11 wants
 * 3:1 for a scrollbar the page styles. The native one (`::-webkit-scrollbar-thumb`,
 * read in Chromium only), or a drawn thumb (a Scroll Area's). Its background:
 * the first one painted from the box up (the page's white if none). Colours
 * through a canvas: `oklch()` and transparency become the sRGB that shows.
 */
export async function thumbContrast(
  box: Locator,
  thumb?: Locator,
): Promise<number> {
  const handle = thumb ? await thumb.elementHandle() : null;
  return box.evaluate((el, drawn) => {
    const thumbColor = drawn
      ? getComputedStyle(drawn).backgroundColor
      : getComputedStyle(el, '::-webkit-scrollbar-thumb').backgroundColor;
    const backgrounds: string[] = [];
    for (let a: Element | null = el; a; a = a.parentElement) {
      const color = getComputedStyle(a).backgroundColor;
      if (color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent')
        backgrounds.unshift(color);
    }
    const context = document.createElement('canvas').getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    const paint = (colors: string[]) => {
      context.clearRect(0, 0, 1, 1);
      for (const color of ['#fff', ...colors]) {
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
      }
      return [...context.getImageData(0, 0, 1, 1).data.slice(0, 3)];
    };
    const luminance = (rgb: number[]) => {
      const [r, g, b] = rgb.map((v) => {
        const c = v / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const behind = luminance(paint(backgrounds));
    const front = luminance(paint([...backgrounds, thumbColor]));
    const [light, dark] = behind > front ? [behind, front] : [front, behind];
    return (light + 0.05) / (dark + 0.05);
  }, handle);
}
