import { collectErrors, press } from '../../interaction';
import { box, computed, openStill } from '../../looks';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/input-group/${name}-input-group-demo`;

let errors: string[];
let warnings: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
  warnings = [];
  page.on('console', (m) => {
    if (m.type() === 'warning') warnings.push(m.text());
  });
});

test.afterEach(() => {
  expect(errors).toEqual([]);
  // Every input has a name: none warns.
  expect(warnings.filter((w) => w.includes('has no name'))).toEqual([]);
});

test('Usage: one box — the group draws the border, the input none', async ({
  page,
}) => {
  await openStill(page, '/demos/input-group/input-group-usage-demo');
  const group = page.getByRole('group').first();
  const input = page.getByRole('textbox', { name: 'Search' });
  await expect(group).toHaveCSS('border-top-width', '1px');
  await expect(input).toHaveCSS('border-top-width', '0px');
  await expect(input).toHaveCSS('box-shadow', 'none');
});

test('Inline Start: the icon before the input, though written after', async ({
  page,
}) => {
  await openStill(page, demo('inline-start'));
  const input = page.getByRole('textbox', { name: 'Search' });
  await expect(input).toHaveAccessibleDescription(
    'Icon positioned at the start.',
  );
  const icon = page.locator('[scInputGroupAddon] svg');
  expect((await box(icon)).x).toBeLessThan((await box(input)).x);
});

test('Inline End: the icon after the input', async ({ page }) => {
  await openStill(page, demo('inline-end'));
  const input = page.getByLabel('Password');
  const icon = page.locator('[scInputGroupAddon] svg');
  expect((await box(icon)).x).toBeGreaterThan((await box(input)).x);
});

test('Block Start: a header above the input and the textarea', async ({
  page,
}) => {
  await openStill(page, demo('block-start'));
  const name = page.getByRole('textbox', { name: 'Name' });
  const header = page.getByText('Full Name');
  expect((await box(header)).y).toBeLessThan((await box(name)).y);
  const script = page.getByRole('textbox', { name: 'Script' });
  expect((await box(page.getByText('script.js'))).y).toBeLessThan(
    (await box(script)).y,
  );
  await expect(page.getByRole('button', { name: 'Copy' })).toHaveAttribute(
    'type',
    'button',
  );
});

test('Block End: a footer below, its Post button', async ({ page }) => {
  await openStill(page, demo('block-end'));
  const comment = page.getByRole('textbox', { name: 'Comment' });
  const post = page.getByRole('button', { name: 'Post' });
  expect((await box(post)).y).toBeGreaterThan((await box(comment)).y);
});

test('Icon: a click on an addon focuses the input', async ({ page }) => {
  await openStill(page, demo('icon'));
  await page.locator('[scInputGroupAddon]').first().click();
  await expect(page.getByRole('textbox', { name: 'Search' })).toBeFocused();
});

test('Text: text on both sides of the input', async ({ page }) => {
  await openStill(page, demo('text'));
  const amount = page.getByRole('textbox', { name: 'Amount' });
  await expectInlineOrder([page.getByText('$', { exact: true }), amount]);
  await expectInlineOrder([amount, page.getByText('USD')]);
});

test('Button: the copy button copies; the star toggles, its name fixed', async ({
  page,
  context,
  browserName,
}) => {
  await openStill(page, demo('button'));
  const favorite = page.getByRole('button', { name: 'Favorite' });
  await expect(favorite).toHaveAttribute('aria-pressed', 'false');
  await favorite.click();
  await expect(favorite).toHaveAttribute('aria-pressed', 'true');
  // A click on a button in an addon leaves the focus on the button.
  await expect(favorite).toBeFocused();
  await page.getByRole('button', { name: 'Connection' }).click();
  await expect(page.getByText('Your connection is not secure.')).toBeVisible();
  await press(page, 'Escape');
  // Only Chromium lets a test read the clipboard.
  test.skip(browserName !== 'chromium', 'clipboard read: Chromium only');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Copy' }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'https://x.com/shadcn',
  );
});

test('Button: the group button is the preset’s button, sized for the group', async ({
  page,
}) => {
  await openStill(page, demo('button'));
  const copy = page.getByRole('button', { name: 'Copy' });
  await expect(copy).toHaveCSS('width', '24px');
  await expect(copy).toHaveCSS('height', '24px');
  await expect(copy).toHaveAttribute('data-size', 'icon-xs');
});

test('Kbd: the shortcut after the input', async ({ page }) => {
  await openStill(page, demo('kbd'));
  await expectInlineOrder([
    page.getByRole('textbox', { name: 'Search' }),
    page.getByText('⌘K'),
  ]);
});

test('Dropdown: a menu from the addon’s button; Escape returns focus', async ({
  page,
}) => {
  await openStill(page, demo('dropdown'));
  const more = page.getByRole('button', { name: 'More' });
  await more.click();
  await expect(page.getByRole('menuitem')).toHaveText([
    'Settings',
    'Copy path',
    'Open location',
  ]);
  await press(page, 'Escape');
  await expect(more).toBeFocused();
});

test('Spinner: a named spinner beside the input', async ({ page }) => {
  await openStill(page, demo('spinner'));
  await expect(page.getByLabel('Loading')).toHaveCount(4);
});

test('Textarea: a header and a footer round the code', async ({ page }) => {
  await openStill(page, demo('textarea'));
  const code = page.getByRole('textbox', { name: 'Code' });
  const run = page.getByRole('button', { name: 'Run' });
  const copy = page.getByRole('button', { name: 'Copy' });
  expect((await box(copy)).y).toBeLessThan((await box(code)).y);
  expect((await box(run)).y).toBeGreaterThan((await box(code)).y);
  // Tab: the textarea first (the addons come after it), then the footer, the header.
  await expect(code).toBeVisible();
  await press(page, 'Tab');
  await expect(code).toBeFocused();
});

test('Custom Input: a control of its own rings the group when focused', async ({
  page,
}) => {
  await openStill(page, demo('custom'));
  const group = page.getByRole('group').first();
  const before = await computed(group, 'box-shadow');
  await page.getByRole('textbox', { name: 'Message' }).focus();
  await expect.poll(() => computed(group, 'box-shadow')).not.toBe(before);
});

test('RTL: the icon at the right, the count at the left', async ({ page }) => {
  await openStill(page, demo('rtl'));
  const input = page.getByRole('textbox', { name: 'بحث', exact: true });
  await expectRtl(input);
  await expectInlineOrder([
    page.locator('[scInputGroupAddon] svg').first(),
    input,
    page.getByText('١٢ نتيجة'),
  ]);
});

test('On a phone: the demos fit, every target 24px @mobile', async ({
  page,
}) => {
  for (const name of ['block-start', 'text', 'button', 'textarea', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
});
