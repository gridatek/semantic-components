import { collectErrors, focus, press } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/navigation-menu/${name}-navigation-menu-demo`;
const trigger = (page: Page, name: string) =>
  page.getByRole('button', { name, exact: true });
const panel = (page: Page, index: number) =>
  page.locator('[data-slot=navigation-menu-content]').nth(index);
const viewport = (page: Page) =>
  page.locator('[data-slot=navigation-menu-viewport]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: a disclosure — aria-expanded, aria-controls; panels closed and hidden', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
  await expect(page.getByRole('menu')).toHaveCount(0);
  const start = trigger(page, 'Getting started');
  await expect(start).toHaveAttribute('aria-expanded', 'false');
  const id = await start.getAttribute('aria-controls');
  await expect(panel(page, 0)).toHaveAttribute('id', id!);
  await expect(panel(page, 0)).toHaveCSS('visibility', 'hidden');
  await expect(page.getByRole('link', { name: /Introduction/ })).toBeHidden();
});

test('Basic: hover opens, moving to another item switches, leaving closes', async ({
  page,
}) => {
  await page.goto(demo('basic'));
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
  await page.mouse.move(5, 400);
  await expect(trigger(page, 'Components')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('Basic: a click opens (and a hover-opened panel stays on click); a second click closes', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const components = trigger(page, 'Components');
  await components.click();
  await expect(components).toHaveAttribute('aria-expanded', 'true');
  await components.click();
  await expect(components).toHaveAttribute('aria-expanded', 'false');
});

test('Basic: the keyboard — Enter, Tab into the panel, Escape, arrows, Home/End', async ({
  page,
  browserName,
}) => {
  await page.goto(demo('basic'));
  const start = trigger(page, 'Getting started');
  await focus(start);
  await press(page, 'Enter');
  await expect(start).toHaveAttribute('aria-expanded', 'true');
  // Tab follows the page: into the open panel. WebKit, as Safari by default,
  // doesn't tab to links: there, ↓ goes in.
  await press(page, browserName === 'webkit' ? 'ArrowDown' : 'Tab');
  await expect(
    page.getByRole('link', { name: /Semantic Components/ }),
  ).toBeFocused();
  await press(page, 'ArrowDown');
  await expect(page.getByRole('link', { name: /Introduction/ })).toBeFocused();
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

test('Basic: the focus leaving the item, or a click outside, closes it', async ({
  page,
}) => {
  await page.goto(demo('basic'));
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
  await page.mouse.click(5, 400);
  await expect(trigger(page, 'Components')).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

test('Basic: a link marks its page (aria-current) and closes the menu', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const docs = page.getByRole('link', { name: 'Docs' });
  await docs.click();
  await expect(docs).toHaveAttribute('aria-current', 'page');

  await trigger(page, 'Components').click();
  await page.getByRole('link', { name: /Tooltip/ }).click();
  await expect(trigger(page, 'Components')).toHaveAttribute(
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
  await page.goto(demo('controlled'));
  await expect(page.getByText('value: null')).toBeVisible();
  await page.getByRole('button', { name: 'Open Components' }).click();
  await expect(trigger(page, 'Components')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(page.getByText('value: components')).toBeVisible();
  await trigger(page, 'Getting started').click();
  await expect(page.getByText('value: getting-started')).toBeVisible();
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
  const item = page.locator('[data-slot=navigation-menu-item]').nth(1);
  const content = panel(page, 1);
  await expect(content).toHaveAttribute('data-state', 'open');
  const itemBox = (await item.boundingBox())!;
  await expect
    .poll(async () => {
      const box = (await content.boundingBox())!;
      return Math.abs(
        Math.round(box.x + box.width - (itemBox.x + itemBox.width)),
      );
    })
    .toBe(0);
});
