import type { Locator } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/switch/${name}-switch-demo`;

/** How far its thumb (its ::before) is moved along the track: translate's x. */
const thumbX = (control: Locator) =>
  control.evaluate(
    (el) =>
      /^(calc\([^)]*\)|\S+)/.exec(
        getComputedStyle(el, '::before').translate,
      )?.[1],
  );

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a switch, named by its label; a press on the label switches it', async ({
  page,
}) => {
  await page.goto('/demos/switch/switch-usage-demo');
  const airplane = page.getByRole('switch', { name: 'Airplane Mode' });
  await expect(airplane).not.toBeChecked();
  await page.getByText('Airplane Mode').click();
  await expect(airplane).toBeChecked();
});

test('Usage: Space switches it; its thumb moves to the end', async ({
  page,
}) => {
  await page.goto('/demos/switch/switch-usage-demo');
  const airplane = page.getByRole('switch', { name: 'Airplane Mode' });
  expect(await thumbX(airplane)).toMatch(/^0(px)?$/);
  await airplane.focus();
  await press(page, ' ');
  await expect(airplane).toBeChecked();
  // Toward the end: its own width, less the track's border.
  await expect.poll(() => thumbX(airplane)).toMatch(/^calc\(100%/);
});

test('Description: read with its switch; the switch at the end', async ({
  page,
}) => {
  await page.goto(demo('description'));
  const share = page.getByRole('switch', { name: 'Share across devices' });
  await expect(share).toHaveAccessibleDescription(
    'Focus is shared across devices, and turns off when you leave the app.',
  );
  const [control, label] = [
    await box(share),
    await box(page.getByText('Share across devices')),
  ];
  expect(control.x).toBeGreaterThan(label.x);
});

test('Choice card: a press on the card switches it', async ({ page }) => {
  await page.goto(demo('choice-card'));
  await page.getByText('Focus is shared across devices').click();
  await expect(
    page.getByRole('switch', { name: /Share across devices/ }),
  ).toBeChecked();
});

test('Disabled: out of reach', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(page.getByRole('switch', { name: 'Disabled' })).toBeDisabled();
});

test('Invalid: marked once touched', async ({ page }) => {
  await page.goto(demo('invalid'));
  await expect(page.getByRole('switch')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
});

test('Sizes: sm is smaller than default', async ({ page }) => {
  await page.goto(demo('sizes'));
  const [small, normal] = [
    await box(page.getByRole('switch', { name: 'Small' })),
    await box(page.getByRole('switch', { name: 'Default' })),
  ];
  expect(small.width).toBeLessThan(normal.width);
  expect(small.height).toBeLessThan(normal.height);
});

test('Placement: first at the start, last at the end', async ({ page }) => {
  await page.goto(demo('placement'));
  const [marketing, updates] = [
    await box(page.getByRole('switch', { name: /Marketing emails/ })),
    await box(page.getByRole('switch', { name: /Product updates/ })),
  ];
  expect(marketing.x).toBeGreaterThan(updates.x);
});

test('State: its text follows', async ({ page }) => {
  await page.goto(demo('state'));
  await page.getByRole('switch').click();
  await expect(page.getByText('Notifications: Off')).toBeVisible();
});

test('Signal Forms: the model follows', async ({ page }) => {
  await page.goto(demo('signal-forms'));
  await page.getByRole('switch', { name: 'Dark mode' }).click();
  await expect(page.locator('pre')).toContainText('"darkMode": true');
});

test('RTL: on, its thumb moves to the left', async ({ page }) => {
  await page.goto(demo('rtl'));
  const share = page.getByRole('switch', { name: 'المشاركة عبر الأجهزة' });
  await expect(share).toBeChecked();
  expect(await thumbX(share)).toMatch(/^calc\(-100%/);
});
