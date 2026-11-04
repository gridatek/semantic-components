import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/alert/${name}-alert-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: no role of its own; the icon beside the title and description', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const alert = page.locator('[scAlert]');
  await expect(alert).not.toHaveAttribute('role');
  await expect(page.getByRole('alert')).toHaveCount(0);
  const [icon, title, description] = [
    await box(alert.locator('svg')),
    await box(alert.locator('[scAlertTitle]')),
    await box(alert.locator('[scAlertDescription]')),
  ];
  expect(title.x).toBeGreaterThan(icon.x + icon.width);
  expect(Math.abs(description.x - title.x)).toBeLessThan(1);
});

test('Destructive: the destructive color, on the icon too', async ({
  page,
}) => {
  await page.goto(demo('destructive'));
  const basic = await page
    .locator('[scAlert]')
    .evaluate((el) => getComputedStyle(el).color);
  const icon = await page
    .locator('[scAlert] svg')
    .evaluate((el) => getComputedStyle(el).color);
  expect(icon).toBe(basic);
  await page.goto(demo('basic'));
  const normal = await page
    .locator('[scAlert]')
    .evaluate((el) => getComputedStyle(el).color);
  expect(basic).not.toBe(normal);
});

test('Action: the button in the end corner, the text clear of it', async ({
  page,
}) => {
  await page.goto(demo('action'));
  const alert = page.locator('[scAlert]');
  const button = page.getByRole('button', { name: 'Enable' });
  const [a, b, d] = [
    await box(alert),
    await box(button),
    await box(alert.locator('[scAlertDescription]')),
  ];
  expect(a.x + a.width - (b.x + b.width)).toBeLessThan(16);
  expect(b.y - a.y).toBeLessThan(16);
  expect(d.x + d.width).toBeLessThanOrEqual(b.x + 1);
});

test('Custom Colors: your classes over the preset’s', async ({ page }) => {
  await page.goto(demo('colors'));
  const alert = page.locator('[scAlert]');
  await expect(alert).toHaveClass(/bg-amber-50/);
  await expect(alert).not.toHaveClass(/bg-card/);
});

test('Announced: the alert appears in a status region, announced politely', async ({
  page,
}) => {
  await page.goto(demo('announced'));
  const region = page.getByRole('status');
  await expect(region).toBeAttached();
  await expect(region.locator('[scAlert]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(region).toContainText('Changes saved');
});

test('RTL: the icon on the right, the action in the left corner', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const [first, second] = [
    page.locator('[scAlert]').first(),
    page.locator('[scAlert]').nth(1),
  ];
  await expectRtl(first);
  const [a, icon] = [await box(first), await box(first.locator('svg'))];
  expect(icon.x).toBeGreaterThan(a.x + a.width / 2);
  const [s, button] = [
    await box(second),
    await box(second.getByRole('button')),
  ];
  expect(button.x - s.x).toBeLessThan(16);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of [
    'basic',
    'destructive',
    'action',
    'colors',
    'announced',
    'rtl',
  ]) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
