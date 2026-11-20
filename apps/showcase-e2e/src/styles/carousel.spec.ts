import type { Locator } from '@playwright/test';
import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

/** Read until it has them all: the first render may not have them yet. */
async function expectHasClasses(
  element: Locator,
  classes: string[],
  message: string,
) {
  await expect
    .poll(async () => {
      const have = new Set(
        ((await element.getAttribute('class')) ?? '').split(/\s+/),
      );
      return classes.filter((c) => !have.has(c));
    }, message)
    .toEqual([]);
}

test.describe('Carousel in its style', () => {
  test(`the buttons have the style's button and corners`, async ({ page }) => {
    const styles = currentStyle();
    const preset = styleName();
    await page.goto('/demos/carousel/carousel-usage-demo');
    const wanted = twMerge(
      styles.button({ variant: 'outline', size: 'icon-sm' }),
      styles.carousel.button,
    );
    const classes = wanted.split(/\s+/).filter(Boolean);
    for (const name of ['Previous slide', 'Next slide']) {
      await expectHasClasses(
        page.getByRole('button', { name }),
        classes,
        `${preset} ${name} classes missing`,
      );
    }
  });

  test(`the dots have the style's corners, their marks too`, async ({
    page,
  }) => {
    const corners = currentStyle().carousel.dot.split(/\s+/).filter(Boolean);
    await page.goto('/demos/carousel/dots-carousel-demo');
    await expectHasClasses(
      page.getByRole('button', { name: 'Slide 1', exact: true }),
      [...corners, ...corners.map((c) => `after:${c}`)],
      `${styleName()} dot corners missing`,
    );
  });
});
