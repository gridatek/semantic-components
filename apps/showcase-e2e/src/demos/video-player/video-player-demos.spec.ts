import { type Page, expect, test } from '@playwright/test';

const video = (page: Page) => page.locator('video');
const player = (page: Page) => page.locator('[data-slot="video-player"]');
const captions = (page: Page) =>
  page.locator('[data-slot="video-player-captions-display"]');
const time = (page: Page) =>
  video(page).evaluate((v: HTMLVideoElement) => v.currentTime);

test.describe('Player', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/video-player/player-video-player-demo');
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.duration))
      .toBeGreaterThan(50);
  });

  test('the 10-second skips, where the player has room', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Back 10 seconds' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Forward 10 seconds' }),
    ).toBeVisible();
  });

  test('no 10-second skips on a phone @mobile', async ({ page }) => {
    // Measured after the first render: wait for the player's own controls.
    await expect(
      page.getByRole('button', { name: 'Fullscreen' }),
    ).toBeAttached();
    await expect(page.getByRole('button', { name: /10 seconds/ })).toHaveCount(
      0,
    );
  });

  test('plays and pauses', async ({ page }) => {
    await page.getByRole('button', { name: 'Play' }).first().click();
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(false);
    await page.getByRole('button', { name: 'Pause' }).click();
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(true);
  });

  test('the keys, focused in the player', async ({ page }) => {
    await player(page).focus();
    await page.keyboard.press('5');
    await expect.poll(() => time(page)).toBeGreaterThan(25);
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => time(page)).toBeLessThan(22);
    await page.keyboard.press('m');
    await expect(page.getByRole('button', { name: 'Mute' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('captions, shown by the player, in the language chosen', async ({
    page,
  }) => {
    await player(page).focus();
    await page.keyboard.press('c');
    await expect(
      page.getByRole('button', { name: 'Captions' }),
    ).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('3');
    await expect(captions(page)).toHaveText("I'm searching for someone.");

    await page.getByRole('radio', { name: 'Français' }).check();
    await expect(captions(page)).toHaveText("Je cherche quelqu'un.");
  });

  test('the seek bar: its time, chapters and preview', async ({ page }) => {
    const seek = page.getByRole('slider', { name: 'Seek' });
    await expect(seek).toHaveAttribute('aria-valuetext', /of/);
    const box = await seek.boundingBox();
    await page.mouse.move(
      (box?.x ?? 0) + (box?.width ?? 0) * 0.5,
      (box?.y ?? 0) + (box?.height ?? 0) / 2,
    );
    await expect(
      page.locator('[data-slot="video-player-preview"]'),
    ).toContainText('The dragon');
  });

  test('a speed is pressed while it plays at it', async ({ page }) => {
    const fast = page.getByRole('button', { name: '1.5×' });
    await fast.click();
    await expect(fast).toHaveAttribute('aria-pressed', 'true');
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.playbackRate))
      .toBe(1.5);
  });
});

test('Controlled: chapters jump, from outside', async ({ page }) => {
  await page.goto('/demos/video-player/controlled-video-player-demo');
  const desert = page.getByRole('button', { name: /The desert/ });
  await expect(desert).toBeVisible();
  await desert.click();
  await expect.poll(() => time(page)).toBeCloseTo(36, 0);
  await expect(desert).toHaveAttribute('aria-current', 'true');
});

test('Controlled: chapters jump while it plays', async ({ page }) => {
  await page.goto('/demos/video-player/controlled-video-player-demo');
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await expect
    .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
  await page.getByRole('button', { name: /The dragon/ }).click();
  await expect.poll(() => time(page)).toBeGreaterThan(24);
  await page.getByRole('button', { name: /The gatekeeper/ }).click();
  await expect.poll(() => time(page)).toBeLessThan(15);
});
