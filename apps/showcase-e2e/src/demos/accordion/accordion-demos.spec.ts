import { type Page } from '@playwright/test';
import { collectErrors, focus, press } from '../../interaction';
import { box } from '../../looks';
import { expectNoHorizontalScroll } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/accordion/${name}-accordion-demo`;
const usage = '/demos/accordion/accordion-usage-demo';

const trigger = (page: Page, name: RegExp | string) =>
  page.getByRole('button', { name });
const shown = (page: Page) =>
  page.getByRole('region').filter({ visible: true });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: triggers in headings; the given item open, its panel named by it', async ({
  page,
}) => {
  await page.goto(usage);
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(3);
  const shipping = trigger(page, /shipping options/);
  await expect(shipping).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page.getByRole('region', { name: /shipping options/ }),
  ).toBeVisible();
  await expect(shown(page)).toHaveCount(1);
  await expect(trigger(page, /return policy/)).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('One at a time: opening an item closes the other; a second click closes it', async ({
  page,
}) => {
  await page.goto(usage);
  const returns = trigger(page, /return policy/);
  await returns.click();
  await expect(returns).toHaveAttribute('aria-expanded', 'true');
  await expect(trigger(page, /shipping options/)).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await expect(shown(page)).toHaveCount(1);
  await returns.click();
  await expect(returns).toHaveAttribute('aria-expanded', 'false');
  await expect(shown(page)).toHaveCount(0);
});

test('Keyboard: Enter toggles; the arrows move between the triggers', async ({
  page,
}) => {
  await page.goto(usage);
  await focus(trigger(page, /shipping options/));
  await press(page, 'ArrowDown');
  const returns = trigger(page, /return policy/);
  await expect(returns).toBeFocused();
  await press(page, 'Enter');
  await expect(returns).toHaveAttribute('aria-expanded', 'true');
  await press(page, 'End');
  await expect(trigger(page, /contact customer support/)).toBeFocused();
});

test('The panel animates its height as it opens', async ({ page }) => {
  await page.goto(usage);
  await trigger(page, /contact customer support/).click();
  const panel = page.getByRole('region', { name: /contact customer support/ });
  await expect(panel).toBeVisible();
  // Its height grows, then settles.
  await expect.poll(async () => (await box(panel)).height).toBeGreaterThan(30);
});

test('Multiple: several open at once', async ({ page }) => {
  await page.goto(demo('multiple'));
  await trigger(page, /Privacy/).click();
  await expect(trigger(page, /Notification/)).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(trigger(page, /Privacy/)).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(shown(page)).toHaveCount(2);
});

test('Disabled: reached by the keyboard, not opened', async ({ page }) => {
  await page.goto(demo('disabled'));
  const premium = trigger(page, /Premium/);
  await expect(premium).toHaveAttribute('aria-disabled', 'true');
  await focus(trigger(page, /account history/));
  await press(page, 'ArrowDown');
  await expect(premium).toBeFocused();
  await press(page, 'Enter');
  await expect(premium).toHaveAttribute('aria-expanded', 'false');
});

test('Card: in a card, its first item open', async ({ page }) => {
  await page.goto(demo('card'));
  await expect(trigger(page, /subscription plans/)).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('RTL: right to left, the chevron on the left', async ({ page }) => {
  await page.goto(demo('rtl'));
  const first = page.locator('button[scAccordionTrigger]').first();
  await expectRtl(first);
  const [t, icon] = [await box(first), await box(first.locator('svg'))];
  expect(icon.x - t.x).toBeLessThan(30);
});

test('On a phone: the demos fit @mobile', async ({ page }) => {
  for (const name of ['basic', 'borders', 'card', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
  }
});
