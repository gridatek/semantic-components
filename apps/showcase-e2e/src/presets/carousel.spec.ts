import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Carousel in its preset', () => {
  test(`the buttons have the preset's button and corners`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/carousel/carousel-usage-demo');
    const wanted = twMerge(
      styles.button({ variant: 'outline', size: 'icon-sm' }),
      styles.carousel,
    );
    const classes = wanted.split(/\s+/).filter(Boolean);
    for (const name of ['Previous slide', 'Next slide']) {
      const button = page.getByRole('button', { name });
      // Read until it has them all: the first render may not have them yet.
      await expect
        .poll(async () => {
          const have = new Set(
            ((await button.getAttribute('class')) ?? '').split(/\s+/),
          );
          return classes.filter((c) => !have.has(c));
        }, `${preset} ${name} classes missing`)
        .toEqual([]);
    }
  });
});
