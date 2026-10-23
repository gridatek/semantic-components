import { type Page, expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

const video = (page: Page) => page.locator('video');
const player = (page: Page) => page.locator('[data-slot="video-player"]');
const captions = (page: Page) =>
  page.locator('[data-slot="video-player-captions-display"]');
const time = (page: Page) =>
  video(page).evaluate((v: HTMLVideoElement) => v.currentTime);
const paused = (page: Page) =>
  video(page).evaluate((v: HTMLVideoElement) => v.paused);

/** Plays it, then pauses: the controls show from the first play on. */
async function start(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Play' }).first().click();
  await expect.poll(() => paused(page)).toBe(false);
  await player(page).focus();
  await page.keyboard.press('k');
  await expect.poll(() => paused(page)).toBe(true);
}

test.describe('Player', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/video-player/player-video-player-demo');
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.duration))
      .toBeGreaterThan(50);
  });

  test('before the first play: its play and the length only', async ({
    page,
  }) => {
    await expect(page.getByRole('button', { name: 'Play' })).toHaveCount(1);
    await expect(
      page.locator('[data-slot="video-player-start-duration"]'),
    ).toHaveText(/0?0:52/);
    await expect(page.getByRole('slider', { name: 'Seek' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Fullscreen' })).toHaveCount(
      0,
    );
    await expect(page.getByRole('button', { name: 'Captions' })).toHaveCount(0);

    // Once played, the controls — and no more badge.
    await start(page);
    await expect(
      page.getByRole('button', { name: 'Fullscreen' }),
    ).toBeVisible();
    await expect(
      page.locator('[data-slot="video-player-start-duration"]'),
    ).toBeHidden();
  });

  test('a wide player: one bar with every control', async ({ page }) => {
    await start(page);
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
    await start(page);
    const box = await player(page).boundingBox();
    if (!box) throw new Error('no player');
    // As Vidstack's small layout: captions at the top, play in the middle,
    // time and fullscreen at the bottom — all inside the player.
    for (const name of ['Captions', 'Play', 'Fullscreen']) {
      const button = page.getByRole('button', { name });
      await expect(button).toHaveCount(1);
      await expect(button).toBeVisible();
      const b = await button.boundingBox();
      expect(b && b.x >= box.x && b.x + b.width <= box.x + box.width).toBe(
        true,
      );
    }
    // Out of a small player: the skips, mute, the volume slider, the
    // speeds, picture-in-picture.
    await expect(page.getByRole('button', { name: /10 seconds/ })).toHaveCount(
      0,
    );
    await expect(page.getByRole('button', { name: 'Mute' })).toHaveCount(0);
    await expect(page.getByRole('slider', { name: 'Volume' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /×$/ })).toHaveCount(0);
    await expect(
      page.getByRole('button', { name: 'Picture in picture' }),
    ).toHaveCount(0);
  });

  test('plays and pauses, without an error', async ({ page }) => {
    // Playing reads the video every frame: no change-detection loop (NG0103).
    const errors = collectErrors(page);
    await page.getByRole('button', { name: 'Play' }).first().click();
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(false);
    await expect.poll(() => time(page)).toBeGreaterThan(1);
    await page.getByRole('button', { name: 'Pause' }).click();
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(true);
    expect(errors).toEqual([]);
  });

  test('ended: Replay, which plays it again from the start', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Play' }).first().click();
    // Near the end, then let it finish.
    await video(page).evaluate((v: HTMLVideoElement) => {
      v.currentTime = v.duration - 0.5;
    });
    await expect(
      page.getByRole('button', { name: 'Replay' }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Play', exact: true }),
    ).toHaveCount(0);
    await page.getByRole('button', { name: 'Replay' }).first().click();
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(false);
    await expect.poll(() => time(page)).toBeLessThan(5);
  });

  test('a tap on the middle play plays it @mobile', async ({ page }) => {
    await page.getByRole('button', { name: 'Play' }).tap();
    await expect
      .poll(() => video(page).evaluate((v: HTMLVideoElement) => v.paused))
      .toBe(false);
  });

  test('the keys, focused in the player', async ({ page }) => {
    await start(page);
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
    await start(page);
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
    await start(page);
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
    await start(page);
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
