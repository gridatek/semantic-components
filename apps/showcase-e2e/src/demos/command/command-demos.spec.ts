import { type Page } from '@playwright/test';
import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/command/${name}-command-demo`;
const usage = '/demos/command/command-usage-demo';

/** The highlighted item's text (aria-activedescendant). */
const activeText = (page: Page) =>
  page.evaluate(() => {
    const id = document
      .querySelector('[role=combobox]')
      ?.getAttribute('aria-activedescendant');
    return id ? document.getElementById(id)?.textContent?.trim() : null;
  });

const shown = (page: Page) => page.locator('[role=option]:not([hidden])');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a combobox over a listbox, the first item highlighted', async ({
  page,
}) => {
  await page.goto(usage);
  const input = page.getByRole('combobox', { name: 'Search commands' });
  const list = page.getByRole('listbox', { name: 'Commands' });
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await expect(input).toHaveAttribute('aria-autocomplete', 'list');
  await expect(input).toHaveAttribute(
    'aria-controls',
    (await list.getAttribute('id')) ?? 'missing',
  );
  await expect.poll(() => activeText(page)).toBe('Calendar');
  await expect(page.getByRole('option', { name: 'Calendar' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  // Groups named by their label.
  await expect(page.getByRole('group', { name: 'Settings' })).toBeVisible();
});

test('Usage: the arrows move the highlight, skipping a disabled item, and wrap', async ({
  page,
}) => {
  await page.goto(usage);
  const input = page.getByRole('combobox', { name: 'Search commands' });
  await expect.poll(() => activeText(page)).toBe('Calendar');
  await input.focus();
  await page.keyboard.press('ArrowDown');
  await expect.poll(() => activeText(page)).toBe('Search Emoji');
  // Calculator is disabled: skipped.
  await page.keyboard.press('ArrowDown');
  await expect.poll(() => activeText(page)).toBe('Profile⌘P');
  await page.keyboard.press('ArrowUp');
  await expect.poll(() => activeText(page)).toBe('Search Emoji');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  // loopFocus: round to the last.
  await expect.poll(() => activeText(page)).toBe('Settings⌘S');
  // Focus never left the search.
  await expect(input).toBeFocused();
});

test('Usage: Ctrl+N / Ctrl+P and Alt+arrows between groups', async ({
  page,
}) => {
  await page.goto(usage);
  await page.getByRole('combobox').focus();
  await expect.poll(() => activeText(page)).toBe('Calendar');
  await page.keyboard.press('Control+n');
  await expect.poll(() => activeText(page)).toBe('Search Emoji');
  await page.keyboard.press('Control+p');
  await expect.poll(() => activeText(page)).toBe('Calendar');
  await page.keyboard.press('Alt+ArrowDown');
  await expect.poll(() => activeText(page)).toBe('Profile⌘P');
  await page.keyboard.press('Alt+ArrowUp');
  await expect.poll(() => activeText(page)).toBe('Calendar');
});

test('Usage: keys pressed in one frame all count', async ({ page }) => {
  await page.goto(usage);
  await expect.poll(() => activeText(page)).toBe('Calendar');
  await page.getByRole('combobox').evaluate((input) => {
    for (let i = 0; i < 3; i++) {
      input.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
      );
    }
  });
  // Calendar → Search Emoji → (Calculator skipped) Profile → Billing.
  await expect.poll(() => activeText(page)).toBe('Billing⌘B');
});

test('Usage: typing filters, groups and lines hide, Enter right away runs the match', async ({
  page,
}) => {
  await page.goto(usage);
  const input = page.getByRole('combobox');
  await input.focus();
  await page.keyboard.type('bil');
  await page.keyboard.press('Enter');
  await expect(page.getByText('Ran Billing.')).toBeVisible();
  await expect(shown(page)).toHaveText(['Billing⌘B']);
  await expect(page.getByRole('group', { name: 'Suggestions' })).toBeHidden();
  await expect(page.locator('[data-slot=command-separator]')).toBeHidden();
  await expect(page.getByRole('status')).toHaveText('1 results');
});

test('Usage: nothing matches: Empty shows; a click runs an item', async ({
  page,
}) => {
  await page.goto(usage);
  const input = page.getByRole('combobox');
  await input.fill('zzz');
  await expect(page.getByText('No results found.')).toBeVisible();
  await expect(shown(page)).toHaveCount(0);
  await input.fill('');
  await page.getByRole('option', { name: 'Search Emoji' }).click();
  await expect(page.getByText('Ran Search Emoji.')).toBeVisible();
  await expect(input).toBeFocused();
});

test('Basic: in a dialog, focus in the search; Escape closes it, focus back', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const open = page.getByRole('button', { name: 'Open Menu' });
  await open.click();
  const dialog = page.getByRole('dialog', { name: 'Command Palette' });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('combobox')).toBeFocused();
  // The dialog's full width (max-w-sm in nova), not its short items' width.
  await expect.poll(async () => (await box(dialog)).width).toBeGreaterThan(380);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(open).toBeFocused();
});

test('Groups: a run item closes the dialog', async ({ page }) => {
  await page.goto(demo('groups'));
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await expect(page.getByRole('combobox')).toBeFocused();
  await page.keyboard.type('prof');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(page.getByText('Ran Profile.')).toBeVisible();
});

test('Scrollable: the highlighted item kept in view', async ({ page }) => {
  await page.goto(demo('scrollable'));
  await page.getByRole('button', { name: 'Open Menu' }).click();
  const list = page.getByRole('listbox');
  await expect(page.getByRole('combobox')).toBeFocused();
  await expect.poll(() => activeText(page)).toBe('Home⌘H');
  // Home, then 11 down: List View.
  for (let i = 0; i < 11; i++) await page.keyboard.press('ArrowDown');
  await expect.poll(() => activeText(page)).toBe('List View');
  const [l, item] = [
    await box(list),
    await box(page.getByRole('option', { name: 'List View' })),
  ];
  expect(item.y).toBeGreaterThanOrEqual(l.y - 1);
  expect(item.y + item.height).toBeLessThanOrEqual(l.y + l.height + 1);
});

test('Keywords: an item found by a word not in its text', async ({ page }) => {
  await page.goto(demo('keywords'));
  await page.getByRole('combobox').fill('preferences');
  await expect(shown(page)).toHaveText(['Settings']);
});

test('Async search: your results, not filtered again; the status says when it searches', async ({
  page,
}) => {
  await page.goto(demo('async'));
  const input = page.getByRole('combobox', { name: 'Search countries' });
  await expect(shown(page)).toHaveCount(8);
  await input.fill('mo');
  await expect(page.getByRole('status')).toHaveText('Searching…');
  await expect(shown(page)).toHaveText(['Morocco']);
  await expect(page.getByRole('status')).toHaveText('1 results');
});

test('Pages: an item opens a page; Backspace in the empty search goes back', async ({
  page,
}) => {
  await page.goto(demo('pages'));
  await page.getByRole('combobox').focus();
  await expect.poll(() => activeText(page)).toBe('Search projects…');
  await page.keyboard.press('Enter');
  await expect(
    page.getByRole('combobox', { name: 'Search projects' }),
  ).toBeVisible();
  await expect.poll(() => activeText(page)).toBe('Website redesign');
  await page.keyboard.press('Backspace');
  await expect(
    page.getByRole('combobox', { name: 'Search commands' }),
  ).toBeVisible();
});

test('Links: Enter follows the highlighted link', async ({ page }) => {
  await page.goto(demo('links'));
  await page.getByRole('combobox').fill('them');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#theming$/);
  await expect(page.getByText('Ran Theming.')).toBeVisible();
});

test('RTL: the search icon at the right, the shortcuts at the left', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const input = page.getByRole('combobox');
  const icon = page.locator('[data-slot=input-group-addon] svg');
  expect((await box(icon)).x).toBeGreaterThan((await box(input)).x);
  const option = page.getByRole('option', { name: /الفوترة/ });
  const shortcut = option.locator('[data-slot=command-shortcut]');
  expect((await box(shortcut)).x).toBeLessThan(
    (await box(option.locator('span').first())).x,
  );
});
