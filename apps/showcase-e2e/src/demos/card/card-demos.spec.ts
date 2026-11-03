import { collectErrors, focus, press } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/card/${name}-card-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: the title a heading, the action beside it; Login submits the form in the card', async ({
  page,
}) => {
  await page.goto('/demos/card/card-usage-demo');
  const title = page.getByRole('heading', { name: 'Login to your account' });
  await expect(title).toBeVisible();
  // The action at the end of the header, level with the title.
  const signUp = page.getByRole('button', { name: 'Sign Up' });
  const [t, a] = [await box(title), await box(signUp)];
  expect(a.x).toBeGreaterThan(t.x + t.width - 1);
  expect(Math.abs(a.y - t.y)).toBeLessThan(t.height);

  // The footer's Login submits the form above it (form="…"): empty, the
  // fields are marked invalid.
  const email = page.getByRole('textbox', { name: 'Email' });
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(email).toHaveAttribute('aria-invalid', 'true');
  await email.fill('m@example.com');
  await expect(email).not.toHaveAttribute('aria-invalid');
});

test('Size: sm, less spacing than the default', async ({ page }) => {
  await page.goto(demo('size'));
  const small = page.locator('[scCard]');
  await expect(small).toHaveAttribute('data-size', 'sm');
  const smallGap = await small.evaluate((el) => getComputedStyle(el).rowGap);
  await page.goto('/demos/card/card-usage-demo');
  const normal = await page
    .locator('[scCard]')
    .evaluate((el) => getComputedStyle(el).rowGap);
  expect(parseFloat(smallGap)).toBeLessThan(parseFloat(normal));
});

test('Spacing: the toggle sets --card-spacing, the gap follows', async ({
  page,
}) => {
  await page.goto(demo('spacing'));
  const card = page.locator('[scCard]');
  await page.getByRole('button', { name: '32px' }).click();
  await expect(card).toHaveCSS('row-gap', '32px');
  await page.getByRole('button', { name: '16px' }).click();
  await expect(card).toHaveCSS('row-gap', '16px');
});

test('Edge to Edge: the band reaches the card’s sides; it scrolls, reached by the keyboard', async ({
  page,
}) => {
  await page.goto(demo('edge-to-edge'));
  const card = page.locator('[scCard]');
  const band = page.getByRole('region', { name: 'Terms of Service' });
  const [c, b] = [await box(card), await box(band)];
  expect(Math.abs(b.x - c.x)).toBeLessThan(2);
  expect(Math.abs(b.x + b.width - (c.x + c.width))).toBeLessThan(2);
  await focus(band);
  await press(page, 'ArrowDown');
  await press(page, 'ArrowDown');
  await expect
    .poll(() => band.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
});

test('Image: first, at the top edge, with no padding above', async ({
  page,
}) => {
  await page.goto(demo('image'));
  const card = page.locator('[scCard]');
  const image = page.getByRole('img', { name: 'Mountains at dawn' });
  const [c, i] = [await box(card), await box(image)];
  expect(Math.abs(i.y - c.y)).toBeLessThan(2);
  expect(Math.abs(i.width - c.width)).toBeLessThan(2);
});

test('RTL: from the right, the action on the left', async ({ page }) => {
  await page.goto(demo('rtl'));
  const title = page.getByRole('heading', { name: 'تسجيل الدخول إلى حسابك' });
  await expectRtl(title);
  await expectInlineOrder([
    title,
    page.getByRole('button', { name: 'إنشاء حساب' }),
  ]);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['size', 'spacing', 'edge-to-edge', 'image', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
  await page.goto('/demos/card/card-usage-demo');
  await expectNoHorizontalScroll(page);
});
