import type { Locator, Page } from '@playwright/test';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/rating/${name}`;

/** A press on a star (1 for the first), so far across it (0 to 1, from its start). */
async function pressStar(
  page: Page,
  rating: Locator,
  star: number,
  across: number,
) {
  const item = starsOf(rating)
    .locator('[data-slot=rating-item]')
    .nth(star - 1);
  await expect(item).toBeVisible();
  const box = await item.boundingBox();
  const rtl = await rating.evaluate(
    (el) => getComputedStyle(el).direction === 'rtl',
  );
  const x = rtl ? 1 - across : across;
  await page.mouse.click(
    (box?.x ?? 0) + (box?.width ?? 0) * x,
    (box?.y ?? 0) + (box?.height ?? 0) / 2,
  );
}

/** The stars' box: the rating itself — the slider (a native range input, visually hidden) inside it, or an image. */
const starsOf = (rating: Locator) =>
  rating.locator('xpath=ancestor-or-self::*[@data-slot="rating"][1]');

/** Each star's fill, 0 to 1. */
const fills = (rating: Locator) =>
  starsOf(rating)
    .locator('[data-slot=rating-item]')
    .evaluateAll((items) =>
      items.map((item) =>
        Number(
          (item as HTMLElement).style.getPropertyValue('--sc-rating-fill'),
        ),
      ),
    );

test.describe('Rating demos', () => {
  test('usage: a slider read out by its value text; the stars hidden', async ({
    page,
  }) => {
    await page.goto(demo('rating-usage-demo'));
    const rating = page.getByRole('slider', { name: 'Rating' });
    await expect(rating).toHaveValue('3');
    await expect(rating).toHaveAttribute('aria-valuetext', '3 out of 5 stars');
    await expect(rating).toHaveAttribute('max', '5');
    // A native range input, out of sight: the stars are drawn beside it.
    await expect(rating).toHaveAttribute('type', 'range');
    await expect(
      starsOf(rating).locator('[data-slot=rating-item]').first(),
    ).toHaveAttribute('aria-hidden', 'true');
    await expect.poll(() => fills(starsOf(rating))).toEqual([1, 1, 1, 0, 0]);
  });

  test('usage: the keys — arrows by one, Home and End to the ends', async ({
    page,
  }) => {
    await page.goto(demo('rating-usage-demo'));
    const rating = page.getByRole('slider', { name: 'Rating' });
    await rating.focus();
    await page.keyboard.press('ArrowRight');
    await expect(rating).toHaveValue('4');
    await page.keyboard.press('ArrowDown');
    await expect(rating).toHaveValue('3');
    await page.keyboard.press('End');
    await expect(rating).toHaveValue('5');
    await page.keyboard.press('ArrowRight');
    await expect(rating).toHaveValue('5');
    await page.keyboard.press('Home');
    await expect(rating).toHaveValue('1');
    // Not deselectable: it stays rated.
    await page.keyboard.press('ArrowLeft');
    await expect(rating).toHaveValue('1');
    await expect(page.getByText('1 out of 5')).toBeVisible();
  });

  test('usage: a press picks a star; a hover previews, leaving shows the score', async ({
    page,
  }) => {
    await page.goto(demo('rating-usage-demo'));
    const rating = page.getByRole('slider', { name: 'Rating' });
    await pressStar(page, starsOf(rating), 5, 0.5);
    await expect(rating).toHaveValue('5');
    await expect(rating).toBeFocused();

    const second = await starsOf(rating)
      .locator('[data-slot=rating-item]')
      .nth(1)
      .boundingBox();
    await page.mouse.move(
      (second?.x ?? 0) + (second?.width ?? 0) / 2,
      (second?.y ?? 0) + (second?.height ?? 0) / 2,
    );
    await expect.poll(() => fills(starsOf(rating))).toEqual([1, 1, 0, 0, 0]);
    await expect(rating).toHaveValue('5');
    await page.mouse.move(0, 0);
    await expect.poll(() => fills(starsOf(rating))).toEqual([1, 1, 1, 1, 1]);
  });

  test('halves: the left half of a star gives a half; the keys move by halves', async ({
    page,
  }) => {
    await page.goto(demo('half-rating-demo'));
    const rating = page.getByRole('slider', { name: 'Rating' });
    await expect(rating).toHaveAttribute(
      'aria-valuetext',
      '3.5 out of 5 stars',
    );
    await expect.poll(() => fills(starsOf(rating))).toEqual([1, 1, 1, 0.5, 0]);
    await pressStar(page, starsOf(rating), 2, 0.25);
    await expect(rating).toHaveValue('1.5');
    await pressStar(page, starsOf(rating), 2, 0.75);
    await expect(rating).toHaveValue('2');
    await page.keyboard.press('ArrowRight');
    await expect(rating).toHaveValue('2.5');
    await page.keyboard.press('Home');
    await expect(rating).toHaveValue('0.5');
  });

  test('form: not rated is null; required, once touched, says so', async ({
    page,
  }) => {
    await page.goto(demo('form-rating-demo'));
    const rating = page.getByRole('slider', { name: 'Your rating' });
    const errors = page.locator('[scFieldErrors]');
    await expect(rating).toHaveAttribute('aria-required', 'true');
    await expect(rating).toHaveValue('0');
    await expect(page.locator('pre')).toContainText('null');
    await rating.focus();
    await rating.blur();
    await expect(errors).toHaveText('Pick at least one star.');
    await expect(rating).toHaveAttribute('aria-invalid', 'true');

    await rating.focus();
    await page.keyboard.press('ArrowRight');
    await expect(rating).toHaveValue('1');
    await expect(errors).toBeEmpty();
    await expect(rating).not.toHaveAttribute('aria-invalid');
    await expect(page.locator('pre')).toContainText('"stars": 1');
  });

  test('its label, tied by `for` to the slider — a native range input (WAVE reads it so); a click on the label focuses it', async ({
    page,
  }) => {
    await page.goto(demo('form-rating-demo'));
    const label = page.locator('label[scLabel]', { hasText: 'Your rating' });
    expect(
      await label.evaluate(
        (l: HTMLLabelElement) => (l.control as HTMLInputElement | null)?.type,
      ),
    ).toBe('range');
    const rating = page.getByRole('slider', { name: 'Your rating' });
    await label.click();
    await expect(rating).toBeFocused();
  });

  test('read-only: an image named by its value text, any score, no focus', async ({
    page,
  }) => {
    await page.goto(demo('readonly-rating-demo'));
    const rating = page.getByRole('img', { name: 'Rated 4.2 out of 5' });
    await expect(rating).toBeVisible();
    await expect(rating).not.toHaveAttribute('tabindex');
    await expect(rating.locator('input')).toHaveCount(0);
    await expect
      .poll(async () => (await fills(starsOf(rating))).map((f) => f.toFixed(1)))
      .toEqual(['1.0', '1.0', '1.0', '1.0', '0.2']);
    await pressStar(page, starsOf(rating), 1, 0.5);
    await expect.poll(async () => (await fills(starsOf(rating)))[1]).toBe(1);
  });

  test('disabled: out of the tab order; a press changes nothing', async ({
    page,
  }) => {
    await page.goto(demo('disabled-rating-demo'));
    const rating = page.getByRole('slider', { name: 'Rating' });
    await expect(rating).toBeDisabled();
    await pressStar(page, starsOf(rating), 5, 0.5);
    await expect(rating).toHaveValue('2');
  });

  test('deselectable: the score pressed again, or Delete, takes it back', async ({
    page,
  }) => {
    await page.goto(demo('deselectable-rating-demo'));
    const rating = page.getByRole('slider', { name: 'Rating' });
    await pressStar(page, starsOf(rating), 3, 0.5);
    await expect(rating).toHaveValue('0');
    await expect(page.getByText('Not rated')).toBeVisible();
    await pressStar(page, starsOf(rating), 4, 0.5);
    await expect(rating).toHaveValue('4');
    await page.keyboard.press('Delete');
    await expect(rating).toHaveValue('0');
    await expect(page.getByText('Not rated')).toBeVisible();
  });

  test('other icons: hearts in your colour, written once, read out by your words', async ({
    page,
  }) => {
    await page.goto(demo('icons-rating-demo'));
    const rating = page.getByRole('slider', { name: 'How much you liked it' });
    await expect(rating).toHaveAttribute('aria-valuetext', '4 of 5 hearts');
    await expect(starsOf(rating)).toHaveClass(/\btext-red-500\b/);
  });

  test('size and colour: your size on the icons, your colour on the rating', async ({
    page,
  }) => {
    await page.goto(demo('size-rating-demo'));
    const icon = page.locator('[data-slot=rating-item] svg').first();
    await expect(icon).toHaveCSS('width', '32px');
    await expect(page.locator('[scRating]')).toHaveClass(/\btext-amber-500\b/);
    // Each star, both layers: the icon written once.
    await expect(page.locator('[data-slot=rating-item] svg')).toHaveCount(10);
  });

  test('RTL: from the right; ← raises it, the right half of a star is its first', async ({
    page,
  }) => {
    await page.goto(demo('rtl-rating-demo'));
    const rating = page.getByRole('slider', { name: 'التقييم' });
    await rating.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(rating).toHaveValue('4');
    await page.keyboard.press('ArrowRight');
    await expect(rating).toHaveValue('3.5');
    // The first star sits on the right; its right half is its first half.
    const items = starsOf(rating).locator('[data-slot=rating-item]');
    const first = await items.first().boundingBox();
    const last = await items.last().boundingBox();
    expect(first?.x ?? 0).toBeGreaterThan(last?.x ?? 0);
    await pressStar(page, starsOf(rating), 2, 0.25);
    await expect(rating).toHaveValue('1.5');
  });
});
