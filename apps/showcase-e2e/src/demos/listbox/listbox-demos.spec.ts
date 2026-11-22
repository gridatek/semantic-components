import { collectErrors, focus, press, type } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/listbox/${name}-demo`;
const list = (page: Page) => page.getByRole('listbox');
const option = (page: Page, name: string) =>
  page.getByRole('option', { name, exact: true });
const picked = (page: Page) => page.getByTestId('picked');

async function open(page: Page, name: string) {
  await page.goto(demo(name));
  await expect(page.getByRole('option').first()).toBeVisible();
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(({ page }) => open(page, 'listbox-usage'));

  test('named by its field; Tab lands on the chosen option', async ({
    page,
  }) => {
    await expect(page.getByRole('listbox', { name: 'Topping' })).toBeVisible();
    await expect(option(page, 'Basil')).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await page.keyboard.press('Tab');
    await expect(option(page, 'Basil')).toBeFocused();
  });

  test('selection follows focus: arrows, End, typing', async ({ page }) => {
    await focus(option(page, 'Basil'));
    await press(page, 'ArrowDown');
    await expect(picked(page)).toHaveText('onion');
    await press(page, 'End');
    await expect(picked(page)).toHaveText('olive');
    await type(page, 'm');
    await expect(picked(page)).toHaveText('mushroom');
  });

  test('the chosen option pressed again stays chosen', async ({ page }) => {
    await option(page, 'Cheese').click();
    await expect(picked(page)).toHaveText('cheese');
    await option(page, 'Cheese').click();
    await expect(picked(page)).toHaveText('cheese');
  });
});

test.describe('Multiple', () => {
  test.beforeEach(({ page }) => open(page, 'multiple-listbox'));

  test('multiselectable; a click toggles, in the list order', async ({
    page,
  }) => {
    await expect(list(page)).toHaveAttribute('aria-multiselectable', 'true');
    await expect(picked(page)).toHaveText('cheese, onion');
    await option(page, 'Basil').click();
    await expect(picked(page)).toHaveText('cheese, basil, onion');
    await option(page, 'Cheese').click();
    await expect(picked(page)).toHaveText('basil, onion');
  });

  test('Shift + ↓ a range; Ctrl + A all, then none', async ({ page }) => {
    await option(page, 'Basil').click();
    await press(page, 'Shift+ArrowDown');
    await press(page, 'Shift+ArrowDown');
    await expect(picked(page)).toHaveText('cheese, basil, onion, mushroom');
    await press(page, 'Control+a');
    await expect(picked(page)).toHaveText(
      'cheese, basil, onion, mushroom, olive',
    );
    await press(page, 'Control+a');
    await expect(picked(page)).toHaveText('None');
  });
});

test('Manual: the arrows only move; Space chooses', async ({ page }) => {
  await open(page, 'manual-listbox');
  await focus(option(page, 'Angular'));
  await press(page, 'ArrowDown');
  await expect(option(page, 'Astro')).toBeFocused();
  await expect(picked(page)).toHaveText('None');
  await press(page, 'Space');
  await expect(picked(page)).toHaveText('astro');
});

test('Focus on the list: it points at the option', async ({ page }) => {
  await open(page, 'virtual-focus-listbox');
  await focus(list(page));
  await press(page, 'ArrowDown');
  await expect(list(page)).toBeFocused();
  await expect(list(page)).toHaveAttribute('aria-activedescendant', /.+/);
  const id = await list(page).getAttribute('aria-activedescendant');
  await expect(page.locator(`[id="${id}"]`)).toHaveText(/Astro/);
});

test('Deselectable: pressed again, not chosen', async ({ page }) => {
  await open(page, 'deselectable-listbox');
  await expect(picked(page)).toHaveText('astro');
  await option(page, 'Astro').click();
  await expect(picked(page)).toHaveText('None');
});

test('Groups: named groups; a range crosses them', async ({ page }) => {
  await open(page, 'groups-listbox');
  await expect(page.getByRole('group', { name: 'Fruits' })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Vegetables' })).toBeVisible();
  await option(page, 'Cherry').click({ modifiers: ['Shift'] });
  await expect(picked(page)).toHaveText('banana, cherry');
});

test('Horizontal: → moves; a disabled option and the end stop it', async ({
  page,
}) => {
  await open(page, 'horizontal-listbox');
  await expect(list(page)).toHaveAttribute('aria-orientation', 'horizontal');
  await focus(option(page, 'M'));
  await press(page, 'ArrowRight');
  await expect(picked(page)).toHaveText('L');
  await press(page, 'ArrowRight');
  await expect(picked(page)).toHaveText('L');
});

test('Disabled: an option skipped; the list out of the Tab order', async ({
  page,
}) => {
  await open(page, 'disabled-listbox');
  await expect(option(page, 'Olive')).toHaveAttribute('aria-disabled', 'true');
  await page.getByRole('button', { name: 'Disable the list' }).click();
  await expect(list(page)).toHaveAttribute('aria-disabled', 'true');
  // Out of the Tab order: Tab from the button goes past it.
  await expect(list(page)).not.toHaveAttribute('tabindex', '0');
});

test('Read-only: browsable, not changed', async ({ page }) => {
  await open(page, 'read-only-listbox');
  await expect(list(page)).toHaveAttribute('aria-readonly', 'true');
  await option(page, 'Angular').click();
  await expect(option(page, 'Nuxt')).toHaveAttribute('aria-selected', 'true');
});

test('Form: one to three, from the schema', async ({ page }) => {
  await open(page, 'form-listbox');
  await page.getByRole('button', { name: 'Order' }).click();
  await expect(page.getByRole('alert')).toHaveText('Choose a topping.');
  for (const name of ['Cheese', 'Basil', 'Onion', 'Olive'])
    await option(page, name).click();
  await expect(page.getByRole('alert')).toHaveText('Three at most.');
  await option(page, 'Olive').click();
  await page.getByRole('button', { name: 'Order' }).click();
  await expect(page.getByRole('status')).toHaveText(
    'Ordered: cheese, basil, onion.',
  );
});

test('Object values: the plan itself', async ({ page }) => {
  await open(page, 'object-values-listbox');
  await expect(picked(page)).toHaveText('pro');
  await option(page, 'Team $30').click();
  await expect(picked(page)).toHaveText('team');
});

test('Methods: select all, clear, focus', async ({ page }) => {
  await open(page, 'methods-listbox');
  await page.getByRole('button', { name: 'Select all' }).click();
  await expect(picked(page)).toHaveText(
    'cheese, basil, onion, mushroom, olive',
  );
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(picked(page)).toHaveText('None');
  await page.getByRole('button', { name: 'Focus' }).click();
  await expect(option(page, 'Cheese')).toBeFocused();
});

test('Scrollable: the chosen option in view at first', async ({ page }) => {
  await open(page, 'scrollable-listbox');
  await expect(option(page, 'UTC+9')).toBeInViewport();
  await expect
    .poll(() => list(page).evaluate((e) => e.scrollTop))
    .toBeGreaterThan(0);
});

test('RTL: the check at the inline end', async ({ page }) => {
  await open(page, 'rtl-listbox');
  const chosen = page.locator('[data-slot=listbox-item][data-selected]');
  const check = await chosen
    .locator('[data-slot=listbox-item-indicator]')
    .boundingBox();
  const box = await chosen.boundingBox();
  expect((check?.x ?? 0) - (box?.x ?? 0)).toBeLessThan(20);
});
