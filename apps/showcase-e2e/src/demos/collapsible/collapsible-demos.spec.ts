import { collectErrors, press } from '../../interaction';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/collapsible/${name}-collapsible-demo`;

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: the trigger opens and closes its panel (aria-expanded, aria-controls)', async ({
  page,
}) => {
  await page.goto('/demos/collapsible/collapsible-usage-demo');
  const trigger = page.getByRole('button', { name: 'Toggle details' });
  const details = page.getByText('Shipping address');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(details).toBeHidden();
  // aria-controls names its panel.
  const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`);
  await expect(panel).toContainText('Shipping address');

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(details).toBeVisible();

  await trigger.focus();
  await press(page, 'Enter');
  await expect(details).toBeHidden();
});

test('Basic: Space toggles it', async ({ page }) => {
  await page.goto(demo('basic'));
  const trigger = page.getByRole('button', { name: 'Product details' });
  await trigger.focus();
  await press(page, ' ');
  await expect(page.getByRole('button', { name: 'Learn More' })).toBeVisible();
});

test('File tree: a folder in a folder opens on its own', async ({ page }) => {
  await page.goto(demo('file-tree'));
  await page.getByRole('button', { name: 'components' }).click();
  await expect(page.getByRole('button', { name: 'ui' })).toBeVisible();
  await expect(page.getByText('button.tsx')).toBeHidden();
  await page.getByRole('button', { name: 'ui' }).click();
  await expect(page.getByText('button.tsx')).toBeVisible();
});

test('Hidden until found: closed, hidden="until-found"; a find match opens it', async ({
  page,
}) => {
  await page.goto(demo('hidden-until-found'));
  const trigger = page.getByRole('button', { name: 'Shipping details' });
  const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`);
  await expect(panel).toHaveAttribute('hidden', 'until-found');
  // What find-in-page does on a match inside it.
  await panel.evaluate((el) => el.dispatchEvent(new Event('beforematch')));
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).not.toHaveAttribute('hidden');
});

test('Disabled: its trigger does nothing', async ({ page }) => {
  await page.goto(demo('disabled'));
  await expect(
    page.getByRole('button', { name: 'Archived notes' }),
  ).toBeDisabled();
});

test('Open by default: shown, then closed by its trigger', async ({ page }) => {
  await page.goto(demo('open'));
  await expect(page.getByText('Version 2 adds dark mode')).toBeVisible();
  await page.getByRole('button', { name: 'Release notes' }).click();
  await expect(page.getByText('Open: false')).toBeVisible();
});

test('Trigger elsewhere: a button outside the collapsible opens and closes the one it names', async ({
  page,
}) => {
  await page.goto(demo('trigger-elsewhere'));
  const trigger = page.getByRole('button', { name: 'Filters' });
  const panel = page.locator('[scCollapsiblePanel]');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toBeVisible();
  await expect(panel).toContainText('Status: any');
  // Wired to its panel, though not inside its collapsible.
  await expect(trigger).toHaveAttribute(
    'aria-controls',
    (await panel.getAttribute('id')) ?? '',
  );
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('Closing: the panel shrinks to nothing and stays there — no flash of its full height before it hides', async ({
  page,
}) => {
  await page.goto('/demos/collapsible/collapsible-usage-demo');
  const trigger = page.getByRole('button', { name: 'Toggle details' });
  await trigger.click();
  const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`);
  await expect(panel).toBeVisible();
  // Settled open, then every frame of its close.
  await expect
    .poll(() => panel.evaluate((el) => el.getAnimations().length))
    .toBe(0);
  await panel.evaluate((el) => {
    const w = window as unknown as { heights: number[] };
    w.heights = [];
    const start = performance.now();
    const tick = () => {
      w.heights.push(el.getBoundingClientRect().height);
      if (performance.now() - start < 600) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  await trigger.click();
  await expect(panel).toBeHidden();
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(650);
  const heights = await page.evaluate(
    () => (window as unknown as { heights: number[] }).heights,
  );
  // Never taller than the frame before.
  for (let i = 1; i < heights.length; i++)
    expect(heights[i], `frame ${i}: ${heights.join(', ')}`).toBeLessThanOrEqual(
      heights[i - 1] + 0.5,
    );
});

test('Open, at rest: the panel clips nothing (its content’s rings and shadows show); only its animation clips', async ({
  page,
}) => {
  await page.goto('/demos/collapsible/collapsible-usage-demo');
  const trigger = page.getByRole('button', { name: 'Toggle details' });
  await trigger.click();
  const panel = page.locator(`#${await trigger.getAttribute('aria-controls')}`);
  await expect(panel).toHaveCSS('overflow', 'hidden');
  await expect(panel).toHaveCSS('overflow', 'visible');
  await trigger.click();
  await expect(panel).toHaveCSS('overflow', 'hidden');
});

test('RTL on a phone: shrunk to the width it has, as the Usage demo', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto(demo('rtl'));
  const collapsible = page.locator('[scCollapsible]');
  await expect(collapsible).toBeVisible();
  // The demo's route: the screen less its 16px gutter a side.
  const box = await collapsible.boundingBox();
  expect(box?.x).toBeGreaterThanOrEqual(16 - 0.5);
  expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(360 - 16 + 0.5);
});
