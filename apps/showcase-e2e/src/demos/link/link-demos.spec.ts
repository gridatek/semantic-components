import { collectErrors, press } from '../../interaction';
import { expectNoHorizontalScroll, expectTargetSize } from '../../mobile';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/link/${name}-link-demo`;
const link = (page: Page, name: string | RegExp) =>
  page.getByRole('link', { name, exact: typeof name === 'string' });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a real link, with its own href, a button look', async ({
  page,
}) => {
  await page.goto('/demos/link/link-usage-demo');
  const target = link(page, 'Go to Button');
  await expect(target).toHaveAttribute('href', '/docs/components/button');
  await expect(target).toHaveCSS('height', '32px');
  await expect(page.getByRole('button')).toHaveCount(0);
});

test('Variants: six links, six looks', async ({ page }) => {
  await page.goto(demo('variants'));
  const links = page.getByRole('link');
  await expect(links).toHaveText([
    'Default',
    'Outline',
    'Secondary',
    'Ghost',
    'Destructive',
    'Link',
  ]);
  const looks = await links.evaluateAll((all) =>
    all.map((el) => {
      const style = getComputedStyle(el);
      return `${style.backgroundColor} ${style.color} ${style.borderColor}`;
    }),
  );
  expect(new Set(looks).size).toBe(6);
});

test('Size: the button sizes, an icon link named by hidden text', async ({
  page,
}) => {
  await page.goto(demo('size'));
  for (const [name, height] of [
    ['Extra Small', 24],
    ['Small', 28],
    ['Default', 32],
    ['Large', 36],
  ] as const)
    await expect(link(page, name)).toHaveCSS('height', `${height}px`);
  const icon = link(page, 'Button docs');
  await expect(icon).toHaveCSS('width', '32px');
  await expect(icon).toHaveCSS('height', '32px');
});

test('With Icon: less padding on the icon’s side (data-icon)', async ({
  page,
}) => {
  await page.goto(demo('with-icon'));
  await expect(link(page, 'Badge')).toHaveCSS('padding-inline-start', '8px');
  await expect(link(page, 'Badge')).toHaveCSS('padding-inline-end', '10px');
  await expect(link(page, 'Card')).toHaveCSS('padding-inline-end', '8px');
});

test('Router Link: followed inside the app, no page load', async ({ page }) => {
  await page.goto(demo('router'));
  // A mark on the window: gone if the page reloaded.
  await page.evaluate(() => ((window as { stay?: boolean }).stay = true));
  await link(page, 'Go to Button').click();
  // The docs page loads its chunk on the way: slow under load.
  await expect(page).toHaveURL(/\/docs\/components\/button$/, {
    timeout: 15_000,
  });
  expect(await page.evaluate(() => (window as { stay?: boolean }).stay)).toBe(
    true,
  );
});

test('External: a new tab, without the opener; said to the reader', async ({
  page,
}) => {
  await page.goto(demo('external'));
  const github = link(page, /GitHub/);
  await expect(github).toHaveAccessibleName('GitHub (opens in a new tab)');
  await expect(github).toHaveAttribute('target', '_blank');
  await expect(github).toHaveAttribute('rel', /noopener/);
});

test('Disabled: a dimmed link, out of the tab order, not followed by any means', async ({
  page,
}) => {
  await page.goto(demo('disabled'));
  const url = page.url();
  for (const name of ['Button docs', 'Badge docs']) {
    const target = link(page, name);
    await expect(target).toHaveAttribute('aria-disabled', 'true');
    await expect(target).toHaveAttribute('tabindex', '-1');
    await expect(target).toHaveCSS('opacity', '0.5');
    // A click (forced: the look blocks the pointer) — href and routerLink.
    await target.click({ force: true });
    await expect(page).toHaveURL(url);
    // Focused anyway (by a script), Enter doesn't follow it either.
    await target.focus();
    await press(page, 'Enter');
    await expect(page).toHaveURL(url);
    // A middle-click: its default (a new tab) prevented.
    const prevented = await target.evaluate((el) => {
      const event = new MouseEvent('auxclick', {
        button: 1,
        bubbles: true,
        cancelable: true,
      });
      el.dispatchEvent(event);
      return event.defaultPrevented;
    });
    expect(prevented).toBe(true);
  }
  await page.locator('body').click({ position: { x: 1, y: 1 } });
  await press(page, 'Tab');
  await expect(page.locator(':focus')).toHaveCount(0);
});

test('Keyboard: Tab reaches a link, Enter follows it', async ({
  page,
  browserName,
}) => {
  await page.goto(demo('variants'));
  const first = link(page, 'Default');
  // The static build renders after the load: Tab once it's there.
  await expect(first).toBeVisible();
  // WebKit, as Safari by default, doesn't tab to links.
  if (browserName === 'webkit') await first.focus();
  else await press(page, 'Tab');
  await expect(first).toBeFocused();
  await expect(first).not.toHaveCSS('box-shadow', 'none');
  await press(page, 'Enter');
  await expect(page).toHaveURL(/\/docs\/components\/button$/, {
    timeout: 15_000,
  });
});

test('RTL: from the right, the arrows pointing the reading way', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const first = link(page, 'الأزرار');
  const previous = link(page, 'السابق');
  const next = link(page, 'التالي');
  await expectRtl(first);
  await expectInlineOrder([first, previous, next]);
  await expect(previous.locator('svg')).toHaveCSS('scale', '-1 1');
});

test('On a phone: the demos fit, every link a 24px target @mobile', async ({
  page,
}) => {
  for (const name of ['variants', 'size', 'with-icon', 'rtl']) {
    await page.goto(demo(name));
    await expectNoHorizontalScroll(page);
    await expectTargetSize(page.locator('body'), 24);
  }
});
