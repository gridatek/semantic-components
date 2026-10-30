import { collectErrors, press } from '../../interaction';
import { box, computed, corners, openStill } from '../../looks';
import { expectInlineOrder } from '../../rtl';
import { expect, test } from '../../test';

/** The Button page's group examples: buttons joined by a Control Group. */
const demo = (name: string) => `/demos/button/${name}-button-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Vertical Group: stacked, joined top to bottom', async ({ page }) => {
  await openStill(page, demo('vertical-group'));
  const group = page.getByRole('group', { name: 'Media controls' });
  await expect(group).toHaveAttribute('data-orientation', 'vertical');
  const up = page.getByRole('button', { name: 'Volume up' });
  const down = page.getByRole('button', { name: 'Volume down' });
  await expect.poll(() => corners(up)).toEqual([true, true, false, false]);
  expect(await corners(down)).toEqual([false, false, true, true]);
  expect(await computed(down, 'border-top-width')).toBe('0px');
  const [a, b] = [await box(up), await box(down)];
  expect(Math.abs(a.y + a.height - b.y)).toBeLessThan(1);
});

test('Group Sizes: a group of each size, its buttons one height', async ({
  page,
}) => {
  await openStill(page, demo('group-size'));
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

test('Group Separator: a line between two borderless buttons', async ({
  page,
}) => {
  await openStill(page, demo('group-separator'));
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

test('Split Button: an action and its icon button, a line between', async ({
  page,
}) => {
  await openStill(page, demo('split'));
  const group = page.getByRole('group', { name: 'Split button' });
  await expect(group.getByRole('separator')).toHaveCSS('width', '1px');
  await expect(group.getByRole('button', { name: 'Add' })).toHaveCSS(
    'width',
    '32px',
  );
});

test('Group with Menu: the second button opens the menu; Escape closes it, focus back', async ({
  page,
}) => {
  await openStill(page, demo('group-menu'));
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

test('Group with Popover: the icon button opens a form for the task', async ({
  page,
}) => {
  await openStill(page, demo('group-popover'));
  await page.getByRole('button', { name: 'Open Popover' }).click();
  await expect(page.getByText('Start a new task with Copilot')).toBeVisible();
  const task = page.getByRole('textbox', { name: 'Task Description' });
  await task.fill('Fix the build');
  await expect(task).toHaveValue('Fix the build');
  await press(page, 'Escape');
  await expect(task).toBeHidden();
});
