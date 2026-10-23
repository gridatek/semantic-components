import { type Page, expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/transfer-list/${name}-transfer-list-demo`;
const side = (page: Page, name: string) => page.getByRole('listbox', { name });
const value = (page: Page) => page.locator('pre').first();

test.describe('Basic', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('basic'));
  });

  test('two listboxes, many selectable; one value', async ({ page }) => {
    const available = side(page, 'Available');
    await expect(available).toHaveAttribute('aria-multiselectable', 'true');
    await expect(side(page, 'Granted').getByRole('option')).toHaveText([
      'Read',
    ]);
    await expect(available.getByRole('option')).toHaveCount(7);
  });

  test('the keys: select, then Enter moves across', async ({ page }) => {
    const available = side(page, 'Available');
    await available.getByRole('option', { name: 'Write' }).focus();
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Space');
    await expect(available.getByRole('option', { selected: true })).toHaveText([
      'Write',
      'Delete',
    ]);
    await page.keyboard.press('Enter');
    await expect(value(page)).toContainText('"write"');
    await expect(value(page)).toContainText('"delete"');
    // Moved, still selected on their side: a move back is one key away.
    await expect(
      side(page, 'Granted').getByRole('option', { selected: true }),
    ).toHaveText(['Write', 'Delete']);
  });

  test('a double-click moves one; disabled stays', async ({ page }) => {
    await side(page, 'Granted')
      .getByRole('option', { name: 'Read' })
      .dblclick();
    await expect(side(page, 'Granted').getByRole('option')).toHaveCount(0);
    const billing = side(page, 'Available').getByRole('option', {
      name: 'Billing',
    });
    await expect(billing).toHaveAttribute('aria-disabled', 'true');
    // Disabled, it takes no pointer: its event, sent straight to it.
    await billing.dispatchEvent('dblclick');
    await expect(side(page, 'Granted').getByRole('option')).toHaveCount(0);
  });

  test('search; Add all moves what it shows', async ({ page }) => {
    await page.getByLabel('Search available').fill('in');
    await expect(side(page, 'Available').getByRole('option')).toHaveText([
      'Invite members',
      'Billing',
      'Administer',
    ]);
    await page.getByRole('button', { name: 'Add all' }).click();
    await expect(side(page, 'Granted').getByRole('option')).toHaveText([
      'Read',
      'Invite members',
      'Administer',
    ]);
  });

  test('select all: all, some, none', async ({ page }) => {
    const all = page.getByRole('checkbox', { name: 'Select all available' });
    await all.check();
    // The disabled one is not selected.
    await expect(
      side(page, 'Available').getByRole('option', { selected: true }),
    ).toHaveCount(6);
    await side(page, 'Available')
      .getByRole('option', { name: 'Write' })
      .click();
    await expect(all).toHaveJSProperty('indeterminate', true);
    await page.getByRole('button', { name: 'Add selected' }).click();
    await expect(side(page, 'Granted').getByRole('option')).toHaveCount(6);
  });
});

test('Form: at least two, or the error', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Save the role' }).click();
  await expect(page.getByText('Grant at least two permissions.')).toBeVisible();
  const available = side(page, 'Available');
  await available.getByRole('option', { name: 'Read' }).dblclick();
  await available.getByRole('option', { name: 'Write' }).dblclick();
  await expect(page.getByText('Grant at least two permissions.')).toBeHidden();
  await page.getByRole('button', { name: 'Save the role' }).click();
  await expect(page.getByRole('status')).toHaveText('Saved: read, write.');
});

test('Ordered: moved up and down, in the value', async ({ page }) => {
  await page.goto(demo('ordered'));
  const shown = side(page, 'Shown');
  const up = page.getByRole('button', { name: 'Move up' });
  await expect(up).toBeDisabled();
  await shown.getByRole('option', { name: 'Role' }).click();
  await up.click();
  await expect(value(page)).toHaveText('name · role · email');
  await up.click();
  await expect(value(page)).toHaveText('role · name · email');
  // At the top: no further.
  await expect(up).toBeDisabled();
});

test('Many: two hundred, searched', async ({ page }) => {
  await page.goto(demo('many'));
  await expect(side(page, 'Countries').getByRole('option')).toHaveCount(200);
  await page.getByLabel('Search countries').fill('Region 01');
  await expect(side(page, 'Countries').getByRole('option')).toHaveCount(10);
  await page.getByRole('button', { name: 'Add all' }).click();
  await expect(side(page, 'Shipping to').getByRole('option')).toHaveCount(10);
});
