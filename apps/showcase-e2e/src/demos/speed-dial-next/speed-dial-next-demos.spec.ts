import { expect, test } from '@playwright/test';

test.describe('Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/speed-dial-next/basic-speed-dial-next-demo');
  });

  test('opens on its first action; an action closes it', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Actions' });
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // The label is the action's name — once.
    const share = page.getByRole('menuitem', { name: 'Share', exact: true });
    await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeFocused();
    await share.click();
    await expect(page.getByText('Last action: Share')).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });

  test('the keys: arrows of its direction, Home, End, Escape', async ({
    page,
  }) => {
    const trigger = page.getByRole('button', { name: 'Actions' });
    await trigger.focus();
    await page.keyboard.press('ArrowUp');
    const item = (name: string) => page.getByRole('menuitem', { name });
    await expect(item('Edit')).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(item('Copy')).toBeFocused();
    await page.keyboard.press('End');
    await expect(item('Delete')).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(item('Edit')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    // Closed, its actions are out of reach.
    await expect(page.getByRole('menu')).toHaveAttribute('inert', '');
  });

  test('a press outside closes it', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Actions' });
    await trigger.click();
    await page.mouse.click(10, 10);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

test('Directions: left, its arrows sideways', async ({ page }) => {
  await page.goto('/demos/speed-dial-next/directions-speed-dial-next-demo');
  await page.getByRole('button', { name: 'Actions, left' }).click();
  const menu = page.getByRole('menu', { name: 'Actions, left' });
  await expect(menu).toHaveAttribute('aria-orientation', 'horizontal');
  await expect(menu.getByRole('menuitem', { name: 'Edit' })).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(menu.getByRole('menuitem', { name: 'Copy' })).toBeFocused();
});

test('Arc: on a quarter circle', async ({ page }) => {
  await page.goto('/demos/speed-dial-next/arc-speed-dial-next-demo');
  const trigger = page.getByRole('button', { name: 'Actions' });
  await trigger.click();
  const center = await trigger.boundingBox();
  const first = await page
    .getByRole('menuitem', { name: 'Edit' })
    .boundingBox();
  const last = await page
    .getByRole('menuitem', { name: 'Delete' })
    .boundingBox();
  // Up-left: the first straight above, the last straight to the left.
  expect(
    Math.abs(
      (first?.x ?? 0) +
        (first?.width ?? 0) / 2 -
        ((center?.x ?? 0) + (center?.width ?? 0) / 2),
    ),
  ).toBeLessThan(2);
  expect(
    Math.abs(
      (last?.y ?? 0) +
        (last?.height ?? 0) / 2 -
        ((center?.y ?? 0) + (center?.height ?? 0) / 2),
    ),
  ).toBeLessThan(2);
});

test('Backdrop: a tap on it closes', async ({ page }) => {
  await page.goto('/demos/speed-dial-next/backdrop-speed-dial-next-demo');
  const trigger = page.getByRole('button', { name: 'Compose' });
  await trigger.click();
  const backdrop = page.locator('[data-slot="speed-dial-backdrop"]');
  await expect(backdrop).toHaveAttribute('data-open', 'true');
  const box = await backdrop.boundingBox();
  await page.mouse.click((box?.x ?? 0) + 40, (box?.y ?? 0) + 40);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('Controlled: open from outside; a disabled action does nothing', async ({
  page,
}) => {
  await page.goto('/demos/speed-dial-next/controlled-speed-dial-next-demo');
  await page.getByRole('button', { name: 'Open', exact: true }).click();
  await expect(page.getByText('Open: true')).toBeVisible();
  const remove = page.getByRole('menuitem', { name: 'Delete' });
  await expect(remove).toHaveAttribute('aria-disabled', 'true');
  await remove.click({ force: true });
  await expect(page.getByText('No action yet')).toBeVisible();
  await page.mouse.click(10, 10);
  await expect(page.getByText('Open: false')).toBeVisible();
});
