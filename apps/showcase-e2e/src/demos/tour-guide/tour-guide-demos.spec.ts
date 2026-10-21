import { type Page, expect, test } from '@playwright/test';

const demo = (name: string) => `/demos/tour-guide/${name}-tour-guide-demo`;
const dialog = (page: Page) => page.getByRole('dialog');
const card = (page: Page) => page.locator('[data-slot="tour-guide-card"]');

test.describe('Tour', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('tour'));
    await page.getByRole('button', { name: 'Take the tour' }).click();
    // Open, and ready for the keys.
    await expect(card(page)).toBeFocused();
  });

  test('a modal dialog, named and described by the step; focus on it', async ({
    page,
  }) => {
    await expect(dialog(page)).toHaveAccessibleName('Welcome to Acme');
    await expect(dialog(page)).toHaveAccessibleDescription(
      'A minute to see around — or close it, and find your own way.',
    );
    await expect(card(page)).toBeFocused();
    // No target: centred.
    await expect(card(page)).toHaveAttribute('data-side', 'center');
    await expect(page.getByRole('button', { name: 'Back' })).toBeDisabled();
  });

  test('the spotlight on the target; the card beside it', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await expect(dialog(page)).toHaveAccessibleName('Search everything');
    await expect(card(page)).toHaveAttribute('data-side', 'bottom');
    const search = await page
      .getByRole('searchbox', { name: 'Search' })
      .boundingBox();
    const spotlight = page.locator('[data-slot="tour-guide-spotlight"]');
    // Around the target, with its padding.
    await expect
      .poll(async () => {
        const lit = await spotlight.boundingBox();
        return (
          !!lit &&
          !!search &&
          lit.x <= search.x &&
          lit.y <= search.y &&
          lit.x + lit.width >= search.x + search.width &&
          lit.y + lit.height >= search.y + search.height
        );
      })
      .toBe(true);
  });

  test('no room on its side: flipped', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(dialog(page)).toHaveAccessibleName('Start a project');
    // Asked on top; no room above — below.
    await expect(card(page)).toHaveAttribute('data-side', 'bottom');
  });

  test('Escape: closed, focus back where it started', async ({ page }) => {
    await page.keyboard.press('Escape');
    await expect(dialog(page)).toBeHidden();
    // From the keyboard (a click focuses no button in Safari: nothing to go back to).
    const start = page.getByRole('button', { name: 'Take the tour' });
    await start.focus();
    await page.keyboard.press('Enter');
    await expect(card(page)).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Escape');
    await expect(dialog(page)).toBeHidden();
    await expect(start).toBeFocused();
  });
});

test('Minimal: Next, then Done', async ({ page }) => {
  await page.goto(demo('minimal'));
  await page.getByRole('button', { name: 'Show me' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(dialog(page)).toBeHidden();
});

test('Scrolling: each target scrolled into view', async ({ page }) => {
  await page.goto(demo('scrolling'));
  await page.getByRole('button', { name: 'Tour the page' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(dialog(page)).toHaveAccessibleName('The questions');
  const target = page.locator('section').filter({ hasText: 'Asked often' });
  await expect(target).toBeInViewport();
});

test('Controlled: from any step; finished, or closed', async ({ page }) => {
  await page.goto(demo('controlled'));
  await page.getByRole('button', { name: 'Start at Sections' }).click();
  await expect(dialog(page)).toHaveAccessibleName('Sections');
  await page.getByRole('button', { name: 'Close tour' }).click();
  await expect(page.getByRole('status')).toHaveText('Closed at step 2.');
  await page.getByRole('button', { name: 'Start at Create' }).click();
  await page.getByRole('button', { name: 'Done' }).click();
  await expect(page.getByRole('status')).toHaveText('Finished.');
});
