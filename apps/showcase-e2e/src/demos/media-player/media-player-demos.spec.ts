import { expect, test } from '@playwright/test';

test.describe('Audio Player Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/audio-player/audio-player-demo');
  });

  test('mute is a toggle; the volume slider waits while muted', async ({
    page,
  }) => {
    const mute = page.getByRole('button', { name: 'Mute' });
    const volume = page.getByRole('slider', { name: 'Volume' });
    await expect(mute).toHaveAttribute('aria-pressed', 'false');
    await expect(volume).toBeEnabled();

    await mute.click();
    await expect(mute).toHaveAttribute('aria-pressed', 'true');
    await expect(volume).toBeDisabled();

    await mute.click();
    await volume.fill('0.3');
    await page.getByRole('button', { name: 'Full volume' }).click();
    await expect(volume).toHaveValue('1');
  });

  test('the title, the seek bar and the times are there', async ({ page }) => {
    await expect(page.getByText('SoundHelix Song 1')).toBeVisible();
    await expect(page.getByRole('slider', { name: 'Seek' })).toBeVisible();
    await expect(page.getByText('0:00').first()).toBeVisible();
  });
});
