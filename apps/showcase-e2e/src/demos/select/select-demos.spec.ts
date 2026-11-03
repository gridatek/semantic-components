import { collectErrors, press } from '../../interaction';
import { box, openStill } from '../../looks';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/select/${name}-select-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: named by its label; a click picks a theme, the list closes', async ({
  page,
}) => {
  await openStill(page, '/demos/select/select-usage-demo');
  const trigger = page.getByRole('combobox', { name: 'Theme' });
  await expect(trigger).toHaveText('Select a theme');
  const chevron = trigger.locator('svg');
  await expect(chevron).toHaveCSS('rotate', 'none');
  await trigger.click();
  // Open: the chevron flipped.
  await expect(chevron).toHaveCSS('rotate', '180deg');
  await page.getByRole('option', { name: 'Dark' }).click();
  await expect(trigger).toHaveText('Dark');
  await expect(page.getByRole('listbox')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('Label: a click focuses the trigger without opening the list', async ({
  page,
}) => {
  await openStill(page, demo('groups'));
  const trigger = page.getByRole('combobox', { name: 'Food' });
  await page.getByText('Food', { exact: true }).click();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('Keyboard: Enter opens, the arrows move, Enter picks; type-ahead; Escape closes', async ({
  page,
}) => {
  await openStill(page, demo('groups'));
  const trigger = page.getByRole('combobox', { name: 'Food' });
  await trigger.focus();
  await press(page, 'Enter');
  await expect(page.getByRole('listbox', { name: 'Food' })).toBeVisible();
  await press(page, 'ArrowDown');
  await press(page, 'ArrowDown');
  await press(page, 'Enter');
  await expect(trigger).toHaveText('Blueberry');
  await expect(trigger).toBeFocused();
  // Closed: a letter opens the list at the first option starting with it.
  await press(page, 's');
  await expect
    .poll(async () => {
      const id = await trigger.getAttribute('aria-activedescendant');
      return id ? page.locator(`#${id}`).textContent() : null;
    })
    .toContain('Spinach');
  await press(page, 'Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toHaveText('Blueberry');
});

test('The list opens below, as wide as the trigger: the trigger stays in sight', async ({
  page,
}) => {
  await openStill(page, '/demos/select/select-usage-demo');
  const trigger = page.getByRole('combobox', { name: 'Theme' });
  await trigger.click();
  const list = page.getByRole('listbox');
  await expect(list).toBeVisible();
  const [t, l] = [await box(trigger), await box(list)];
  expect(l.y).toBeGreaterThan(t.y + t.height);
  expect(Math.abs(l.width - t.width)).toBeLessThan(1);
});

test('Groups: each group named by its label, a line between', async ({
  page,
}) => {
  await openStill(page, demo('groups'));
  await page.getByRole('combobox', { name: 'Food' }).click();
  await expect(
    page.getByRole('group', { name: 'Fruits' }).getByRole('option'),
  ).toHaveText(['Apple', 'Banana', 'Blueberry']);
  await expect(
    page.getByRole('group', { name: 'Vegetables' }).getByRole('option'),
  ).toHaveText(['Carrot', 'Broccoli', 'Spinach']);
  await expect(page.getByRole('separator')).toBeVisible();
});

test('Scrollable: a scroll button while there is more; hovering it scrolls', async ({
  page,
}) => {
  await openStill(page, demo('scrollable'));
  await page.getByRole('combobox', { name: 'Timezone' }).click();
  const popup = page.locator('[scSelectPopup]');
  const down = page.locator('[scSelectScrollDownButton]');
  const up = page.locator('[scSelectScrollUpButton]');
  await expect(down).toBeVisible();
  await expect(up).toBeHidden();
  await expect(down).toHaveAttribute('aria-hidden', 'true');
  await down.hover();
  await expect
    .poll(() => popup.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(20);
  await expect(up).toBeVisible();
});

test('Disabled: the select does not open; a disabled option is skipped', async ({
  page,
}) => {
  await openStill(page, demo('disabled'));
  const disabled = page.getByRole('combobox', {
    name: 'Disabled',
    exact: true,
  });
  await expect(disabled).toHaveAttribute('aria-disabled', 'true');
  // The look blocks the pointer: a click event, as a script would send.
  await disabled.dispatchEvent('click');
  await expect(page.getByRole('listbox')).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Disabled option' }).click();
  await expect(page.getByRole('option', { name: 'Grapes' })).toHaveAttribute(
    'aria-disabled',
    'true',
  );
});

test('Invalid: required by the form, invalid once touched, the error read with it', async ({
  page,
}) => {
  await openStill(page, demo('invalid'));
  const trigger = page.getByRole('combobox', { name: 'Fruit' });
  await expect(trigger).toHaveAttribute('aria-invalid', 'true');
  await expect(trigger).toHaveAccessibleDescription('Please select a fruit.');
  await trigger.click();
  await page.getByRole('option', { name: 'Apple' }).click();
  await expect(trigger).not.toHaveAttribute('aria-invalid');
  await expect(page.getByText('Please select a fruit.')).toHaveCount(0);
});

test('RTL: from the right, the list from the trigger’s right edge', async ({
  page,
}) => {
  await openStill(page, demo('rtl'));
  const trigger = page.getByRole('combobox', { name: 'الفاكهة' });
  await expectRtl(trigger);
  await trigger.click();
  const list = page.locator('[scSelectPopup]');
  await expect(list).toBeVisible();
  const [t, l] = [await box(trigger), await box(list)];
  expect(Math.abs(t.x + t.width - (l.x + l.width))).toBeLessThan(4);
});

test('On a phone: the demos fit, every target 24px; a tap opens the list @mobile', async ({
  page,
}) => {
  for (const name of ['groups', 'scrollable', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
  await page.goto('/demos/select/select-usage-demo');
  await page.getByRole('combobox', { name: 'Theme' }).tap();
  await expect(page.getByRole('listbox')).toBeVisible();
});
