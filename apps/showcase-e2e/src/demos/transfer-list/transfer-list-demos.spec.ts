import { collectErrors, focus, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/transfer-list/${name}-demo`;
const value = (page: Page) => page.getByTestId('value');
const list = (page: Page, name: string) => page.getByRole('listbox', { name });
const selected = (page: Page, name: string) =>
  list(page, name).locator('[aria-selected="true"]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(({ page }) => page.goto(demo('transfer-list-usage')));

  test('the keys select; Enter moves, still selected there', async ({
    page,
  }) => {
    await expect(value(page)).toHaveText('Value: read, write');
    const available = list(page, 'Available');
    await focus(available);
    await press(page, 'Space');
    await press(page, 'ArrowDown');
    await press(page, 'Shift+Space');
    await expect(selected(page, 'Available')).toHaveText(['Delete', 'Share']);
    await press(page, 'Enter');
    await expect(value(page)).toHaveText('Value: read, write, delete, share');
    await expect(selected(page, 'Granted')).toHaveText(['Delete', 'Share']);
  });

  test('a double-click moves one item back', async ({ page }) => {
    await list(page, 'Granted')
      .getByRole('option', { name: 'Read' })
      .dblclick();
    await expect(value(page)).toHaveText('Value: write');
    await expect(
      list(page, 'Available').getByRole('option', { name: 'Read' }),
    ).toBeVisible();
  });

  test('search filters a side; select all takes what it shows', async ({
    page,
  }) => {
    await page.getByRole('searchbox', { name: 'Search available' }).fill('ex');
    await expect(list(page, 'Available').getByRole('option')).toHaveText([
      'Export',
    ]);
    await page.getByRole('checkbox', { name: 'Select all available' }).check();
    await page.getByRole('button', { name: 'Add selected' }).click();
    await expect(value(page)).toHaveText('Value: read, write, export');
  });

  test('add all skips the disabled one; remove all brings everything back', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Add all' }).click();
    await expect(value(page)).not.toContainText('billing');
    await expect(list(page, 'Available').getByRole('option')).toHaveText([
      'Billing',
    ]);
    await page.getByRole('button', { name: 'Remove all' }).click();
    await expect(value(page)).toHaveText('Value:');
    await expect(
      page.getByRole('button', { name: 'Remove all' }),
    ).toBeDisabled();
  });
});

test('Ordered: the chosen side’s selection moves up and down', async ({
  page,
}) => {
  await page.goto(demo('ordered-transfer-list'));
  await expect(value(page)).toHaveText('Value: name · email · status');
  const up = page.getByRole('button', { name: 'Move up' });
  await list(page, 'Shown').getByRole('option', { name: 'Status' }).click();
  await up.click();
  await expect(value(page)).toHaveText('Value: name · status · email');
  await up.click();
  await expect(value(page)).toHaveText('Value: status · name · email');
  // At the top: no further.
  await expect(up).toBeDisabled();
  await page.getByRole('button', { name: 'Move down' }).click();
  await expect(value(page)).toHaveText('Value: name · status · email');
});

test('Form: at least two, from the schema; saved once valid', async ({
  page,
}) => {
  await page.goto(demo('form-transfer-list'));
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('alert')).toHaveText(
    'Grant at least two permissions.',
  );
  await list(page, 'Available')
    .getByRole('option', { name: 'Write' })
    .dblclick();
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('status')).toHaveText('Saved: read, write.');
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('RTL: the chosen side on the left; the arrows turned', async ({
  page,
}) => {
  await page.goto(demo('rtl-transfer-list'));
  const available = await list(page, 'المتاحة').boundingBox();
  const granted = await list(page, 'الممنوحة').boundingBox();
  expect((granted?.x ?? 0) < (available?.x ?? 0)).toBe(true);
  await list(page, 'المتاحة').getByRole('option', { name: 'كتابة' }).dblclick();
  await expect(
    list(page, 'الممنوحة').getByRole('option', { name: 'كتابة' }),
  ).toBeVisible();
});
