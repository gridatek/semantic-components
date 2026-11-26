import { collectErrors } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/media-player/${name}-demo`;
const media = (page: Page) => page.locator('video, audio').first();
const player = (page: Page) =>
  page.locator('[data-slot="media-player"]').first();
const captions = (page: Page) =>
  page.locator('[data-slot="media-player-captions-display"]');
const time = (page: Page) =>
  media(page).evaluate((v: HTMLMediaElement) => v.currentTime);
const paused = (page: Page) =>
  media(page).evaluate((v: HTMLMediaElement) => v.paused);

async function open(page: Page, name: string): Promise<void> {
  await page.goto(demo(name));
  await expect
    .poll(() => media(page).evaluate((v: HTMLMediaElement) => v.duration))
    .toBeGreaterThan(30);
}

/** Plays it, then pauses: the controls show from the first play on. */
async function start(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Play' }).first().click();
  await expect.poll(() => paused(page)).toBe(false);
  await player(page).focus();
  await page.keyboard.press('k');
  await expect.poll(() => paused(page)).toBe(true);
}

test.describe('Usage', () => {
  test.beforeEach(({ page }) => open(page, 'media-player-usage'));

  test('before the first play: its play and the length only', async ({
    page,
  }) => {
    await expect(page.getByRole('button', { name: 'Play' })).toHaveCount(1);
    await expect(player(page).locator('> time')).toHaveText(/0?0:52/);
    await expect(page.getByRole('slider', { name: 'Seek' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Fullscreen' })).toHaveCount(
      0,
    );

    await start(page);
    await expect(
      page.getByRole('button', { name: 'Fullscreen' }),
    ).toBeVisible();
    await expect(player(page).locator('> time')).toHaveCount(0);
  });

  test('a wide player: one bar with every control', async ({ page }) => {
    await start(page);
    for (const name of [
      'Back 10 seconds',
      'Forward 10 seconds',
      'Mute',
      'Loop',
      'Captions',
      'Picture in picture',
      'Fullscreen',
    ]) {
      await expect(page.getByRole('button', { name })).toBeVisible();
    }
    await expect(page.getByRole('slider', { name: 'Volume' })).toBeVisible();
    await expect(page.getByRole('button', { name: '1.5×' })).toBeVisible();
  });

  test('a small player: the small layout, nothing cut off @mobile', async ({
    page,
  }) => {
    await start(page);
    const box = (await player(page).boundingBox()) ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    // Play in the middle; time, captions and fullscreen at the bottom.
    for (const name of ['Captions', 'Play', 'Fullscreen']) {
      const button = page.getByRole('button', { name });
      await expect(button).toHaveCount(1);
      await expect(button).toBeVisible();
      const b = await button.boundingBox();
      expect(b && b.x >= box.x && b.x + b.width <= box.x + box.width).toBe(
        true,
      );
    }
    await expect(page.getByRole('button', { name: /10 seconds/ })).toHaveCount(
      0,
    );
    await expect(page.getByRole('button', { name: 'Mute' })).toHaveCount(0);
    await expect(page.getByRole('slider', { name: 'Volume' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: /×$/ })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Loop' })).toHaveCount(0);
  });

  test('plays and pauses, without an error', async ({ page }) => {
    // Playing reads the video every frame: no change-detection loop (NG0103).
    const errors = collectErrors(page);
    await page.getByRole('button', { name: 'Play' }).first().click();
    await expect.poll(() => paused(page)).toBe(false);
    await expect.poll(() => time(page)).toBeGreaterThan(1);
    await page.getByRole('button', { name: 'Pause' }).click();
    await expect.poll(() => paused(page)).toBe(true);
    expect(errors).toEqual([]);
  });

  test('ended: Replay, which plays it again from the start', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Play' }).first().click();
    await media(page).evaluate((v: HTMLMediaElement) => {
      v.currentTime = v.duration - 0.5;
    });
    await expect(
      page.getByRole('button', { name: 'Replay' }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Play', exact: true }),
    ).toHaveCount(0);
    await page.getByRole('button', { name: 'Replay' }).first().click();
    await expect.poll(() => paused(page)).toBe(false);
    await expect.poll(() => time(page)).toBeLessThan(5);
  });

  test('a tap on the middle play plays it @mobile', async ({ page }) => {
    await page.getByRole('button', { name: 'Play' }).tap();
    await expect.poll(() => paused(page)).toBe(false);
  });

  test('playing, a tap shows the controls — it does not pause @mobile', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Play' }).tap();
    await expect.poll(() => paused(page)).toBe(false);
    await expect(player(page)).toHaveAttribute('data-idle', 'true', {
      timeout: 5000,
    });
    const box = (await player(page).boundingBox()) ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    const tap = () =>
      page.touchscreen.tap(box.x + box.width * 0.2, box.y + box.height * 0.4);

    await tap();
    await expect(player(page)).not.toHaveAttribute('data-idle');
    await expect(
      page.getByRole('button', { name: 'Fullscreen' }),
    ).toBeVisible();
    expect(await paused(page)).toBe(false);

    await tap();
    await expect(player(page)).toHaveAttribute('data-idle', 'true');
    expect(await paused(page)).toBe(false);
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
    await page.keyboard.press('r');
    await expect(page.getByRole('button', { name: 'Loop' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect
      .poll(() => media(page).evaluate((v: HTMLMediaElement) => v.loop))
      .toBe(true);
    await page.keyboard.press('>');
    await expect(page.getByRole('button', { name: '1.25×' })).toHaveCount(0);
    await expect
      .poll(() => media(page).evaluate((v: HTMLMediaElement) => v.playbackRate))
      .toBe(1.25);
    await page.keyboard.press('<');
    await page.keyboard.press('<');
    await expect
      .poll(() => media(page).evaluate((v: HTMLMediaElement) => v.playbackRate))
      .toBe(0.75);
  });

  test('the seek bar: its time, its keys, chapters in the preview', async ({
    page,
  }) => {
    await start(page);
    const seek = page.getByRole('slider', { name: 'Seek' });
    await expect(seek).toHaveAttribute('aria-valuetext', /^0?0:00$/);
    await seek.focus();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => time(page)).toBeCloseTo(5, 0);
    await expect(seek).toHaveAttribute('aria-valuetext', /^0?0:05$/);
    const box = await seek.boundingBox();
    await page.mouse.move(
      (box?.x ?? 0) + (box?.width ?? 0) * 0.5,
      (box?.y ?? 0) + (box?.height ?? 0) / 2,
    );
    const preview = page.locator('[data-slot="media-player-preview"]');
    await expect(preview).toContainText('The dragon');
    // Above the seek bar, inside the player.
    const p = await preview.boundingBox();
    const b = await player(page).boundingBox();
    expect(p && b && p.y + p.height <= (box?.y ?? 0) + 1).toBe(true);
    expect(p && b && p.x >= b.x && p.x + p.width <= b.x + b.width).toBe(true);
  });

  test('a speed is pressed while it plays at it', async ({ page }) => {
    await start(page);
    const fast = page.getByRole('button', { name: '1.5×' });
    await fast.click();
    await expect(fast).toHaveAttribute('aria-pressed', 'true');
    await expect
      .poll(() => media(page).evaluate((v: HTMLMediaElement) => v.playbackRate))
      .toBe(1.5);
  });
});

test('Responsive: the same template, small in a narrow box', async ({
  page,
}) => {
  await open(page, 'responsive-media-player');
  await start(page);
  await expect(
    page.getByRole('button', { name: 'Back 10 seconds' }),
  ).toBeVisible();
  // Medium: the speeds and loop go first; the skips stay.
  await page.getByTestId('box').evaluate((box: HTMLElement) => {
    box.style.width = '620px';
  });
  await expect(page.getByRole('button', { name: '1.5×' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Loop' })).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Back 10 seconds' }),
  ).toBeVisible();
  // Small.
  await page.getByTestId('box').evaluate((box: HTMLElement) => {
    box.style.width = '380px';
  });
  await expect(page.getByRole('button', { name: /10 seconds/ })).toHaveCount(0);
  await expect(page.getByRole('slider', { name: 'Volume' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Play' })).toHaveCount(1);
  const controls = page.locator('[data-slot="media-player-controls"]');
  await expect
    .poll(() =>
      controls.evaluate((c: HTMLElement) => c.scrollWidth <= c.clientWidth),
    )
    .toBe(true);
  // The seek bar: at the bottom edge.
  const seek = await page.getByRole('slider', { name: 'Seek' }).boundingBox();
  const fullscreen = await page
    .getByRole('button', { name: 'Fullscreen' })
    .boundingBox();
  expect((seek?.y ?? 0) > (fullscreen?.y ?? 0)).toBe(true);
});

test('Captions: shown by the player, in the language chosen', async ({
  page,
}) => {
  await open(page, 'captions-media-player');
  await player(page).focus();
  await page.keyboard.press('c');
  await expect(page.getByRole('button', { name: 'Captions' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('radio', { name: 'English' })).toBeChecked();
  await page.keyboard.press('3');
  await expect(captions(page)).toHaveText("I'm searching for someone.");
  await page.getByRole('radio', { name: 'Français' }).check();
  await expect(captions(page)).toHaveText("Je cherche quelqu'un.");
});

test('Controlled: chapters jump, from outside', async ({ page }) => {
  await open(page, 'controlled-media-player');
  const desert = page.getByRole('button', { name: /The desert/ });
  await expect(desert).toBeVisible();
  await desert.click();
  await expect.poll(() => time(page)).toBeCloseTo(36, 0);
  await expect(desert).toHaveAttribute('aria-current', 'true');
});

test('Controlled: chapters jump while it plays', async ({ page }) => {
  await open(page, 'controlled-media-player');
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await expect.poll(() => paused(page)).toBe(false);
  await page.getByRole('button', { name: /The dragon/ }).click();
  await expect.poll(() => time(page)).toBeGreaterThan(24);
  await page.getByRole('button', { name: /The gatekeeper/ }).click();
  await expect.poll(() => time(page)).toBeLessThan(15);
});

test('Audio: a bar — plays, skips, no fullscreen', async ({ page }) => {
  await open(page, 'audio-media-player');
  await expect(player(page)).toHaveAttribute('data-kind', 'audio');
  await expect(page.getByRole('button', { name: 'Fullscreen' })).toHaveCount(0);
  await expect(page.getByRole('slider', { name: 'Volume' })).toBeVisible();
  await page.getByRole('button', { name: 'Play' }).click();
  await expect.poll(() => paused(page)).toBe(false);
  await page.getByRole('button', { name: 'Pause' }).click();
  await expect.poll(() => paused(page)).toBe(true);
  await media(page).evaluate((v: HTMLMediaElement) => {
    v.currentTime = 20;
  });
  // The player at 20 too (its seek bar says so): a click before counted from
  // 0 (WebKit on CI, the seek landing late).
  await expect(page.getByRole('slider', { name: 'Seek' })).toHaveValue('20');
  await page.getByRole('button', { name: 'Back 10 seconds' }).click();
  await expect.poll(() => time(page)).toBeCloseTo(10, 0);
});

test('Error: the message, and a way out', async ({ page }) => {
  await page.goto(demo('error-media-player'));
  const alert = page.getByRole('alert');
  await expect(alert).toContainText('could not be played');
  await alert.getByRole('button', { name: 'Try again' }).click();
  await expect(alert).toHaveCount(0);
  await expect
    .poll(() => media(page).evaluate((v: HTMLMediaElement) => v.duration))
    .toBeGreaterThan(50);
});

test('RTL: the seek bar runs right to left', async ({ page }) => {
  await open(page, 'rtl-media-player');
  await page.getByRole('button', { name: 'تشغيل' }).first().click();
  await expect.poll(() => paused(page)).toBe(false);
  await player(page).focus();
  await page.keyboard.press('k');
  const seek = page.getByRole('slider', { name: 'موضع التشغيل' });
  await seek.focus();
  // ← moves forward, as the text reads.
  await page.keyboard.press('ArrowLeft');
  await expect.poll(() => time(page)).toBeGreaterThan(4);
});
