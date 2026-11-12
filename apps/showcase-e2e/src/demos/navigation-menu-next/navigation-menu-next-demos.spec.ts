import { collectErrors, focus, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) =>
  name === 'usage'
    ? '/demos/navigation-menu-next/navigation-menu-next-usage-demo'
    : `/demos/navigation-menu-next/${name}-navigation-menu-next-demo`;
const trigger = (page: Page, name: string) =>
  page.getByRole('button', { name, exact: true });
const item = (page: Page, index: number) =>
  page.locator('[scNavigationMenuNextItem]').nth(index);
const panel = (page: Page, index: number) =>
  page.locator('[scNavigationMenuNextContent]').nth(index);
const viewport = (page: Page) => page.locator('nav > div[aria-hidden]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: a disclosure — aria-expanded, aria-controls; panels closed and hidden', async ({
  page,
}) => {
  await page.goto(demo('usage'));
  await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
  await expect(page.getByRole('menu')).toHaveCount(0);
  const start = trigger(page, 'Getting started');
  await expect(start).toHaveAttribute('aria-expanded', 'false');
  const id = await start.getAttribute('aria-controls');
  await expect(panel(page, 0)).toHaveAttribute('id', id!);
  await expect(panel(page, 0)).toHaveCSS('visibility', 'hidden');
  await expect(page.getByRole('link', { name: /Introduction/ })).toBeHidden();
  // The chevron is decorative.
  await expect(start.locator('svg')).toHaveAttribute('aria-hidden', 'true');
});

test('Usage: hover opens, moving to another item switches, leaving closes', async ({
  page,
}) => {
  await page.goto(demo('usage'));
  await trigger(page, 'Getting started').hover();
  await expect(trigger(page, 'Getting started')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(page.getByRole('link', { name: /Introduction/ })).toBeVisible();
  // Over the gap into the panel: still open.
  await page.getByRole('link', { name: /Installation/ }).hover();
  await expect(trigger(page, 'Getting started')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  const before = await viewport(page).evaluate((el) => el.style.left);
  await trigger(page, 'Components').hover();
  await expect(trigger(page, 'Components')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(trigger(page, 'Getting started')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  // The shared box moved to the open item.
  await expect
    .poll(() => viewport(page).evaluate((el) => el.style.left))
    .not.toBe(before);
  await page.mouse.move(5, 500);
  await expect(trigger(page, 'Components')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('Usage: a click opens; a second click closes', async ({ page }) => {
  await page.goto(demo('usage'));
  const components = trigger(page, 'Components');
  await components.click();
  await expect(components).toHaveAttribute('aria-expanded', 'true');
  await components.click();
  await expect(components).toHaveAttribute('aria-expanded', 'false');
});

test('Usage: the keyboard — Enter, Tab into the panel, Escape, arrows, Home/End', async ({
  page,
  browserName,
}) => {
  await page.goto(demo('usage'));
  const start = trigger(page, 'Getting started');
  await focus(start);
  await press(page, 'Enter');
  await expect(start).toHaveAttribute('aria-expanded', 'true');
  // Tab follows the page: into the open panel. WebKit, as Safari by default,
  // doesn't tab to links: there, ↓ goes in.
  await press(page, browserName === 'webkit' ? 'ArrowDown' : 'Tab');
  await expect(page.getByRole('link', { name: /Introduction/ })).toBeFocused();
  await press(page, 'ArrowDown');
  await expect(page.getByRole('link', { name: /Installation/ })).toBeFocused();
  await press(page, 'Escape');
  await expect(start).toHaveAttribute('aria-expanded', 'false');
  await expect(start).toBeFocused();

  await press(page, 'ArrowRight');
  await expect(trigger(page, 'Components')).toBeFocused();
  await press(page, 'End');
  await expect(page.getByRole('link', { name: 'Docs' })).toBeFocused();
  await press(page, 'Home');
  await expect(start).toBeFocused();

  // ↓ on a closed trigger: opens, and into its panel.
  await press(page, 'ArrowRight');
  await press(page, 'ArrowDown');
  await expect(trigger(page, 'Components')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(page.getByRole('link', { name: /Alert Dialog/ })).toBeFocused();
});

test('Usage: the focus leaving the item, or a click outside, closes it', async ({
  page,
}) => {
  await page.goto(demo('usage'));
  const start = trigger(page, 'Getting started');
  await focus(start);
  await press(page, 'Enter');
  await expect(start).toHaveAttribute('aria-expanded', 'true');
  await focus(trigger(page, 'Components'));
  await expect(start).toHaveAttribute('aria-expanded', 'false');

  await trigger(page, 'Components').click();
  await expect(trigger(page, 'Components')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.mouse.click(5, 500);
  await expect(trigger(page, 'Components')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('Usage: following a link closes the menu', async ({ page }) => {
  await page.goto(demo('usage'));
  await trigger(page, 'With Icon').click();
  await page.getByRole('link', { name: 'Backlog' }).click();
  await expect(trigger(page, 'With Icon')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('Separate Panels: no shared box, each panel its own', async ({ page }) => {
  await page.goto(demo('separate'));
  await expect(viewport(page)).toHaveCount(0);
  await trigger(page, 'Components').click();
  await expect(panel(page, 1)).not.toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)',
  );
});

test('Open Item: [(value)] opens it and follows it', async ({ page }) => {
  await page.goto(demo('open-item'));
  await expect(page.getByText('Open: none')).toBeVisible();
  await page.getByRole('button', { name: 'Open Components' }).click();
  await expect(trigger(page, 'Components')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(page.getByText('Open: components')).toBeVisible();
  await trigger(page, 'Getting started').click();
  await expect(page.getByText('Open: getting-started')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByText('Open: none')).toBeVisible();
});

test('Align: the panel under its trigger — centred, then at its end', async ({
  page,
}) => {
  await page.goto(demo('align'));
  const components = item(page, 1);
  const content = panel(page, 1);
  await trigger(page, 'Components').click();
  await expect(content).toHaveAttribute('data-state', 'open');
  const li = (await components.boundingBox())!;
  await expect
    .poll(async () => {
      const box = (await content.boundingBox())!;
      return Math.abs(
        Math.round(box.x + box.width / 2 - (li.x + li.width / 2)),
      );
    })
    .toBe(0);
  // The shared box with it.
  await expect
    .poll(async () => {
      const box = (await viewport(page).boundingBox())!;
      return Math.abs(
        Math.round(box.x + box.width / 2 - (li.x + li.width / 2)),
      );
    })
    .toBe(0);

  await page.getByRole('button', { name: 'end', exact: true }).click();
  await trigger(page, 'Components').click();
  await expect(content).toHaveAttribute('data-state', 'open');
  await expect
    .poll(async () => {
      const box = (await content.boundingBox())!;
      return Math.abs(Math.round(box.x + box.width - (li.x + li.width)));
    })
    .toBe(0);
});

test('RTL: ← goes to the next item; the panel lines up with its trigger end', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  const start = trigger(page, 'البداية');
  await focus(start);
  await press(page, 'ArrowLeft');
  await expect(trigger(page, 'المكونات')).toBeFocused();
  await press(page, 'Enter');
  const content = panel(page, 1);
  await expect(content).toHaveAttribute('data-state', 'open');
  const li = (await item(page, 1).boundingBox())!;
  await expect
    .poll(async () => {
      const box = (await content.boundingBox())!;
      return Math.abs(Math.round(box.x + box.width - (li.x + li.width)));
    })
    .toBe(0);
});
