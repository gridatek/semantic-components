import { collectErrors, press } from '../../interaction';
import { expectInlineOrder, expectRtl } from '../../rtl';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/trace/${name}-trace-demo`;
const lines = (page: Page) => page.locator('[data-slot=trace-line]');

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Group: lines as text, not tab stops; icons hidden', async ({ page }) => {
  await page.goto(demo('group'));
  await expect(lines(page)).toHaveText([
    'Searched for minimumReleaseAge',
    'Read pnpm-workspace.yaml',
    'Ran pnpm install',
  ]);
  await expect(page.locator('[data-slot=trace-icon]').first()).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  await page.keyboard.press('Tab');
  await expect(lines(page).first()).not.toBeFocused();
});

test('Status: on the line; the running title shimmers', async ({ page }) => {
  await page.goto(demo('status'));
  await expect(lines(page).nth(1)).toHaveAttribute('data-status', 'error');
  await expect(lines(page).nth(2)).toHaveAttribute('data-status', 'running');
  await expect(lines(page).nth(3)).toHaveAttribute('data-status', 'pending');
  await expect(lines(page).first()).not.toHaveAttribute('data-status');
  await expect(lines(page).nth(2).locator('[data-slot=trace-title]')).toHaveCSS(
    'animation-name',
    /.+/,
  );
});

test('Description: after the title', async ({ page }) => {
  await page.goto(demo('description'));
  await expect(page.locator('[data-slot=trace-description]')).toHaveText([
    '12 results',
    'src/app/app.config.ts',
    '1.2 s',
  ]);
});

test('Collapsible: a button that opens its output, by keyboard too', async ({
  page,
}) => {
  await page.goto(demo('collapsible'));
  const version = page.getByRole('button', { name: 'Ran node --version' });
  const search = page.getByRole('button', {
    name: 'Searched for provideRouter',
  });
  await expect(version).toHaveAttribute('aria-expanded', 'false');
  await expect(search).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('src/main.ts')).toBeVisible();
  await version.focus();
  await press(page, 'Enter');
  await expect(version).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('v24.18.0')).toBeVisible();
  await press(page, 'Space');
  await expect(version).toHaveAttribute('aria-expanded', 'false');
});

test('Link: the line as a link, named with its new tab', async ({ page }) => {
  await page.goto(demo('link'));
  const link = page.getByRole('link', {
    name: 'Read angular.dev (opens in a new tab)',
  });
  await expect(link).toHaveAttribute('href', 'https://angular.dev');
  await link.focus();
  await expect(link).toBeFocused();
});

test('RTL: mirrored; the chevron points to the start when closed', async ({
  page,
}) => {
  await page.goto(demo('rtl'));
  await expectRtl(page.locator('[data-slot=trace]'));
  const first = lines(page).first();
  await expectInlineOrder([
    first.locator('[data-slot=trace-icon]'),
    first.locator('[data-slot=trace-title]'),
  ]);
  const chevron = page.locator('[data-slot=trace-collapsible-icon]');
  await expect(chevron).toHaveCSS('scale', '-1 1');
  await page.locator('[data-slot=trace-collapsible-trigger]').click();
  await expect(chevron).toHaveCSS('rotate', '90deg');
});

test('Usage: a turn of steps; a collapsible one opens on its output', async ({
  page,
}) => {
  await page.goto('/demos/trace/trace-usage-demo');
  const build = page.getByRole('button', { name: 'Ran pnpm build' });
  await expect(build).toHaveAttribute('aria-expanded', 'false');
  await build.click();
  await expect(build).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText('Built in 41s')).toBeVisible();
});

test('Open state: one open at first; another opened by the page', async ({
  page,
}) => {
  await page.goto(demo('open'));
  await expect(
    page.getByRole('button', { name: 'Ran node --version' }),
  ).toHaveAttribute('aria-expanded', 'true');
  const pnpm = page.getByRole('button', { name: 'Ran pnpm --version' });
  await expect(pnpm).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Show the pnpm output' }).click();
  await expect(pnpm).toHaveAttribute('aria-expanded', 'true');
  // Closed by its own click: the page's button follows.
  await pnpm.click();
  await expect(
    page.getByRole('button', { name: 'Show the pnpm output' }),
  ).toBeVisible();
});

test('Dialog and Sheet: a line in their trigger opens them', async ({
  page,
}) => {
  await page.goto(demo('dialog'));
  await page
    .getByRole('button', { name: 'Searched the web for cache keys' })
    .click();
  const dialog = page.getByRole('dialog', {
    name: 'Searched the web for cache keys',
  });
  await expect(
    dialog.getByRole('link', { name: 'Signals guide (opens in a new tab)' }),
  ).toBeVisible();

  await page.goto(demo('sheet'));
  await page.getByRole('button', { name: 'Explored 4 files' }).click();
  await expect(
    page.getByRole('dialog', { name: 'Explored 4 files' }),
  ).toBeVisible();
});

test('Sources and Chain of thought: rows inside a row', async ({ page }) => {
  await page.goto(demo('sources'));
  await expect(page.getByRole('link')).toHaveCount(3);

  await page.goto(demo('chain-of-thought'));
  await expect(lines(page).first()).toHaveAttribute('data-status', 'running');
  await expect(
    page.getByRole('button', { name: 'Searching for the cache key' }),
  ).toBeVisible();
});

test('Commit: each file opens its diff in a sheet', async ({ page }) => {
  await page.goto(demo('commit'));
  await page
    .getByRole('button', { name: /Added lib\/auth\/redirect\.ts/ })
    .click();
  const sheet = page.getByRole('dialog', { name: 'lib/auth/redirect.ts' });
  await expect(sheet).toContainText('safeRedirect');
});

test('Whole turn: the failed command marked at each level', async ({
  page,
}) => {
  await page.goto(demo('turn'));
  await expect(
    page.locator('[data-slot=trace-line][data-status=error]'),
  ).toHaveText([
    'Worked for 2m 4s, 1 command failed',
    'Ran 2 commands, 1 failed',
    'Failed to run pnpm --version',
  ]);
});

test('Reasoning: Thinking while it streams, open; Thought when done, closed', async ({
  page,
}) => {
  await page.goto(demo('reasoning'));
  await page.getByRole('button', { name: 'Replay' }).click();
  const thinking = page.getByRole('button', { name: 'Thinking' });
  await expect(thinking).toHaveAttribute('aria-expanded', 'true');
  const thought = page.getByRole('button', { name: 'Thought' });
  await expect(thought).toHaveAttribute('aria-expanded', 'false', {
    timeout: 10_000,
  });
});

test('Tool: Running, then Ran with its output or Failed to run', async ({
  page,
}) => {
  await page.goto(demo('tool'));
  await page.getByRole('button', { name: 'Replay' }).click();
  await expect(lines(page).first()).toHaveText('Running node --version');
  await expect(lines(page).first()).toHaveAttribute('data-status', 'running');
  await expect(
    page.getByRole('button', { name: 'Failed to run pnpm --version' }),
  ).toBeVisible({ timeout: 10_000 });
  await expect(
    page.getByRole('button', { name: 'Ran node --version' }),
  ).toBeVisible();
});
