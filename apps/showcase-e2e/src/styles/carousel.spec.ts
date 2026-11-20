import { cn } from 'cn';
import { test } from '../test';
import { currentStyle, expectClasses } from './style';

test.describe('Carousel in its style', () => {
  test(`the buttons have the style's button and corners`, async ({ page }) => {
    const styles = currentStyle();
    await page.goto('/demos/carousel/carousel-usage-demo');
    const wanted = cn(
      styles.button({ variant: 'outline', size: 'icon-sm' }),
      styles.carousel.button,
    );
    for (const name of ['Previous slide', 'Next slide']) {
      await expectClasses(page.getByRole('button', { name }), wanted, name);
    }
  });

  test(`the dots have the style's corners, their marks too`, async ({
    page,
  }) => {
    const corners = currentStyle().carousel.dot.split(/\s+/).filter(Boolean);
    await page.goto('/demos/carousel/dots-carousel-demo');
    await expectClasses(
      page.getByRole('button', { name: 'Slide 1', exact: true }),
      [...corners, ...corners.map((c) => `after:${c}`)].join(' '),
      'dot',
    );
  });
});
