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

  test('a wide player: one bar with every control', async ({ page }) => {
    for (const name of [
      'Back 10 seconds',
      'Forward 10 seconds',
      'Picture in picture',
      'Fullscreen',
    ]) {
      await expect(page.getByRole('button', { name })).toBeVisible();
    }
    await expect(page.getByRole('slider', { name: 'Volume' })).toBeVisible();
    await expect(page.getByRole('group', { name: 'Speed' })).toBeVisible();
  });

  test('a small player: the small layout, nothing cut off @mobile', async ({
    page,
  }) => {
    const box = await player(page).boundingBox();
    if (!box) throw new Error('no player');
    // Captions and mute at the top, play and the skips in the middle,
    // time, fullscreen and the seek bar at the bottom — all inside the player.
    for (const name of [
      'Captions',
      'Mute',
      'Back 10 seconds',
      'Forward 10 seconds',
      'Fullscreen',
    ]) {
      const button = page.getByRole('button', { name });
      await expect(button).toBeVisible();
      const b = await button.boundingBox();
      expect(b && b.x >= box.x && b.x + b.width <= box.x + box.width).toBe(
        true,
      );
    }
    // Out of a small player (as Vidstack's): the volume slider, the speeds,
    // picture-in-picture.
    await expect(page.getByRole('slider', { name: 'Volume' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /×$/ })).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: 'Picture in picture' }),
    ).toHaveCount(0);
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
