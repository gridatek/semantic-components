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

  test(`the indicators have the style's corners, their marks too`, async ({
    page,
  }) => {
    const corners = currentStyle()
      .carousel.indicator.split(/\s+/)
      .filter(Boolean);
    await page.goto('/demos/carousel/indicators-carousel-demo');
    await expectClasses(
      page.getByRole('tab', { name: 'Slide 1', exact: true }),
      [...corners, ...corners.map((c) => `after:${c}`)].join(' '),
      'indicator',
    );
  });
});
