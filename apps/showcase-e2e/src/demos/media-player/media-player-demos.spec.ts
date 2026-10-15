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

test.describe('Video Player Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/video-player/basic-video-player-demo');
    // The controls show while the pointer is over the player.
    await page.locator('[scVideoPlayer]').hover();
  });

  test('mute is a toggle', async ({ page }) => {
    const mute = page.getByRole('button', { name: 'Mute' });
    await expect(mute).toHaveAttribute('aria-pressed', 'false');
    await mute.click();
    await expect(mute).toHaveAttribute('aria-pressed', 'true');
  });

  test('the speed menu sets the playback speed', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Playback speed' });
    await expect(trigger).toHaveText('1×');
    await trigger.click();
    const option = page.getByRole('button', { name: '1.5×' });
    await option.click();
    await expect(trigger).toHaveText('1.5×');
    await trigger.click();
    await expect(page.getByRole('button', { name: '1.5×' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});
