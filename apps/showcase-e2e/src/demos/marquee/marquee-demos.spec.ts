import { type Page, expect, test } from '@playwright/test';

const demo = (name: string) => `/demos/marquee/${name}-marquee-demo`;
/** Where a track is along its way, in pixels (x, y). */
const at = (page: Page, nth = 0) =>
  page
    .locator('[data-slot="marquee-track"]')
    .nth(nth)
    .evaluate((track) => {
      const matrix = new DOMMatrix(getComputedStyle(track).transform);
      return { x: Math.round(matrix.m41), y: Math.round(matrix.m42) };
    });

/** The track's motion: playing, paused — or none (still). */
const motion = (page: Page, nth = 0) =>
  page
    .locator('[data-slot="marquee-track"]')
    .nth(nth)
    .evaluate((track) => track.getAnimations()[0]?.playState ?? 'none');
/** Its speed, in pixels a second: one loop's distance over its duration. */
const speed = (page: Page, nth = 0) =>
  page
    .locator('[data-slot="marquee-track"]')
    .nth(nth)
    .evaluate((track) => {
      const effect = track.getAnimations()[0]?.effect as KeyframeEffect;
      const [from, to] = effect
        .getKeyframes()
        .map((frame) =>
          Number(/-?\d+(?:\.\d+)?/.exec(String(frame['transform']))?.[0] ?? 0),
        );
      return Math.abs(to - from) / (Number(effect.getTiming().duration) / 1000);
    });

test.describe('Logos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('logos'));
    // Out of the way: under the pointer, it waits.
    await page.mouse.move(0, 400);
  });

  test('written once: the copies are out of reach', async ({ page }) => {
    const copies = page.locator('[data-slot="marquee-copy"]');
    await expect.poll(() => copies.count()).toBeGreaterThan(1);
    await expect(copies.first()).not.toHaveAttribute('inert');
    await expect(copies.nth(1)).toHaveAttribute('inert', '');
    await expect(copies.nth(1)).toHaveAttribute('aria-hidden', 'true');
    // Each link once, for screen readers and the keyboard.
    await expect(page.getByRole('link', { name: 'Acme' })).toHaveCount(1);
  });

  test('moves left; the button pauses it where it is', async ({ page }) => {
    const start = (await at(page)).x;
    await expect.poll(async () => (await at(page)).x).toBeLessThan(start - 10);
    await page.getByRole('button', { name: 'Pause' }).click();
    await expect.poll(() => motion(page)).toBe('paused');
    const paused = (await at(page)).x;
    await page.getByRole('button', { name: 'Play' }).click();
    await expect.poll(async () => (await at(page)).x).toBeLessThan(paused - 5);
  });

  test('the button, from the keyboard: focus on it does not hold it', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Pause' }).focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: 'Pause' })).toBeFocused();
    const start = (await at(page)).x;
    await expect.poll(async () => (await at(page)).x).toBeLessThan(start - 5);
  });

  test('waits with focus inside', async ({ page }) => {
    await page.getByRole('link', { name: 'Acme' }).focus();
    await expect.poll(() => motion(page)).toBe('paused');
    await page.getByRole('link', { name: 'Acme' }).blur();
    await expect.poll(() => motion(page)).toBe('running');
  });
});

test('Testimonials: the second row goes the other way', async ({ page }) => {
  await page.goto(demo('testimonials'));
  await page.mouse.move(0, 600);
  const [first, second] = [(await at(page, 0)).x, (await at(page, 1)).x];
  await expect.poll(async () => (await at(page, 0)).x).toBeLessThan(first);
  await expect.poll(async () => (await at(page, 1)).x).toBeGreaterThan(second);
});

test('Vertical: goes up', async ({ page }) => {
  await page.goto(demo('vertical'));
  await page.mouse.move(0, 600);
  const start = (await at(page)).y;
  await expect.poll(async () => (await at(page)).y).toBeLessThan(start - 5);
});

test('Speed: short and long content, the same pace', async ({ page }) => {
  await page.goto(demo('speed'));
  await expect.poll(() => speed(page, 0)).toBeCloseTo(40, 0);
  await expect.poll(() => speed(page, 1)).toBeCloseTo(40, 0);
});

test.describe('Reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('still: one copy, a row to scroll', async ({ page }) => {
    await page.goto(demo('testimonials'));
    await expect(page.locator('[data-slot="marquee"]').first()).toHaveAttribute(
      'data-still',
      'true',
    );
    await expect(page.locator('[data-slot="marquee-copy"]')).toHaveCount(2);
    await expect(
      page.locator('[data-slot="marquee-viewport"]').first(),
    ).toHaveCSS('overflow-x', 'auto');
    // No motion at all.
    expect(await motion(page)).toBe('none');
  });
});
