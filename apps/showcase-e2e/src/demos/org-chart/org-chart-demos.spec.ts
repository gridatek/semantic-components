import { type Locator, type Page, expect, test } from '@playwright/test';
import { collectErrors, focus, press, type } from '../../interaction';

const demo = (name: string) => `/demos/org-chart/${name}-org-chart-demo`;
const person = (page: Page, name: string) =>
  page.getByRole('treeitem', { name: new RegExp(`^${name}`) });
const card = (item: Locator) => item.locator('> [data-slot="org-chart-card"]');
const box = async (locator: Locator) => {
  const found = await locator.boundingBox();
  if (!found) throw new Error('not shown');
  return found;
};

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: a tree of people, named by their cards', async ({ page }) => {
  await page.goto(demo('basic'));
  const tree = page.getByRole('tree', { name: 'Leadership' });
  await expect(tree.getByRole('treeitem')).toHaveCount(7);
  const ada = person(page, 'Ada Lovelace');
  await expect(ada).toHaveAccessibleName(/^Ada Lovelace\s*Chief Executive$/);
  await expect(ada).toHaveAttribute('aria-level', '1');
  await expect(ada).toHaveAttribute('aria-expanded', 'true');
  await expect(person(page, 'Alan Turing')).toHaveAttribute('aria-level', '3');
  // Leaves are not expandable.
  await expect(person(page, 'Margaret Hamilton')).not.toHaveAttribute(
    'aria-expanded',
  );
  await expect(tree.getByRole('group')).toHaveCount(3);
});

test('Basic: one Tab stop, arrows, Home, End and type-ahead', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const ada = person(page, 'Ada Lovelace');
  await focus(ada);
  await expect(person(page, 'Grace Hopper')).toHaveAttribute('tabindex', '-1');
  await press(page, 'ArrowDown');
  await expect(person(page, 'Grace Hopper')).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(person(page, 'Alan Turing')).toBeFocused();
  await press(page, 'End');
  await expect(person(page, 'Linus Torvalds')).toBeFocused();
  await press(page, 'Home');
  await expect(ada).toBeFocused();
  // Typed: the card's text, not its reports'.
  await type(page, 'Kat');
  await expect(person(page, 'Katherine Johnson')).toBeFocused();
});

test('Basic: lines meet the cards', async ({ page }) => {
  await page.goto(demo('basic'));
  const grace = person(page, 'Grace Hopper');
  const graceCard = await box(card(grace));
  const reports = await box(grace.locator('> [data-slot="org-chart-group"]'));
  // The line down from a card starts at its middle, the group's middle.
  expect(
    Math.abs(
      reports.x + reports.width / 2 - (graceCard.x + graceCard.width / 2),
    ),
  ).toBeLessThan(1);
  // A report's stub ends at its card's middle: the report is centred on it.
  const alan = person(page, 'Alan Turing');
  const alanItem = await box(alan);
  const alanCard = await box(card(alan));
  expect(
    Math.abs(
      alanItem.x + alanItem.width / 2 - (alanCard.x + alanCard.width / 2),
    ),
  ).toBeLessThan(1);
});

test('Across: reports at the inline end, mirrored right to left', async ({
  page,
}) => {
  await page.goto(demo('across'));
  const ada = await box(card(person(page, 'Ada Lovelace')));
  const grace = await box(card(person(page, 'Grace Hopper')));
  expect(grace.x).toBeGreaterThan(ada.x + ada.width);
  const hopper = person(page, 'Grace Hopper');
  const reports = await box(hopper.locator('> [data-slot="org-chart-group"]'));
  expect(
    Math.abs(reports.y + reports.height / 2 - (grace.y + grace.height / 2)),
  ).toBeLessThan(1);

  await page.evaluate(() =>
    document.documentElement.setAttribute('dir', 'rtl'),
  );
  const adaRtl = await box(card(person(page, 'Ada Lovelace')));
  const graceRtl = await box(card(person(page, 'Grace Hopper')));
  expect(graceRtl.x + graceRtl.width).toBeLessThan(adaRtl.x);
});

test('Collapsible: starts closed, opens on a click and on keys', async ({
  page,
}) => {
  await page.goto(demo('collapsible'));
  const grace = person(page, 'Grace Hopper');
  await expect(grace).toHaveAttribute('aria-expanded', 'false');
  await expect(grace).toHaveAttribute('data-state', 'closed');
  await expect(page.getByText('Alan Turing')).toBeHidden();
  const chevron = grace.locator('[data-slot="org-chart-expand-icon"]').first();
  await expect(chevron).not.toHaveClass(/rotate-180/);

  await card(grace).click();
  await expect(grace).toHaveAttribute('aria-expanded', 'true');
  await expect(person(page, 'Alan Turing')).toBeVisible();
  await expect(chevron).toHaveClass(/rotate-180/);

  await press(page, 'ArrowLeft');
  await expect(grace).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByText('Alan Turing')).toBeHidden();
  await press(page, 'ArrowRight');
  await expect(person(page, 'Alan Turing')).toBeVisible();
  // The count is named for screen readers.
  await expect(grace).toHaveAccessibleName(/2 reports/);
});

test('Selection: two-way, by click and by key', async ({ page }) => {
  await page.goto(demo('selection'));
  const details = page.locator('[aria-live="polite"]');
  await expect(person(page, 'Grace Hopper')).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(card(person(page, 'Grace Hopper'))).toHaveAttribute(
    'data-selected',
  );
  await expect(details).toContainText('42 engineers');

  await card(person(page, 'Margaret Hamilton')).click();
  await expect(person(page, 'Margaret Hamilton')).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(person(page, 'Grace Hopper')).toHaveAttribute(
    'aria-selected',
    'false',
  );
  await expect(details).toContainText('Chief Financial Officer');

  await press(page, 'ArrowDown');
  await press(page, 'Enter');
  await expect(details).toContainText('18 people');
});

test('From data: a recursive template, closed below the second level', async ({
  page,
}) => {
  await page.goto(demo('data'));
  await expect(page.getByRole('treeitem')).toHaveCount(4);
  const grace = person(page, 'Grace Hopper');
  await expect(grace).toHaveAttribute('aria-level', '2');
  await expect(grace).toHaveAttribute('aria-expanded', 'false');
  await card(grace).click();
  await expect(person(page, 'Katherine Johnson')).toHaveAttribute(
    'aria-level',
    '3',
  );
});
