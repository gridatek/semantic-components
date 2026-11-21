import { resolve } from 'node:path';
import { expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/barcode-scanner/${name}-barcode-scanner-demo`;

test.describe('From a picture (every browser)', () => {
  test('the samples, read', async ({ page }) => {
    await page.goto(demo('picture'));
    const results = page.locator('[aria-live]');
    await page.getByRole('button', { name: 'A product label' }).click();
    await expect(results).toContainText('ean_13 4006381333931');
    await page.getByRole('button', { name: 'A QR code' }).click();
    await expect(results).toContainText(
      'qr_code https://semantic-components.dev',
    );
  });

  test('a file of yours', async ({ page }) => {
    await page.goto(demo('picture'));
    await page
      .getByLabel('A picture of a code')
      .setInputFiles(
        resolve(__dirname, '../../../../showcase/public/images/barcode-qr.png'),
      );
    await expect(page.locator('[aria-live]')).toContainText(
      'https://semantic-components.dev',
    );
  });

  test("the browser's own BarcodeDetector, where there is one: barcode-detector's decoder never loaded", async ({
    page,
  }) => {
    // A browser with its own (it answers "native").
    await page.addInitScript(
      'globalThis.BarcodeDetector = class { detect() { return Promise.resolve([{ rawValue: "native", format: "qr_code", cornerPoints: [] }]); } };',
    );
    const decoder: string[] = [];
    page.on('request', (request) => {
      if (request.url().includes('zxing')) decoder.push(request.url());
    });
    await page.goto(demo('picture'));
    await page.getByRole('button', { name: 'A QR code' }).click();
    await expect(page.locator('[aria-live]')).toContainText('qr_code native');
    expect(decoder).toEqual([]);
  });
});

const usage = '/demos/barcode-scanner/barcode-scanner-usage-demo';

test.describe('The camera, not to be had (every browser)', () => {
  /** The camera's answer, whatever the browser: refused, or none. */
  const answer = (name: string) =>
    `Object.defineProperty(navigator, "mediaDevices", { value: { getUserMedia: () => Promise.reject(new DOMException("", "${name}")), enumerateDevices: async () => [] } });`;

  test('refused: says so', async ({ page }) => {
    await page.addInitScript(answer('NotAllowedError'));
    await page.goto(usage);
    await page.getByRole('button', { name: 'Scan' }).click();
    await expect(page.locator('[data-slot="barcode-scanner"]')).toHaveAttribute(
      'data-state',
      'denied',
    );
    await expect(page.getByText('The camera was refused')).toBeVisible();
    // Off again: Scan, to try again.
    await expect(page.getByRole('button', { name: 'Scan' })).toBeVisible();
  });

  test('no camera: says so', async ({ page }) => {
    await page.addInitScript(answer('NotFoundError'));
    await page.goto(usage);
    await page.getByRole('button', { name: 'Scan' }).click();
    await expect(page.getByText('No camera to use')).toBeVisible();
  });
});
