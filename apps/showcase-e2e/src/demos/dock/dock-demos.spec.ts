import { type Locator, type Page, expect, test } from '@playwright/test';

const demo = (name: string) => `/demos/dock/${name}-dock-demo`;
const widths = (page: Page) =>
  page
    .locator('[data-slot="dock-item"]')
    .evaluateAll((items) =>
      items.map((item) => Math.round(item.getBoundingClientRect().width)),
    );
const hover = async (page: Page, item: Locator) => {
  const box = await item.boundingBox();
  const x = (box?.x ?? 0) + (box?.width ?? 0) / 2;
  const y = (box?.y ?? 0) + (box?.height ?? 0) / 2;
  await page.mouse.move(x - 60, y);
  await page.mouse.move(x, y, { steps: 4 });
};

test.describe('Apps', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('apps'));
  });

  test('magnified by distance, neighbours aside; back at rest', async ({
    page,
  }) => {
    await expect.poll(() => widths(page)).toEqual([44, 44, 44, 44, 44, 44, 44]);
    await hover(page, page.getByRole('button', { name: /^Mail/ }));
    // The one under the pointer the largest, the others less by distance.
    await expect.poll(async () => (await widths(page))[2]).toBe(70);
    const [, safari, mail, photos, , , bin] = await widths(page);
    expect(safari).toBeLessThan(mail);
    expect(photos).toBeLessThan(mail);
    expect(bin).toBe(44);
    await page.mouse.move(5, 5);
    await expect.poll(() => widths(page)).toEqual([44, 44, 44, 44, 44, 44, 44]);
  });

  test('the label is the name, read once; the count is in it', async ({
    page,
  }) => {
    await expect(page.getByRole('toolbar', { name: 'Apps' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Mail 3 unread', exact: true }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Finder' }).click();
    await expect(page.getByText('Finder opened.')).toBeVisible();
  });

  test('focused from the keyboard: grown, its label shown', async ({
    page,
  }) => {
    const safari = page.getByRole('button', { name: 'Safari' });
    await page.getByRole('button', { name: 'Finder' }).focus();
    await page.keyboard.press('Tab');
    await expect(safari).toBeFocused();
    await expect.poll(async () => (await widths(page))[1]).toBe(70);
    await expect(safari.locator('[data-slot="dock-label"]')).toHaveCSS(
      'opacity',
      '1',
    );
  });
});

test('Navigation: links, the current page marked', async ({ page }) => {
  await page.goto(demo('navigation'));
  const nav = page.getByRole('navigation', { name: 'Sections' });
  await expect(nav.getByRole('link', { name: 'Home' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await nav.getByRole('link', { name: 'Inbox' }).click();
  await expect(nav.getByRole('link', { name: 'Inbox' })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByText('Current: inbox')).toBeVisible();
});

test('Vertical: grows along its height', async ({ page }) => {
  await page.goto(demo('vertical'));
  const safari = page.getByRole('button', { name: 'Safari' });
  const box = await safari.boundingBox();
  await page.mouse.move((box?.x ?? 0) + 20, (box?.y ?? 0) - 60);
  await page.mouse.move((box?.x ?? 0) + 20, (box?.y ?? 0) + 22, { steps: 4 });
  await expect.poll(async () => (await widths(page))[1]).toBe(70);
});

test('Plain: nothing grows', async ({ page }) => {
  await page.goto(demo('plain'));
  await hover(page, page.getByRole('button', { name: /^Mail/ }));
  await expect.poll(() => widths(page)).toEqual([44, 44, 44, 44, 44, 44]);
});

test.describe('Reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('nothing grows', async ({ page }) => {
    await page.goto(demo('apps'));
    await hover(page, page.getByRole('button', { name: /^Mail/ }));
    await expect.poll(() => widths(page)).toEqual([44, 44, 44, 44, 44, 44, 44]);
  });
});
