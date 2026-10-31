import { collectErrors, press } from '../../interaction';
import { box, computed, corners, openStill } from '../../looks';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/control-group/${name}-control-group-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: an input and its button, one control — the outer corners round, one border between', async ({
  page,
}) => {
  await openStill(page, '/demos/control-group/control-group-usage-demo');
  const group = page.getByRole('group', { name: 'Newsletter' });
  const email = group.getByRole('textbox', { name: 'Email' });
  const subscribe = group.getByRole('button', { name: 'Subscribe' });
  await expect.poll(() => corners(email)).toEqual([true, false, false, true]);
  expect(await corners(subscribe)).toEqual([false, true, true, false]);
  expect(await computed(subscribe, 'border-left-width')).toBe('0px');
  // Joined: the button starts where the input ends.
  const [a, b] = [await box(email), await box(subscribe)];
  expect(Math.abs(a.x + a.width - b.x)).toBeLessThan(1);
});

test('Keyboard: Tab goes to the input, then the button, each ring whole', async ({
  page,
}) => {
  await openStill(page, '/demos/control-group/control-group-usage-demo');
  const email = page.getByRole('textbox', { name: 'Email' });
  // The static build renders after the load: Tab once it's there.
  await expect(email).toBeVisible();
  await press(page, 'Tab');
  await expect(email).toBeFocused();
  await expect(email).toHaveCSS('z-index', '10');
  await press(page, 'Tab');
  const subscribe = page.getByRole('button', { name: 'Subscribe' });
  await expect(subscribe).toBeFocused();
  await expect(subscribe).not.toHaveCSS('box-shadow', 'none');
  await expect(subscribe).toHaveCSS('z-index', '10');
});

test('Input: the input takes the room, joined to its button', async ({
  page,
}) => {
  await openStill(page, demo('input'));
  const input = page.getByRole('textbox', { name: 'Search' });
  const button = page.getByRole('button', { name: 'Search' });
  await expect.poll(() => corners(input)).toEqual([true, false, false, true]);
  expect(await corners(button)).toEqual([false, true, true, false]);
  await expect(input).toHaveCSS('flex-grow', '1');
});

test('Text: a label beside the input names it', async ({ page }) => {
  await openStill(page, demo('text'));
  const input = page.getByRole('textbox', { name: 'https://' });
  await expect(input).toBeVisible();
  const text = page.getByText('https://');
  await expect.poll(() => corners(text)).toEqual([true, false, false, true]);
  // A click on the label focuses its input.
  await text.click();
  await expect(input).toBeFocused();
});

test('Select: its trigger joined to the amount, a currency picked', async ({
  page,
}) => {
  await openStill(page, demo('select'));
  const currency = page.getByRole('combobox', { name: 'Currency' });
  const amount = page.getByRole('textbox', { name: 'Amount' });
  await expect(currency).toHaveText('$');
  // The trigger, inside the select's root, is joined: its end corners square.
  await expect
    .poll(() => corners(currency))
    .toEqual([true, false, false, true]);
  expect(await computed(amount, 'border-left-width')).toBe('0px');
  // It fits its value, not the select's usual minimum width.
  expect((await box(currency)).width).toBeLessThan(80);
  await currency.click();
  await page.getByRole('option', { name: /€/ }).click();
  await expect(currency).toHaveText('€');
  await amount.fill('10.00');
  await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
});

test('Input Group: Voice Mode pressed turns the input off and says so', async ({
  page,
}) => {
  await openStill(page, demo('input-group'));
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

test('Nested: groups in a group, spaced apart; the voice button has a tooltip', async ({
  page,
}) => {
  await openStill(page, demo('nested'));
  const outer = page.getByRole('group', { name: 'Message' });
  await expect(outer).toHaveCSS('column-gap', '8px');
  await expect(page.getByRole('textbox', { name: 'Message' })).toBeVisible();
  await page.getByRole('button', { name: 'Voice Mode' }).hover();
  await expect(page.getByRole('tooltip')).toHaveText('Voice Mode');
});

test('RTL: from the right — the select, the amount, the button; the corners mirrored', async ({
  page,
}) => {
  await openStill(page, demo('rtl'));
  const currency = page.getByRole('combobox', { name: 'العملة' });
  const amount = page.getByRole('textbox', { name: 'المبلغ' });
  const send = page.getByRole('button', { name: 'إرسال' });
  await expectRtl(amount);
  await expectInlineOrder([currency, amount, send]);
  // The first, at the right: its right corners round; the last, its left.
  await expect
    .poll(() => corners(currency))
    .toEqual([false, true, true, false]);
  expect(await corners(send)).toEqual([true, false, false, true]);
  await expect(send.locator('svg')).toHaveCSS('rotate', '180deg');
  // The list lines up with the trigger's start — its right edge.
  await currency.click();
  const list = page.getByRole('listbox');
  await expect(list).toBeVisible();
  const [t, l] = [await box(currency), await box(list)];
  expect(Math.abs(t.x + t.width - (l.x + l.width))).toBeLessThan(8);
});

test('On a phone: the demos fit, every target 24px @mobile', async ({
  page,
}) => {
  for (const name of ['input', 'text', 'select', 'input-group', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
});
