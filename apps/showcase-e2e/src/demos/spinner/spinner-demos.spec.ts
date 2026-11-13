import { collectErrors } from '../../interaction';
import { box } from '../../looks';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/spinner/${name}-spinner-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a named status, announced (no longer hidden by its icon)', async ({
  page,
}) => {
  await page.goto('/demos/spinner/spinner-usage-demo');
  const spinner = page.getByRole('status', { name: 'Processing' });
  await expect(spinner).toBeVisible();
  await expect(spinner).not.toHaveAttribute('aria-hidden');
  await expect(spinner).toHaveAttribute('data-slot', 'spinner');
  await expect(spinner).not.toHaveCSS('animation-name', 'none');
});

test('Size: its size-* class', async ({ page }) => {
  await page.goto(demo('size'));
  // Its layout width: the bounding box of a turning spinner is wider.
  const widths = await page
    .getByRole('status')
    .evaluateAll((all) =>
      all.map((s) => parseFloat(getComputedStyle(s).width)),
    );
  expect(widths).toEqual([12, 16, 24, 32]);
});

test('Button and Badge: before the text', async ({ page }) => {
  await page.goto(demo('button'));
  const button = page.getByRole('button', { name: /Loading/ });
  await expect(button).toBeDisabled();
  const [spinner, b] = [
    await box(button.getByRole('status')),
    await box(button),
  ];
  expect(spinner.x - b.x).toBeLessThan(16);

  await page.goto(demo('badge'));
  await expect(page.getByRole('status')).toHaveCount(3);
});

test('Input group and Empty: the spinner where the work is', async ({
  page,
}) => {
  await page.goto(demo('input-group'));
  await expect(page.getByRole('status', { name: 'Sending' })).toBeVisible();
  await page.goto(demo('empty'));
  await expect(
    page.getByRole('heading', { name: 'Processing your request' }),
  ).toBeVisible();
  await expect(page.getByRole('status', { name: 'Processing' })).toBeVisible();
});

test('RTL: before the text, on the right', async ({ page }) => {
  await page.goto(demo('rtl'));
  const button = page.getByRole('button').first();
  await expectRtl(button);
  const [spinner, b] = [
    await box(button.getByRole('status')),
    await box(button),
  ];
  expect(b.x + b.width - (spinner.x + spinner.width)).toBeLessThan(16);
});
