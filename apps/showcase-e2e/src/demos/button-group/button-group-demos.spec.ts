import { collectErrors, press } from '../../interaction';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { type Locator, type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/button-group/${name}-button-group-demo`;

/** Opens a demo with transitions off: a look read mid-transition isn't its own. */
async function open(page: Page, url: string): Promise<void> {
  await page.goto(url);
  await page.addStyleTag({
    content: '*, *::before, *::after { transition: none !important; }',
  });
}

/** Whether each corner is rounded: top-left, top-right, bottom-right, bottom-left. */
const corners = (locator: Locator) =>
  locator.evaluate((el) => {
    const style = getComputedStyle(el);
    return [
      style.borderTopLeftRadius,
      style.borderTopRightRadius,
      style.borderBottomRightRadius,
      style.borderBottomLeftRadius,
    ].map((radius) => parseFloat(radius) > 0);
  });

const style = (locator: Locator, property: string) =>
  locator.evaluate(
    (el, name) => getComputedStyle(el).getPropertyValue(name),
    property,
  );

/** Its box; fails if it isn't laid out. */
async function box(locator: Locator) {
  const found = await locator.boundingBox();
  if (!found) throw new Error(`not visible: ${locator}`);
  return found;
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a named group, its buttons joined — the outer corners round, one border between', async ({
  page,
}) => {
  await open(page, '/demos/button-group/button-group-usage-demo');
  const group = page.getByRole('group', { name: 'Text alignment' });
  const [left, center, right] = await group.getByRole('button').all();
  await expect.poll(() => corners(left)).toEqual([true, false, false, true]);
  expect(await corners(center)).toEqual([false, false, false, false]);
  expect(await corners(right)).toEqual([false, true, true, false]);
  expect(await style(left, 'border-left-width')).toBe('1px');
  expect(await style(center, 'border-left-width')).toBe('0px');
  expect(await style(right, 'border-left-width')).toBe('0px');
  // Joined: each button starts where the one before ends.
  const [a, b] = [await box(left), await box(center)];
  expect(Math.abs(a.x + a.width - b.x)).toBeLessThan(1);
});

test('Keyboard: Tab goes to each button, the ring over its neighbours', async ({
  page,
}) => {
  await open(page, '/demos/button-group/button-group-usage-demo');
  const buttons = page.getByRole('button');
  // The static build renders after the load: Tab once it's there.
  await expect(buttons.first()).toBeVisible();
  for (const name of ['Left', 'Center', 'Right']) {
    await press(page, 'Tab');
    const button = page.getByRole('button', { name });
    await expect(button).toBeFocused();
    await expect(button).not.toHaveCSS('box-shadow', 'none');
    await expect(button).toHaveCSS('z-index', '10');
  }
});

test('Orientation: stacked, joined top to bottom', async ({ page }) => {
  await open(page, demo('orientation'));
  const group = page.getByRole('group', { name: 'Media controls' });
  await expect(group).toHaveAttribute('data-orientation', 'vertical');
  const up = page.getByRole('button', { name: 'Volume up' });
  const down = page.getByRole('button', { name: 'Volume down' });
  await expect.poll(() => corners(up)).toEqual([true, true, false, false]);
  expect(await corners(down)).toEqual([false, false, true, true]);
  expect(await style(down, 'border-top-width')).toBe('0px');
  const [a, b] = [await box(up), await box(down)];
  expect(Math.abs(a.y + a.height - b.y)).toBeLessThan(1);
});

test('Size: a group of each size, its buttons one height', async ({ page }) => {
  await open(page, demo('size'));
  for (const [name, height] of [
    ['Small', 28],
    ['Default', 32],
    ['Large', 36],
  ] as const) {
    const buttons = page.getByRole('group', { name }).getByRole('button');
    await expect(buttons).toHaveCount(4);
    for (const button of await buttons.all())
      await expect(button).toHaveCSS('height', `${height}px`);
    // The icon button: a square.
    await expect(buttons.last()).toHaveCSS('width', `${height}px`);
  }
});

test('Nested: groups in a group, spaced apart, each joined', async ({
  page,
}) => {
  await open(page, demo('nested'));
  const outer = page.getByRole('group', { name: 'Message' });
  await expect(outer).toHaveCSS('column-gap', '8px');
  await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible();
  const voice = page.getByRole('button', { name: 'Voice Mode' });
  await voice.hover();
  await expect(page.getByRole('tooltip')).toHaveText('Voice Mode');
});

test('Separator: a line between two borderless buttons', async ({ page }) => {
  await open(page, demo('separator'));
  const group = page.getByRole('group', { name: 'Clipboard' });
  const separator = group.getByRole('separator');
  await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
  await expect(separator).toHaveCSS('width', '1px');
  await expectInlineOrder([
    group.getByRole('button', { name: 'Copy' }),
    separator,
    group.getByRole('button', { name: 'Paste' }),
  ]);
});

test('Split: an action and its icon button, a line between', async ({
  page,
}) => {
  await open(page, demo('split'));
  const group = page.getByRole('group', { name: 'Split button' });
  await expect(group.getByRole('separator')).toBeVisible();
  await expect(group.getByRole('button', { name: 'Add' })).toHaveCSS(
    'width',
    '32px',
  );
});

test('Input: the input takes the room, joined to its button', async ({
  page,
}) => {
  await open(page, demo('input'));
  const input = page.getByRole('textbox', { name: 'Search' });
  const button = page.getByRole('button', { name: 'Search' });
  await expect.poll(() => corners(input)).toEqual([true, false, false, true]);
  expect(await corners(button)).toEqual([false, true, true, false]);
  await expect(input).toHaveCSS('flex-grow', '1');
});

test('Text: a label beside the input names it', async ({ page }) => {
  await open(page, demo('text'));
  const input = page.getByRole('textbox', { name: 'https://' });
  await expect(input).toBeVisible();
  const text = page.getByText('https://');
  await expect.poll(() => corners(text)).toEqual([true, false, false, true]);
  // A click on the label focuses its input.
  await text.click();
  await expect(input).toBeFocused();
});

test('Input Group: Voice Mode pressed turns the input off and says so', async ({
  page,
}) => {
  await open(page, demo('input-group'));
  const input = page.getByRole('textbox', { name: 'Message' });
  const voice = page.getByRole('button', { name: 'Voice Mode' });
  await expect(voice).toHaveAttribute('aria-pressed', 'false');
  await expect(input).toHaveAttribute('placeholder', 'Send a message...');
  await voice.click();
  await expect(voice).toHaveAttribute('aria-pressed', 'true');
  await expect(input).toBeDisabled();
  await expect(input).toHaveAttribute(
    'placeholder',
    'Record and send audio...',
  );
  // Fully round: the group's --radius.
  await expect(page.getByRole('button', { name: 'Add attachment' })).toHaveCSS(
    'border-top-left-radius',
    /^\d{2,}/,
  );
});

test('Dropdown Menu: the second button opens the menu; Escape closes it, focus back', async ({
  page,
}) => {
  await open(page, demo('dropdown'));
  const trigger = page.getByRole('button', { name: 'More options' });
  await trigger.click();
  const menu = page.getByRole('menu');
  await expect(menu.getByRole('menuitem')).toHaveCount(7);
  await expect(menu.getByRole('menuitem').last()).toHaveText(
    'Delete Conversation',
  );
  await press(page, 'Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('Select: a currency picked beside the amount', async ({ page }) => {
  await open(page, demo('select'));
  const currency = page.getByRole('combobox', { name: 'Currency' });
  await expect(currency).toHaveText('$');
  await currency.click();
  await page.getByRole('option', { name: /€/ }).click();
  await expect(currency).toHaveText('€');
  await page.getByRole('textbox', { name: 'Amount' }).fill('10.00');
  await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
});

test('Popover: the icon button opens a form for the task', async ({ page }) => {
  await open(page, demo('popover'));
  await page.getByRole('button', { name: 'Open Popover' }).click();
  await expect(page.getByText('Start a new task with Copilot')).toBeVisible();
  const task = page.getByRole('textbox', { name: 'Task Description' });
  await task.fill('Fix the build');
  await expect(task).toHaveValue('Fix the build');
  await press(page, 'Escape');
  await expect(task).toBeHidden();
});

test('RTL: from the right, the corners mirrored, the back arrow pointing right', async ({
  page,
}) => {
  await open(page, demo('rtl'));
  const archive = page.getByRole('button', { name: 'أرشفة' });
  const report = page.getByRole('button', { name: 'إبلاغ' });
  await expectRtl(archive);
  await expectInlineOrder([archive, report]);
  // The first button, at the right: its right corners round.
  await expect.poll(() => corners(archive)).toEqual([false, true, true, false]);
  expect(await corners(report)).toEqual([true, false, false, true]);
  await page.getByRole('button', { name: 'خيارات أخرى' }).click();
  await expect(page.getByRole('menuitem', { name: 'حذف' })).toBeVisible();
});

test('RTL: the back button, at the right, its arrow pointing the reading way', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await open(page, demo('rtl'));
  const back = page.getByRole('button', { name: 'رجوع' });
  await expectInlineOrder([back, page.getByRole('button', { name: 'أرشفة' })]);
  await expect(back.locator('svg')).toHaveCSS('rotate', '180deg');
});

test('On a phone: the demos fit, every target 24px @mobile', async ({
  page,
}) => {
  for (const name of ['size', 'nested', 'input-group', 'select', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
});
