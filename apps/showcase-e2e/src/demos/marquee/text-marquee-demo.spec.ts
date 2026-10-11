import { expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

test.describe('Text Marquee Demo', () => {
  test('can be paused; repeats and separators are hidden from AT', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/marquee/text-marquee-demo');
    const marquee = page.locator('[data-slot=marquee-text]');
    const pause = page.getByRole('button', { name: 'Pause' });

    await pause.click();
    await expect(marquee).toHaveAttribute('data-paused');
    await expect(page.getByRole('button', { name: 'Play' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(marquee.locator('> div')).toHaveCSS(
      'animation-play-state',
      'paused',
    );

    const segments = marquee.locator('[data-slot=marquee-text-segment]');
    await expect(segments.first()).not.toHaveAttribute('aria-hidden');
    await expect(segments.nth(1)).toHaveAttribute('aria-hidden', 'true');
    expect(errors).toEqual([]);
  });

  test('reduced motion stops the animation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/demos/marquee/text-marquee-demo');
    await expect(page.locator('[data-slot=marquee-text] > div')).toHaveCSS(
      'animation-name',
      'none',
    );
  });
});
