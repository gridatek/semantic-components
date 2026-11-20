import { readFile } from 'node:fs/promises';
import { type Locator, type Page, expect, test } from '../../test';

const code = (page: Page, name: string | RegExp) =>
  page.getByRole('img', { name });
/** How many modules wide, from its viewBox ("0 0 n n"). */
const modules = async (target: Locator) =>
  Number((await target.getAttribute('viewBox'))?.split(' ')[2]);

test('Usage: a named image, one path, square', async ({ page }) => {
  await page.goto('/demos/qr-code-next/qr-code-next-usage-demo');
  const qr = code(page, 'QR code for angular.dev');
  await expect(qr).toBeVisible();
  await expect(qr.locator('path')).toHaveCount(1);
  await expect(qr).toHaveAttribute('viewBox', /^0 0 (\d+) \1$/);
  await expect(page.getByRole('link', { name: 'angular.dev' })).toBeVisible();
});

test('Usage: dark on white in dark mode too', async ({ page }) => {
  await page.goto('/demos/qr-code-next/qr-code-next-usage-demo');
  const qr = code(page, 'QR code for angular.dev');
  await expect(qr).toBeVisible();
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await expect
    .poll(() =>
      qr.evaluate((e) => {
        const style = getComputedStyle(e);
        return [style.backgroundColor, style.color];
      }),
    )
    .toEqual(['rgb(255, 255, 255)', 'rgb(0, 0, 0)']);
});

test('Error correction: H is denser than L', async ({ page }) => {
  await page.goto('/demos/qr-code-next/error-correction-qr-code-next-demo');
  const low = code(page, /L — 7 %/);
  const high = code(page, /H — 30 %/);
  await expect(high).toHaveAttribute('viewBox', /^0 0/);
  expect(await modules(high)).toBeGreaterThan(await modules(low));
});

test('Margin: the quiet zone, in modules on each side', async ({ page }) => {
  await page.goto('/demos/qr-code-next/margin-qr-code-next-demo');
  const none = code(page, /margin 0/);
  const four = code(page, /margin 4/);
  await expect(four).toHaveAttribute('viewBox', /^0 0/);
  expect((await modules(four)) - (await modules(none))).toBe(8);
});

test('Live: drawn as you type; too long, an alert and no code', async ({
  page,
}) => {
  await page.goto('/demos/qr-code-next/live-qr-code-next-demo');
  const qr = code(page, 'QR code for the text below');
  await expect(qr).toBeVisible();
  const before = await qr.locator('path').getAttribute('d');
  await page.getByRole('textbox', { name: 'Text or link' }).fill('hello');
  await expect(qr.locator('path')).not.toHaveAttribute('d', before ?? '');

  await page.getByRole('button', { name: 'Too long' }).click();
  await expect(page.getByRole('alert')).toHaveText(
    'Too long to fit in a QR code.',
  );
  await expect(qr).toBeHidden();
  await page.getByRole('button', { name: 'Link' }).click();
  await expect(qr).toBeVisible();
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('Download: a PNG and an SVG, black on white, at the size asked', async ({
  page,
}) => {
  await page.goto('/demos/qr-code-next/download-qr-code-next-demo');
  await expect(code(page, 'QR code for angular.dev')).toBeVisible();

  const png = page.waitForEvent('download');
  await page.getByRole('button', { name: 'PNG' }).click();
  expect((await png).suggestedFilename()).toBe('qr-code.png');

  const svgDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'SVG' }).click();
  const svg = await svgDownload;
  expect(svg.suggestedFilename()).toBe('qr-code.svg');
  const text = await readFile(await svg.path(), 'utf8');
  expect(text).toMatch(/^<svg [^>]*width="(\d+)" height="\1"/);
  expect(Number(/width="(\d+)"/.exec(text)?.[1])).toBeLessThanOrEqual(512);
  expect(text).toContain('fill="#ffffff"');
  expect(text).toContain('fill="#000000"');
});

test('Use cases: each scheme, named', async ({ page }) => {
  await page.goto('/demos/qr-code-next/use-cases-qr-code-next-demo');
  for (const name of ['Website', 'Phone', 'Email', 'Wi-Fi']) {
    await expect(code(page, `QR code: ${name}`)).toBeVisible();
  }
});

test('RTL: named in Arabic, never mirrored', async ({ page }) => {
  await page.goto('/demos/qr-code-next/rtl-qr-code-next-demo');
  const qr = code(page, 'رمز QR لموقع angular.dev');
  await expect(qr).toBeVisible();
  await expect
    .poll(() => qr.evaluate((e) => getComputedStyle(e).transform))
    .toBe('none');
});
