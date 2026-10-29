import { collectErrors, focus, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/json-viewer/${name}-json-viewer-demo`;
const rows = (page: Page) => page.getByRole('treeitem');
const row = (page: Page, name: string | RegExp) =>
  page.getByRole('treeitem', { name });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: the top value open, its objects closed with a count', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const tree = page.getByRole('tree', { name: 'User' });
  await expect(tree).toBeVisible();
  await expect(rows(page).first()).toHaveAttribute('aria-expanded', 'true');
  await expect(row(page, /^id: 42$/)).toBeVisible();
  await expect(row(page, /^name: "Ada Lovelace"$/)).toBeVisible();
  const roles = row(page, /^roles: \[ 3 \]$/);
  await expect(roles).toHaveAttribute('aria-expanded', 'false');
  await expect(roles).toHaveAttribute('aria-level', '2');
  // Not drawn until opened.
  await expect(roles.getByRole('treeitem')).toHaveCount(0);
});

test('Basic: arrows open, enter and leave; one Tab stop', async ({ page }) => {
  await page.goto(demo('basic'));
  const top = rows(page).first();
  await focus(top);
  await press(page, 'ArrowDown');
  await expect(row(page, /^id: 42$/)).toBeFocused();
  await press(page, 'End');
  const address = row(page, /^address: \{ 3 \}$/);
  await expect(address).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(address).toHaveAttribute('aria-expanded', 'true');
  await press(page, 'ArrowRight');
  await expect(row(page, /^city: "London"$/)).toBeFocused();
  await expect(row(page, /^city: "London"$/)).toHaveAttribute(
    'aria-level',
    '3',
  );
  await press(page, 'ArrowLeft');
  await expect(address).toBeFocused();
  await press(page, 'ArrowLeft');
  await expect(address).toHaveAttribute('aria-expanded', 'false');
  // Closing keeps the rows (hidden), so reopening doesn't redraw them.
  await expect(
    address.getByRole('treeitem', { includeHidden: true }),
  ).toHaveCount(3);
  // One Tab stop: the focused row alone is in the tab order.
  await expect(page.locator('[role=treeitem][tabindex="0"]')).toHaveCount(1);
  await expect(page.locator('[role=treeitem][tabindex="0"]')).toBeFocused();
});

test('Basic: type-ahead on keys', async ({ page }) => {
  await page.goto(demo('basic'));
  await focus(rows(page).first());
  await page.keyboard.type('em');
  await expect(row(page, /^email:/)).toBeFocused();
});

test('Summary Words: the consumer writes the words', async ({ page }) => {
  await page.goto(demo('summary'));
  await expect(rows(page).first()).toHaveAccessibleName('order: { 6 keys }');
  await expect(row(page, /^lines:/)).toHaveAccessibleName('lines: [ 2 items ]');
  await expect(row(page, /^notes:/)).toHaveAccessibleName('notes: [ 1 item ]');
});

test('Large Array: ranges of 100, drawn when opened', async ({ page }) => {
  await page.goto(demo('large'));
  const ranges = page.locator('[data-kind=range]');
  await expect(ranges).toHaveCount(10);
  await expect(ranges.first()).toHaveAccessibleName('[0 … 99]');
  await expect(ranges.last()).toHaveAccessibleName('[900 … 999]');
  await expect(page.locator('[data-kind=object]')).toHaveCount(0);
  await ranges.nth(1).click();
  await expect(ranges.nth(1)).toHaveAttribute('aria-expanded', 'true');
  await expect(ranges.nth(1).getByRole('treeitem')).toHaveCount(100);
  await expect(
    ranges.nth(1).getByRole('treeitem').first(),
  ).toHaveAccessibleName('100: { 2 }');
});

test('Expand, Collapse and Copy: sorted keys, shortened strings, focused path', async ({
  page,
  browserName,
}) => {
  await page.goto(demo('controls'));
  const keys = page
    .getByRole('tree')
    .locator(
      ':scope > li > ul > li > [data-slot=tree-item-trigger] [data-slot=json-viewer-key]',
    );
  await expect(keys).toHaveText([
    'description:',
    'keywords:',
    'name:',
    'peerDependencies:',
    'scripts:',
    'version:',
  ]);
  const description = row(page, /^description:/)
    .locator('[data-slot=json-viewer-value]')
    .first();
  await expect(description).toHaveText(
    '"Accessible Angular components, built on…"',
  );
  await expect(description).toHaveAttribute(
    'title',
    'Accessible Angular components, built on Angular Aria and styled with Tailwind.',
  );
  // Depth 2: the second level is open too.
  await expect(row(page, /^scripts:/)).toHaveAttribute('aria-expanded', 'true');

  await page.getByRole('button', { name: 'Collapse all' }).click();
  await expect(rows(page).first()).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Expand all' }).click();
  await expect(row(page, /^keywords:/)).toHaveAttribute(
    'aria-expanded',
    'true',
  );

  await row(page, /^@angular\/aria:/).click();
  await expect(
    page.getByText('Focused: peerDependencies["@angular/aria"]'),
  ).toBeVisible();

  if (browserName === 'chromium') {
    await page
      .context()
      .grantPermissions(['clipboard-read', 'clipboard-write']);
    // Its own line: the middle of an open row is its children.
    await row(page, /^scripts:/)
      .locator('[data-slot=tree-item-trigger]')
      .first()
      .click();
    await press(page, 'ControlOrMeta+c');
    await expect
      // Windows writes the clipboard's line ends as \r\n.
      .poll(async () =>
        (await page.evaluate(() => navigator.clipboard.readText())).replace(
          /\r\n/g,
          '\n',
        ),
      )
      .toBe('{\n  "test": "vitest",\n  "lint": "eslint ."\n}');
  }
});

test('Value Types: each kind coloured and written its own way', async ({
  page,
}) => {
  await page.goto(demo('types'));
  const value = (kind: string) =>
    page.locator(`[data-kind=${kind}] [data-slot=json-viewer-value]`);
  await expect(value('string')).toHaveText('"text"');
  await expect(value('number')).toHaveText(['3.14', 'NaN']);
  await expect(value('boolean')).toHaveText('false');
  await expect(value('null')).toHaveText('null');
  await expect(value('undefined')).toHaveText('undefined');
  await expect(value('bigint')).toHaveText('9007199254740993n');
  await expect(value('date')).toHaveText('2026-10-29');
  // Empty objects and arrays don't open.
  await expect(row(page, /^emptyObject:/)).not.toHaveAttribute('aria-expanded');
});

test('RTL: rows from the right, the marker points left', async ({ page }) => {
  await page.goto(demo('rtl'));
  const top = rows(page).first();
  const trigger = top.locator('[data-slot=tree-item-trigger]').first();
  const key = trigger.locator('[data-slot=json-viewer-key]');
  const marker = trigger.locator('[data-slot=json-viewer-marker]');
  const keyBox = await key.boundingBox();
  const markerBox = await marker.boundingBox();
  expect(markerBox!.x).toBeGreaterThan(keyBox!.x);
  await expect(row(page, /^العمر: 31$/)).toBeVisible();
});
