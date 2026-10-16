import { type Page, expect, test } from '@playwright/test';

const video = (page: Page) => page.locator('video');
const player = (page: Page) => page.locator('[data-slot="video-player"]');
const captions = (page: Page) =>
  page.locator('[data-slot="video-player-captions-display"]');
const time = (page: Page) =>
  video(page).evaluate((v: HTMLVideoElement) => v.currentTime);

test.describe('Player', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/video-player-next/player-video-player-next-demo');
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.duration))
      .toBeGreaterThan(14);
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
    await expect.poll(() => time(page)).toBeGreaterThan(7);
    await page.keyboard.press('ArrowLeft');
    await expect.poll(() => time(page)).toBeLessThan(3);
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
    await page.keyboard.press('1');
    await expect(captions(page)).toHaveText('The sun rises over the hills.');

    await page.getByRole('radio', { name: 'Français' }).check();
    await expect(captions(page)).toHaveText(
      'Le soleil se lève sur les collines.',
    );
  });

  test('the seek bar: its time, chapters and preview', async ({ page }) => {
    const seek = page.getByRole('slider', { name: 'Seek' });
    await expect(seek).toHaveAttribute('aria-valuetext', /of/);
    const box = await seek.boundingBox();
    await page.mouse.move(
      (box?.x ?? 0) + (box?.width ?? 0) * 0.8,
      (box?.y ?? 0) + (box?.height ?? 0) / 2,
    );
    await expect(
      page.locator('[data-slot="video-player-preview"]'),
    ).toContainText('Night');
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
  await page.goto('/demos/video-player-next/controlled-video-player-next-demo');
  const night = page.getByRole('button', { name: /Night/ });
  await expect(night).toBeVisible();
  await night.click();
  await expect.poll(() => time(page)).toBeCloseTo(10, 0);
  await expect(night).toHaveAttribute('aria-current', 'true');
});
