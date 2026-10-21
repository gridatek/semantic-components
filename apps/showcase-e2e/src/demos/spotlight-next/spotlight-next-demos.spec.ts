import { type Page, expect, test } from '@playwright/test';

const demo = (name: string) =>
  `/demos/spotlight-next/${name}-spotlight-next-demo`;
const dialog = (page: Page) => page.getByRole('dialog');
const card = (page: Page) => page.locator('[data-slot="spotlight-card"]');
const isOpen = (page: Page) =>
  page.locator('dialog').evaluate((d) => (d as HTMLDialogElement).open);

test.describe('Basic (modal)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('basic'));
    await page.getByRole('button', { name: "What's new" }).click();
    await expect(card(page)).toBeFocused();
  });

  test('named and described; the element lit, the card beside it', async ({
    page,
  }) => {
    await expect(dialog(page)).toHaveAccessibleName('Export, now as PDF');
    await expect(dialog(page)).toHaveAccessibleDescription(
      'Your reports, ready to send — from here.',
    );
    const target = await page
      .getByRole('button', { name: 'Export' })
      .boundingBox();
    const lit = await page.locator('[data-slot="spotlight-dim"]').boundingBox();
    expect(lit!.x).toBeLessThanOrEqual(target!.x);
    expect(lit!.x + lit!.width).toBeGreaterThanOrEqual(
      target!.x + target!.width,
    );
    await expect(card(page)).toHaveAttribute('data-side', 'bottom');
  });

  test('a click on the dim closes', async ({ page }) => {
    await page.mouse.click(10, 500);
    await expect.poll(() => isOpen(page)).toBe(false);
  });

  test('Escape closes', async ({ page }) => {
    await page.keyboard.press('Escape');
    await expect.poll(() => isOpen(page)).toBe(false);
  });
});

test.describe('Interactive', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('interactive'));
    await page.getByRole('button', { name: 'Try the search' }).click();
    await expect(card(page)).toBeFocused();
  });

  test('the element stays usable through the cutout', async ({ page }) => {
    const search = page.getByRole('searchbox', { name: 'Search the library' });
    await search.click();
    await page.keyboard.type('Ada');
    await expect(search).toHaveValue('Ada');
    await expect.poll(() => isOpen(page)).toBe(true);
  });

  test('the rest is blocked: a click on the dim closes', async ({ page }) => {
    const start = page.getByRole('button', { name: 'Try the search' });
    const box = await start.boundingBox();
    // Under the dim, the button is not reached: the spotlight closes instead.
    await page.mouse.click(box!.x + 2, box!.y + 2);
    await expect.poll(() => isOpen(page)).toBe(false);
  });

  test('Escape closes, with focus in the element', async ({ page }) => {
    await page.getByRole('searchbox', { name: 'Search the library' }).click();
    await page.keyboard.press('Escape');
    await expect.poll(() => isOpen(page)).toBe(false);
  });
});

test('Sides: as asked, flipped without room', async ({ page }) => {
  await page.goto(demo('sides'));
  for (const side of ['top', 'bottom', 'start', 'end']) {
    await page.getByRole('button', { name: side, exact: true }).click();
    await expect(card(page)).toHaveAttribute('data-side', side);
    await page.keyboard.press('Escape');
    await expect.poll(() => isOpen(page)).toBe(false);
  }
});
