import { collectErrors, focus, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const audio = (page: Page) => page.locator('audio');
const nowPlaying = (page: Page) => page.getByTestId('now-playing');
const time = (page: Page) =>
  audio(page).evaluate((a: HTMLAudioElement) => a.currentTime);
const paused = (page: Page) =>
  audio(page).evaluate((a: HTMLAudioElement) => a.paused);
const file = (page: Page) =>
  audio(page).evaluate((a: HTMLAudioElement) => a.currentSrc.split('/').pop());

let errors: string[];

test.beforeEach(async ({ page }) => {
  errors = collectErrors(page);
  await page.goto('/demos/playlist/playlist-usage-demo');
  await expect
    .poll(() => audio(page).evaluate((a: HTMLAudioElement) => a.duration))
    .toBeGreaterThan(30);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('next and previous; paused, the next song waits', async ({ page }) => {
  await expect(nowPlaying(page)).toHaveText('Carefree');
  await page.getByRole('button', { name: 'Next song' }).click();
  await expect(nowPlaying(page)).toHaveText('Sneaky Snitch');
  await expect.poll(() => file(page)).toBe('sneaky-snitch.mp3');
  expect(await paused(page)).toBe(true);
  await page.getByRole('button', { name: 'Previous song' }).click();
  await expect(nowPlaying(page)).toHaveText('Carefree');
});

test('playing, the next song plays at once; the end moves on', async ({
  page,
}) => {
  await page.getByRole('button', { name: 'Play' }).click();
  await expect.poll(() => paused(page)).toBe(false);
  await page.getByRole('button', { name: 'Next song' }).click();
  await expect.poll(() => file(page)).toBe('sneaky-snitch.mp3');
  await expect.poll(() => paused(page)).toBe(false);
  // Near its end: the next one follows.
  await audio(page).evaluate((a: HTMLAudioElement) => {
    a.currentTime = a.duration - 0.3;
  });
  await expect(nowPlaying(page)).toHaveText('Gymnopédie No. 1');
  await expect.poll(() => paused(page)).toBe(false);
});

test('previous: the start first, then the song before', async ({ page }) => {
  await page.getByRole('button', { name: 'Next song' }).click();
  await expect.poll(() => file(page)).toBe('sneaky-snitch.mp3');
  // Its length known: WebKit drops a time set before it.
  await expect
    .poll(() => audio(page).evaluate((a: HTMLAudioElement) => a.readyState))
    .toBeGreaterThanOrEqual(1);
  await audio(page).evaluate((a: HTMLAudioElement) => {
    a.currentTime = 10;
  });
  await expect.poll(() => time(page)).toBeGreaterThan(9);
  await page.getByRole('button', { name: 'Previous song' }).click();
  await expect.poll(() => time(page)).toBeLessThan(1);
  await expect(nowPlaying(page)).toHaveText('Sneaky Snitch');
  await page.getByRole('button', { name: 'Previous song' }).click();
  await expect(nowPlaying(page)).toHaveText('Carefree');
});

test('after the last: it stops — or, repeat all, the first plays', async ({
  page,
}) => {
  const repeat = page.getByRole('button', { name: /^Repeat/ });
  await expect(repeat).toHaveText('Repeat: off');
  await page.getByRole('button', { name: /Gymnop/ }).click();
  await expect.poll(() => paused(page)).toBe(false);
  await page.getByRole('button', { name: 'Next song' }).click();
  await expect(nowPlaying(page)).toHaveText('Carefree');
  await expect.poll(() => paused(page)).toBe(true);

  await repeat.click();
  await expect(repeat).toHaveText('Repeat: all');
  await page.getByRole('button', { name: /Gymnop/ }).click();
  await expect.poll(() => paused(page)).toBe(false);
  await page.getByRole('button', { name: 'Next song' }).click();
  await expect(nowPlaying(page)).toHaveText('Carefree');
  await expect.poll(() => paused(page)).toBe(false);
});

test('repeat one: the player loops — its R key too', async ({ page }) => {
  const repeat = page.getByRole('button', { name: /^Repeat/ });
  await repeat.click();
  await repeat.click();
  await expect(repeat).toHaveText('Repeat: one');
  await expect
    .poll(() => audio(page).evaluate((a: HTMLAudioElement) => a.loop))
    .toBe(true);
  await page.locator('[data-slot="media-player"]').focus();
  await page.keyboard.press('r');
  await expect(repeat).toHaveText('Repeat: off');
});

test('shuffle: every song once, the one playing first', async ({ page }) => {
  const shuffle = page.getByRole('button', { name: 'Shuffle' });
  await shuffle.click();
  await expect(shuffle).toHaveAttribute('aria-pressed', 'true');
  const seen = new Set([await nowPlaying(page).textContent()]);
  for (let i = 0; i < 2; i++) {
    const before = await nowPlaying(page).textContent();
    await page.getByRole('button', { name: 'Next song' }).click();
    await expect(nowPlaying(page)).not.toHaveText(before ?? '');
    seen.add(await nowPlaying(page).textContent());
  }
  expect(seen.size).toBe(3);
});

test('the list: the one playing is current; a choice plays', async ({
  page,
}) => {
  const list = page.getByRole('list', { name: 'Playlist' });
  await expect(list.getByRole('button', { name: /Carefree/ })).toHaveAttribute(
    'aria-current',
    'true',
  );
  await list.getByRole('button', { name: /Sneaky Snitch/ }).click();
  await expect(nowPlaying(page)).toHaveText('Sneaky Snitch');
  await expect.poll(() => paused(page)).toBe(false);
  await expect(
    list.getByRole('button', { name: /Sneaky Snitch/ }),
  ).toHaveAttribute('aria-current', 'true');
});

test('the waveform: read from the file, a slider over the time', async ({
  page,
}) => {
  const waveform = page.getByRole('slider', { name: 'Seek' });
  await expect(waveform).not.toHaveAttribute('data-loading');
  await expect(waveform).toHaveAttribute('aria-valuetext', /^0?0:00$/);
  await focus(waveform);
  await press(page, 'ArrowRight');
  await expect.poll(() => time(page)).toBeCloseTo(5, 0);
  await expect(waveform).toHaveAttribute('aria-valuetext', /^0?0:05$/);
  const box = await waveform.boundingBox();
  await page.mouse.click(
    (box?.x ?? 0) + (box?.width ?? 0) * 0.5,
    (box?.y ?? 0) + (box?.height ?? 0) / 2,
  );
  await expect.poll(() => time(page)).toBeGreaterThan(15);
  // Another song: read again.
  await page.getByRole('button', { name: 'Next song' }).click();
  await expect(waveform).not.toHaveAttribute('data-loading');
});

test.describe('RTL', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/playlist/rtl-playlist-demo');
    // Its length known, as for the usage demo: under load (WebKit on CI) it
    // came after the 5s a seek is given.
    await expect
      .poll(() => audio(page).evaluate((a: HTMLAudioElement) => a.duration))
      .toBeGreaterThan(30);
  });

  test('the waveform runs right to left', async ({ page }) => {
    const waveform = page.getByRole('slider', { name: 'موضع التشغيل' });
    await expect(waveform).not.toHaveAttribute('data-loading');
    await focus(waveform);
    // ← moves forward, as the text reads.
    await press(page, 'ArrowLeft');
    await expect.poll(() => time(page)).toBeCloseTo(5, 0);
    // A click near the right edge: near the start.
    const box = await waveform.boundingBox();
    await page.mouse.click(
      (box?.x ?? 0) + (box?.width ?? 0) * 0.95,
      (box?.y ?? 0) + (box?.height ?? 0) / 2,
    );
    await expect.poll(() => time(page)).toBeLessThan(4);
  });
});
