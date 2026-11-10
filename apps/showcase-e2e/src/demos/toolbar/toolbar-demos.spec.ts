import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/toolbar/${name}-toolbar-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: one Tab stop; the arrows reach every kind of widget, wrapping', async ({
  page,
}) => {
  await page.goto('/demos/toolbar/toolbar-usage-demo');
  const toolbar = page.getByRole('toolbar', { name: 'Spreadsheet formatting' });
  const start = toolbar.getByRole('button', { name: 'Align start' });
  await expect(start).toHaveAttribute('tabindex', '0');
  for (const widget of [
    toolbar.getByRole('button', { name: 'Align end' }),
    toolbar.getByRole('button', { name: /Format as currency/ }),
    toolbar.getByRole('link', { name: 'Edited 51m ago' }),
  ])
    await expect(widget).toHaveAttribute('tabindex', '-1');
  await start.focus();
  await press(page, 'ArrowRight');
  await expect(
    toolbar.getByRole('button', { name: 'Align end' }),
  ).toBeFocused();
  await press(page, 'End');
  await expect(
    toolbar.getByRole('link', { name: 'Edited 51m ago' }),
  ).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(start).toBeFocused();
});

test('Usage: the widget group holds its toggles, one pressed at a time', async ({
  page,
}) => {
  await page.goto('/demos/toolbar/toolbar-usage-demo');
  const start = page.getByRole('button', { name: 'Align start' });
  const end = page.getByRole('button', { name: 'Align end' });
  await expect(start).toHaveAttribute('aria-pressed', 'true');
  await end.click();
  await expect(end).toHaveAttribute('aria-pressed', 'true');
  await expect(start).toHaveAttribute('aria-pressed', 'false');
});

test('With Menu: its trigger is a widget; Enter opens its menu', async ({
  page,
}) => {
  await page.goto(demo('menu'));
  await page.getByRole('button', { name: 'Save' }).focus();
  await press(page, 'End');
  const exportButton = page.getByRole('button', { name: 'Export' });
  await expect(exportButton).toBeFocused();
  await press(page, 'Enter');
  await expect(page.getByRole('menuitem', { name: 'PDF' })).toBeVisible();
});

test('With input: the input is a widget, last', async ({ page }) => {
  await page.goto(demo('input'));
  // Tab in (on Zoom out), then the arrows.
  await page.getByRole('button', { name: 'Zoom out' }).focus();
  await press(page, 'ArrowRight');
  await press(page, 'ArrowRight');
  await expect(
    page.getByRole('spinbutton', { name: 'Zoom, in percent' }),
  ).toBeFocused();
});

test('Vertical: Up and Down move between the widgets', async ({ page }) => {
  await page.goto(demo('vertical'));
  await expect(page.getByRole('toolbar')).toHaveAttribute(
    'aria-orientation',
    'vertical',
  );
  await page.getByRole('button', { name: 'Bold' }).focus();
  await press(page, 'ArrowDown');
  await expect(page.getByRole('button', { name: 'Italic' })).toBeFocused();
});

test('Disabled: a disabled widget stays reachable by the arrows', async ({
  page,
}) => {
  await page.goto(demo('disabled'));
  await page.getByRole('button', { name: 'Save' }).focus();
  await press(page, 'ArrowRight');
  const publish = page.getByRole('button', { name: 'Publish' });
  await expect(publish).toBeFocused();
  await expect(publish).toHaveAttribute('aria-disabled', 'true');
});

test('RTL: Left moves to the next widget', async ({ page }) => {
  await page.goto(demo('rtl'));
  await page.getByRole('button', { name: 'محاذاة البداية' }).focus();
  await press(page, 'ArrowLeft');
  await expect(
    page.getByRole('button', { name: 'محاذاة النهاية' }),
  ).toBeFocused();
});
