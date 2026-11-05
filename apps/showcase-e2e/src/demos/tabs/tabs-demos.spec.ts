import { type Page } from '@playwright/test';
import { collectErrors, focus, press } from '../../interaction';
import { openStill } from '../../looks';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectRtl } from '../../rtl';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/tabs/${name}-tabs-demo`;
const usage = '/demos/tabs/tabs-usage-demo';

const tab = (page: Page, name: string) => page.getByRole('tab', { name });
/** The panel shown. */
const shown = (page: Page) =>
  page.getByRole('tabpanel').filter({ visible: true });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: the given tab selected, its panel shown and named by it; a click selects another', async ({
  page,
}) => {
  await openStill(page, usage);
  await expect(tab(page, 'Overview')).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Overview' })).toBeVisible();
  await expect(shown(page)).toHaveCount(1);
  await tab(page, 'Reports').click();
  await expect(tab(page, 'Reports')).toHaveAttribute('aria-selected', 'true');
  await expect(tab(page, 'Overview')).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByRole('tabpanel', { name: 'Reports' })).toBeVisible();
  await expect(shown(page)).toHaveCount(1);
});

test('Keyboard: the arrows move focus, Enter selects; Tab goes on to the panel', async ({
  page,
}) => {
  await openStill(page, usage);
  await focus(tab(page, 'Overview'));
  await press(page, 'ArrowRight');
  await expect(tab(page, 'Analytics')).toBeFocused();
  // Not selected by moving (activateOnFocus is off).
  await expect(tab(page, 'Analytics')).toHaveAttribute(
    'aria-selected',
    'false',
  );
  await press(page, 'End');
  await expect(tab(page, 'Settings')).toBeFocused();
  await press(page, 'Enter');
  await expect(tab(page, 'Settings')).toHaveAttribute('aria-selected', 'true');
  await press(page, 'Tab');
  await expect(page.getByRole('tabpanel', { name: 'Settings' })).toBeFocused();
});

test('Panel content: created when its tab is selected, destroyed when another is', async ({
  page,
}) => {
  await openStill(page, usage);
  const text = page.getByText('Page views are up 25%');
  await expect(text).toHaveCount(0);
  await tab(page, 'Analytics').click();
  await expect(text).toBeVisible();
  await tab(page, 'Overview').click();
  await expect(text).toHaveCount(0);
});

test('Line: the selected tab underlined', async ({ page }) => {
  await openStill(page, demo('line'));
  await expect(page.getByRole('tablist')).toHaveAttribute(
    'data-variant',
    'line',
  );
  const underline = (name: string) =>
    tab(page, name).evaluate((el) => getComputedStyle(el, '::after').opacity);
  expect(await underline('Overview')).toBe('1');
  expect(await underline('Analytics')).toBe('0');
});

test('Vertical: ArrowDown and ArrowUp move', async ({ page }) => {
  await openStill(page, demo('vertical'));
  await expect(page.getByRole('tablist')).toHaveAttribute(
    'aria-orientation',
    'vertical',
  );
  await focus(tab(page, 'Account'));
  await press(page, 'ArrowDown');
  await expect(tab(page, 'Password')).toBeFocused();
  await press(page, 'ArrowUp');
  await expect(tab(page, 'Account')).toBeFocused();
});

test('Disabled: reached by the arrows, not selected', async ({ page }) => {
  await openStill(page, demo('disabled'));
  const disabled = tab(page, 'Disabled');
  await expect(disabled).toHaveAttribute('aria-disabled', 'true');
  await focus(tab(page, 'Home'));
  await press(page, 'ArrowRight');
  await expect(disabled).toBeFocused();
  await press(page, 'Enter');
  await expect(disabled).toHaveAttribute('aria-selected', 'false');
  await expect(tab(page, 'Home')).toHaveAttribute('aria-selected', 'true');
});

test('Icons: the tabs named by their text', async ({ page }) => {
  await openStill(page, demo('icons'));
  await expect(tab(page, 'Preview')).toHaveAttribute('aria-selected', 'true');
  await tab(page, 'Code').click();
  await expect(page.getByRole('tabpanel', { name: 'Code' })).toBeVisible();
});

test('RTL: the tabs from the right; ArrowLeft moves to the next', async ({
  page,
}) => {
  await openStill(page, demo('rtl'));
  const list = page.getByRole('tablist');
  await expectRtl(list);
  const first = tab(page, 'نظرة عامة');
  const second = tab(page, 'التحليلات');
  expect((await first.boundingBox())!.x).toBeGreaterThan(
    (await second.boundingBox())!.x,
  );
  await focus(first);
  await press(page, 'ArrowLeft');
  await expect(second).toBeFocused();
});

test('On a phone: the demos fit, every target 24px @mobile', async ({
  page,
}) => {
  for (const name of ['line', 'vertical', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
});
