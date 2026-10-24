import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const audio = (page: Page) => page.locator('audio');
const state = (page: Page) =>
  audio(page).evaluate((a: HTMLAudioElement) => ({
    paused: a.paused,
    time: a.currentTime,
    src: a.src.split('/').pop(),
  }));

test.describe('Player', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/audio-player/player-audio-player-demo');
    await expect
      .poll(() => audio(page).evaluate((a: HTMLAudioElement) => a.duration))
      .toBeGreaterThan(39);
  });

  test('plays and pauses, without an error', async ({ page }) => {
    // Playing reads the audio every frame: no change-detection loop (NG0103).
    const errors = collectErrors(page);
    await page.getByRole('button', { name: 'Play' }).click();
    await expect.poll(async () => (await state(page)).paused).toBe(false);
    await expect.poll(async () => (await state(page)).time).toBeGreaterThan(1);
    await page.getByRole('button', { name: 'Pause' }).click();
    await expect.poll(async () => (await state(page)).paused).toBe(true);
    expect(errors).toEqual([]);
  });

  test('the next track, the previous, and one from the playlist', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Next track' }).click();
    await expect(page.getByText('Sneaky Snitch').first()).toBeVisible();
    await expect
      .poll(async () => (await state(page)).src)
      .toBe('sneaky-snitch.mp3');
    await page.getByRole('button', { name: 'Previous track' }).click();
    await expect.poll(async () => (await state(page)).src).toBe('carefree.mp3');
    await page.getByRole('button', { name: /Gymnopédie/ }).click();
    await expect
      .poll(async () => (await state(page)).src)
      .toBe('gymnopedie-no-1.mp3');
    await expect.poll(async () => (await state(page)).paused).toBe(false);
    // The last: no next, unless repeating them all.
    await expect(
      page.getByRole('button', { name: 'Next track' }),
    ).toBeDisabled();
    await page.getByRole('button', { name: 'Repeat: off' }).click();
    await expect(
      page.getByRole('button', { name: 'Repeat: all' }),
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(
      page.getByRole('button', { name: 'Next track' }),
    ).toBeEnabled();
  });

  test('the waveform: a slider that seeks', async ({ page }) => {
    const waveform = page.getByRole('slider', { name: 'Seek' });
    await expect(waveform).toHaveAttribute('aria-valuemax', '40');
    await waveform.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(async () => (await state(page)).time).toBeCloseTo(5, 0);
    await expect(waveform).toHaveAttribute('aria-valuetext', /of/);
    const box = await waveform.boundingBox();
    await page.mouse.click(
      (box?.x ?? 0) + (box?.width ?? 0) * 0.5,
      (box?.y ?? 0) + (box?.height ?? 0) / 2,
    );
    await expect.poll(async () => (await state(page)).time).toBeCloseTo(20, 0);
  });

  test('the waveform: its bars, read from the file', async ({ page }) => {
    const webAudio = await page.evaluate(
      () => typeof OfflineAudioContext !== 'undefined',
    );
    test.skip(!webAudio, 'No Web Audio in this browser build');
    await expect(
      page.locator('[data-slot="audio-player-waveform"]'),
    ).not.toHaveAttribute('data-loading');
  });

  test('the keys, focused in the player', async ({ page }) => {
    await page.getByRole('button', { name: 'Shuffle' }).focus();
    await page.keyboard.press('5');
    await expect.poll(async () => (await state(page)).time).toBeCloseTo(20, 0);
    await page.keyboard.press('n');
    await expect
      .poll(async () => (await state(page)).src)
      .toBe('sneaky-snitch.mp3');
    await page.keyboard.press('m');
    await expect(page.getByRole('button', { name: 'Mute' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});

test('Minimal: one file, its own src', async ({ page }) => {
  await page.goto('/demos/audio-player/minimal-audio-player-demo');
  await page.getByRole('button', { name: 'Play' }).click();
  await expect.poll(async () => (await state(page)).time).toBeGreaterThan(0.3);
  await expect(page.locator('time')).toHaveText(/^-00:3\d$/);
});

test('Controlled: the track and repeat, from outside, while it plays', async ({
  page,
}) => {
  await page.goto('/demos/audio-player/controlled-audio-player-demo');
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await expect.poll(async () => (await state(page)).paused).toBe(false);
  await page.getByRole('button', { name: /Sneaky Snitch/ }).click();
  await expect
    .poll(async () => (await state(page)).src)
    .toBe('sneaky-snitch.mp3');
  await expect.poll(async () => (await state(page)).paused).toBe(false);
  // Repeat one: at its end, the track starts again.
  await page.getByRole('radio', { name: 'one' }).check();
  await audio(page).evaluate((a: HTMLAudioElement) => (a.currentTime = 39));
  await expect.poll(async () => (await state(page)).time).toBeLessThan(5);
  await expect
    .poll(async () => (await state(page)).src)
    .toBe('sneaky-snitch.mp3');
});
