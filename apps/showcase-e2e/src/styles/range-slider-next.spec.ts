import { test } from '../test';
import { currentStyle, expectClasses } from './style';

test.describe('Range Slider Next in its style', () => {
  test(`each thumb has the style's slider look`, async ({ page }) => {
    const { slider } = currentStyle();
    await page.goto('/demos/range-slider-next/range-slider-next-usage-demo');
    for (const name of ['Minimum', 'Maximum']) {
      await expectClasses(
        page.getByRole('slider', { name }),
        `${slider.root} ${slider.thumb}`,
        name,
      );
    }
    // The track is the first thumb's: the style's.
    await expectClasses(
      page.getByRole('slider', { name: 'Minimum' }),
      slider.track,
      'track',
    );
  });
});
