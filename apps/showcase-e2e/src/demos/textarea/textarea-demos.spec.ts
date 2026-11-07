import { collectErrors } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/textarea/${name}-textarea-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: named; it grows with its text', async ({ page }) => {
  await page.goto('/demos/textarea/textarea-usage-demo');
  const box = page.getByRole('textbox', { name: 'Message' });
  const before = (await box.boundingBox())?.height ?? 0;
  await box.fill('one\ntwo\nthree\nfour\nfive\nsix');
  await expect
    .poll(async () => (await box.boundingBox())?.height ?? 0)
    .toBeGreaterThan(before);
});

test('Field: named by its label, described by its description', async ({
  page,
}) => {
  await page.goto(demo('field'));
  await expect(
    page.getByRole('textbox', { name: 'Message' }),
  ).toHaveAccessibleDescription('Enter your message below.');
});

test('Disabled: nothing can be typed', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(page.getByRole('textbox', { name: 'Message' })).toBeDisabled();
});

test('Invalid: marked, its error read with it', async ({ page }) => {
  await page.goto(demo('invalid'));
  const box = page.getByRole('textbox', { name: 'Message' });
  await expect(box).toHaveAttribute('aria-invalid', 'true');
  await expect(box).toHaveAccessibleDescription(/Please enter a message/);
});
