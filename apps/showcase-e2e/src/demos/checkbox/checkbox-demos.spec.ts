import type { Locator } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/checkbox/${name}-checkbox-demo`;

/** Its mark: the SVG in the box the field draws beside it. */
const mark = (checkbox: Locator) =>
  checkbox.evaluate((el) =>
    el.parentElement?.querySelector('[data-slot=checkbox-visual] svg')
      ? 'url(svg)'
      : 'none',
  );

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a press on the text checks it; its mark shows', async ({
  page,
}) => {
  await page.goto('/demos/checkbox/checkbox-usage-demo');
  const terms = page
    .getByRole('checkbox', { name: 'Accept terms and conditions' })
    .first();
  await expect(terms).not.toBeChecked();
  expect(await mark(terms)).toBe('none');
  await page.getByText('Accept terms and conditions').first().click();
  await expect(terms).toBeChecked();
  expect(await mark(terms)).toContain('url(');
  await expect(
    page.getByRole('checkbox', { name: 'Enable notifications' }).first(),
  ).toBeDisabled();
});

test('Usage: a press on the card checks its checkbox', async ({ page }) => {
  await page.goto('/demos/checkbox/checkbox-usage-demo');
  await page.getByText('You can enable or disable notifications').click();
  await expect(
    page.getByRole('checkbox', { name: /Enable notifications/ }).last(),
  ).toBeChecked();
});

test('Description: read with its checkbox', async ({ page }) => {
  await page.goto(demo('description'));
  await expect(
    page.getByRole('checkbox', { name: 'Accept terms and conditions' }),
  ).toHaveAccessibleDescription(
    'By clicking this checkbox, you agree to the terms and conditions.',
  );
});

test('Group: named by its legend; Space toggles', async ({ page }) => {
  await page.goto(demo('group'));
  const group = page.getByRole('group', {
    name: 'Show these items on the desktop:',
  });
  await expect(
    group.getByRole('checkbox', { name: 'Hard disks' }),
  ).toBeChecked();
  const media = group.getByRole('checkbox', { name: 'CDs, DVDs, and iPods' });
  await media.focus();
  await press(page, ' ');
  await expect(media).toBeChecked();
});

test('Disabled: out of reach', async ({ page }) => {
  await page.goto(demo('disabled'));
  for (const name of ['Enable notifications', 'Sync settings'])
    await expect(page.getByRole('checkbox', { name })).toBeDisabled();
  await expect(
    page.getByRole('checkbox', { name: 'Sync settings' }),
  ).toBeChecked();
});

test('Invalid: marked once touched', async ({ page }) => {
  await page.goto(demo('invalid'));
  await expect(page.getByRole('checkbox')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
});

test('Table: select all is mixed over some rows, then picks them all', async ({
  page,
}) => {
  await page.goto(demo('table'));
  const all = page.getByRole('checkbox', { name: 'Select all' });
  await expect(all).toHaveJSProperty('indeterminate', true);
  expect(await mark(all)).toContain('url(');
  await all.click();
  await expect(all).toHaveJSProperty('indeterminate', false);
  await expect(all).toBeChecked();
  for (const name of [
    'Sarah Chen',
    'Marcus Rodriguez',
    'Priya Patel',
    'David Kim',
  ])
    await expect(
      page.getByRole('checkbox', { name: `Select ${name}` }),
    ).toBeChecked();
  await all.click();
  await expect(
    page.getByRole('checkbox', { name: 'Select Sarah Chen' }),
  ).not.toBeChecked();
});

test('Indeterminate: stays mixed until all or none are checked', async ({
  page,
}) => {
  await page.goto(demo('indeterminate'));
  const all = page.getByRole('checkbox', { name: 'Select all' });
  await expect(all).toHaveJSProperty('indeterminate', true);
  await page.getByRole('checkbox', { name: 'Item 2' }).click();
  await expect(all).toHaveJSProperty('indeterminate', true);
  await page.getByRole('checkbox', { name: 'Item 3' }).click();
  await expect(all).toHaveJSProperty('indeterminate', false);
  await expect(all).toBeChecked();
});

test('Signal Forms: the model follows', async ({ page }) => {
  await page.goto(demo('signal-forms'));
  await page
    .getByRole('checkbox', { name: 'Receive marketing emails' })
    .click();
  await expect(page.locator('pre')).toContainText('"marketing": true');
});

test('Form: two-way, without a form', async ({ page }) => {
  await page.goto(demo('form'));
  const sms = page.getByRole('checkbox', { name: 'SMS notifications' });
  await expect(sms).not.toBeChecked();
  await sms.click();
  await expect(sms).toBeChecked();
});

test('RTL: the checkbox at the right of its text', async ({ page }) => {
  await page.goto(demo('rtl'));
  const name = 'قبول الشروط والأحكام';
  const [checkbox, label] = [
    await box(page.getByRole('checkbox', { name }).first()),
    await box(page.getByText(name).first()),
  ];
  expect(checkbox.x).toBeGreaterThan(label.x);
});
