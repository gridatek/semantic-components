import { type Page } from '@playwright/test';
import { collectErrors, press } from '../../interaction';
import { box } from '../../looks';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/resizable/${name}-resizable-demo`;
const handle = (page: Page, name: string) =>
  page.getByRole('separator', { name });

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Usage: window splitters, named, valued by the panel before; nested', async ({
  page,
}) => {
  await page.goto('/demos/resizable/resizable-usage-demo');
  const one = handle(page, 'Resize One');
  await expect(one).toHaveAttribute('aria-valuenow', '50');
  await expect(one).toHaveAttribute('aria-orientation', 'vertical');
  await expect(one).toHaveAttribute('tabindex', '0');
  const first = page.locator('[scResizablePanel]').first();
  await expect(one).toHaveAttribute(
    'aria-controls',
    (await first.getAttribute('id')) ?? '',
  );
  const two = handle(page, 'Resize Two');
  await expect(two).toHaveAttribute('aria-valuenow', '25');
  await expect(two).toHaveAttribute('aria-orientation', 'horizontal');
});

test('Keyboard: arrows by 10%, Home and End to the limits', async ({
  page,
}) => {
  await page.goto(demo('handle'));
  const h = handle(page, 'Resize Sidebar');
  await h.focus();
  await press(page, 'ArrowRight');
  await expect(h).toHaveAttribute('aria-valuenow', '35');
  await press(page, 'ArrowLeft');
  await press(page, 'ArrowLeft');
  await expect(h).toHaveAttribute('aria-valuenow', '15');
  await press(page, 'End');
  await expect(h).toHaveAttribute('aria-valuenow', '100');
  await press(page, 'Home');
  await expect(h).toHaveAttribute('aria-valuenow', '0');
});

test('Drag: the panels beside it follow the pointer', async ({ page }) => {
  await page.goto(demo('handle'));
  const h = handle(page, 'Resize Sidebar');
  const group = await box(page.locator('[scResizablePanelGroup]'));
  const b = await box(h);
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
  await page.mouse.down();
  await page.mouse.move(b.x + group.width * 0.25, b.y + b.height / 2, {
    steps: 8,
  });
  await page.mouse.up();
  await expect
    .poll(async () => Number(await h.getAttribute('aria-valuenow')))
    .toBeGreaterThanOrEqual(48);
  const sidebar = await box(page.locator('[scResizablePanel]').first());
  expect(Math.abs(sidebar.width / group.width - 0.5)).toBeLessThan(0.03);
});

test('Vertical: stacked; the up and down arrows resize', async ({ page }) => {
  await page.goto(demo('vertical'));
  const h = handle(page, 'Resize Header');
  await expect(h).toHaveAttribute('aria-orientation', 'horizontal');
  await h.focus();
  await press(page, 'ArrowDown');
  await expect(h).toHaveAttribute('aria-valuenow', '35');
});

test('Collapsible: Enter shuts the sidebar and opens it again; dragged small, it shuts', async ({
  page,
}) => {
  await page.goto(demo('collapsible'));
  const h = handle(page, 'Resize Sidebar');
  const sidebar = page.locator('[scResizablePanel]').first();
  await h.focus();
  await press(page, 'Enter');
  await expect(h).toHaveAttribute('aria-valuenow', '0');
  await expect(sidebar).toHaveAttribute('data-collapsed', '');
  await press(page, 'Enter');
  await expect(h).toHaveAttribute('aria-valuenow', '30');
  await expect(sidebar).not.toHaveAttribute('data-collapsed');
  // Within its limits: no further than its minimum (20)…
  await press(page, 'ArrowLeft');
  await expect(h).toHaveAttribute('aria-valuenow', '20');
  // …and below half of it, shut.
  const group = await box(page.locator('[scResizablePanelGroup]'));
  const b = await box(h);
  await page.mouse.move(b.x, b.y + b.height / 2);
  await page.mouse.down();
  await page.mouse.move(b.x - group.width * 0.15, b.y + b.height / 2, {
    steps: 6,
  });
  await page.mouse.up();
  await expect(h).toHaveAttribute('aria-valuenow', '0');
});

test('Remembered layout: read again after a reload', async ({ page }) => {
  await page.goto(demo('remembered'));
  await page.evaluate(() => localStorage.removeItem('resizable-demo-layout'));
  await page.reload();
  const h = handle(page, 'Resize One');
  await expect(h).toHaveAttribute('aria-valuenow', '33');
  await h.focus();
  await press(page, 'ArrowRight');
  await expect(h).toHaveAttribute('aria-valuenow', '43');
  await page.reload();
  await expect(handle(page, 'Resize One')).toHaveAttribute(
    'aria-valuenow',
    '43',
  );
});

test('RTL: the first panel at the right; ← grows it', async ({ page }) => {
  await page.goto(demo('rtl'));
  const h = handle(page, 'Resize واحد');
  const [first, group] = [
    await box(page.locator('[scResizablePanel]').first()),
    await box(page.locator('[scResizablePanelGroup]').first()),
  ];
  expect(Math.round(first.x + first.width)).toBe(
    Math.round(group.x + group.width),
  );
  await h.focus();
  await press(page, 'ArrowLeft');
  await expect(h).toHaveAttribute('aria-valuenow', '60');
});
