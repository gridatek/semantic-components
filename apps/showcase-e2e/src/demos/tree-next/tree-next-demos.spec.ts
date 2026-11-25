import { collectErrors, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/tree-next/${name}-demo`;
const tree = (page: Page) => page.getByRole('tree');
/**
 * An item by its own row's text — its accessible name holds its children's;
 * by CSS, so a hidden one is still found (and found hidden).
 */
const item = (page: Page, text: string) =>
  page.locator('[role=treeitem]').filter({
    has: page.locator(':scope > [scTreeNextItemLabel]', {
      hasText: new RegExp(`^\\s*${text.replace(/\./g, '\\.')}\\s*$`),
    }),
  });
const row = (page: Page, text: string) =>
  item(page, text).locator(':scope > [scTreeNextItemLabel]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a tree — levels, places, one tab stop', async ({ page }) => {
  await page.goto(demo('tree-next-usage'));
  await expect(tree(page)).toHaveAccessibleName('Project files');
  const src = item(page, 'src');
  await expect(src).toHaveAttribute('aria-level', '1');
  await expect(src).toHaveAttribute('aria-posinset', '1');
  await expect(src).toHaveAttribute('aria-setsize', '2');
  await expect(src).toHaveAttribute('aria-expanded', 'false');
  await expect(item(page, 'package.json')).not.toHaveAttribute('aria-expanded');
  await expect(page.locator('[role=treeitem][tabindex="0"]')).toHaveCount(1);
});

test('Items as Data: → opens and goes in, ← goes out and closes', async ({
  page,
}) => {
  await page.goto(demo('data-tree-next'));
  const app = item(page, 'app');
  await expect(app).toHaveAttribute('aria-expanded', 'true');
  await expect(item(page, 'page.tsx')).toHaveAttribute('aria-selected', 'true');
  // The tab stop: the selected item.
  await expect(item(page, 'page.tsx')).toHaveAttribute('tabindex', '0');
  await item(page, 'page.tsx').focus();
  await press(page, 'ArrowDown');
  await press(page, 'ArrowDown');
  await expect(item(page, 'components')).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(item(page, 'components')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await press(page, 'ArrowRight');
  await expect(item(page, 'ui')).toBeFocused();
  await expect(item(page, 'ui')).toHaveAttribute('aria-level', '2');
  await press(page, 'ArrowLeft');
  await expect(item(page, 'components')).toBeFocused();
  await press(page, 'ArrowLeft');
  await expect(item(page, 'components')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  // Typeahead: its row's text.
  await press(page, 'r');
  await expect(item(page, 'README.md')).toBeFocused();
});

test('Multiple Selection: clicks add, Shift a range; the chevron only opens', async ({
  page,
}) => {
  await page.goto(demo('multiple-tree-next'));
  await expect(tree(page)).toHaveAttribute('aria-multiselectable', 'true');
  await row(page, 'Clients').click();
  await row(page, 'Team').click();
  await expect(page.getByText('2 selected')).toBeVisible();
  await row(page, 'Archive').click({ modifiers: ['Shift'] });
  await expect(item(page, 'Projects')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText('4 selected')).toBeVisible();
  // The chevron: opened, nothing selected or unselected.
  await row(page, 'Projects').locator('[scTreeNextItemIndicator]').click();
  await expect(item(page, 'Projects')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('4 selected')).toBeVisible();
  // A press on the row doesn't open it (expandOnPress off).
  await row(page, 'Inbox').click();
  await expect(item(page, 'Inbox')).toHaveAttribute('aria-expanded', 'true');
});

test('Checkboxes: a branch checks what it holds; mixed while some is', async ({
  page,
}) => {
  await page.goto(demo('checkboxes-tree-next'));
  await expect(item(page, 'Frontend')).toHaveAttribute('aria-checked', 'mixed');
  await expect(page.getByText('Checked: styles')).toBeVisible();
  await row(page, 'Data').locator('input').click();
  await expect(item(page, 'SQL')).toHaveAttribute('aria-checked', 'true');
  await expect(item(page, 'Backend')).toHaveAttribute('aria-checked', 'mixed');
  await expect(page.getByText('Checked: styles, data')).toBeVisible();
  // Unchecking one inside: the rest of what was checked stays.
  await row(page, 'SQL').locator('input').click();
  await expect(page.getByText('Checked: styles, caching')).toBeVisible();
  // Space on the focused item checks it.
  await expect(item(page, 'SQL')).toBeFocused();
  await press(page, 'ArrowUp');
  await press(page, 'ArrowUp');
  await expect(item(page, 'API')).toBeFocused();
  await press(page, ' ');
  await expect(page.getByText('Checked: styles, caching, api')).toBeVisible();
  // The boxes are the item's: out of the tab order, hidden.
  await expect(row(page, 'API').locator('input')).toHaveAttribute(
    'tabindex',
    '-1',
  );
});

test('Links: the current page is the tab stop; Enter follows a link', async ({
  page,
}) => {
  await page.goto(demo('links-tree-next'));
  const installation = item(page, 'Installation');
  await expect(installation).toHaveAttribute('aria-current', 'page');
  await expect(installation).toHaveAttribute('tabindex', '0');
  await expect(installation).not.toHaveAttribute('aria-selected');
  await installation.focus();
  await press(page, 'ArrowUp');
  await press(page, 'Enter');
  await expect(page.getByText('Showing: introduction')).toBeVisible();
  await expect(item(page, 'Introduction')).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('Disabled: focusable by default, skipped when not', async ({ page }) => {
  await page.goto(demo('disabled-tree-next'));
  await expect(item(page, 'Enterprise')).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await item(page, 'Current plans').focus();
  for (let i = 0; i < 3; i++) await press(page, 'ArrowDown');
  await expect(item(page, 'Enterprise')).toBeFocused();
  // Not focusable: the keys skip the disabled ones.
  await page.getByRole('switch').click();
  await item(page, 'Current plans').focus();
  await press(page, 'ArrowDown');
  await press(page, 'ArrowDown');
  await press(page, 'ArrowDown');
  await expect(item(page, 'Pro')).toBeFocused();
});

test('Loading Children: busy, loaded; a failure retried on the next open', async ({
  page,
}) => {
  await page.goto(demo('lazy-tree-next'));
  const users = item(page, 'users');
  await users.focus();
  await press(page, 'ArrowRight');
  await expect(users).toHaveAttribute('aria-busy', 'true');
  await expect(item(page, 'email')).toBeVisible();
  await expect(users).not.toHaveAttribute('aria-busy');
  await expect(page.getByText('users: 3 columns')).toBeVisible();
  // By its place: failed, its row says so too.
  const archive = page.locator('[role=treeitem][aria-level="1"]').nth(2);
  await press(page, 'End');
  await expect(archive).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(
    page.getByText('archive failed to load. Open it again to retry.'),
  ).toBeVisible();
  await expect(archive).toHaveAttribute('aria-expanded', 'false');
  await press(page, 'ArrowRight');
  await expect(item(page, 'archived_at')).toBeVisible();
});

test('Controller: expand all, collapse all, reveal', async ({ page }) => {
  await page.goto(demo('controller-tree-next'));
  await page.getByRole('button', { name: 'Expand all' }).click();
  // Security appears as Account opens, and opens too.
  await expect(item(page, 'Two-factor')).toBeVisible();
  await expect(item(page, 'Push')).toBeVisible();
  await page.getByRole('button', { name: 'Collapse all' }).click();
  await expect(item(page, 'Profile')).toBeHidden();
  await page.getByRole('button', { name: 'Find Two-factor' }).click();
  await expect(item(page, 'Two-factor')).toBeFocused();
  await expect(item(page, 'Two-factor')).toHaveAttribute('tabindex', '0');
});

test('RTL: ← opens and goes in, → goes out', async ({ page }) => {
  await page.goto(demo('rtl-tree-next'));
  const documents = item(page, 'المستندات');
  await documents.focus();
  await press(page, 'ArrowLeft');
  await expect(item(page, 'التقرير السنوي.pdf')).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(documents).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(documents).toHaveAttribute('aria-expanded', 'false');
});
