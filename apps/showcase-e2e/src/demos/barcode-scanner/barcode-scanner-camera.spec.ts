import { resolve } from 'node:path';
import { expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/barcode-scanner/${name}-barcode-scanner-demo`;

test.use({
  permissions: ['camera'],
  launchOptions: {
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      `--use-file-for-fake-video-capture=${resolve(__dirname, '../../../fixtures/qr-camera.y4m')}`,
    ],
  },
});

test.describe('The camera (Chromium: a video file as the camera)', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only');

  test('reads, and outlines the code', async ({ page }) => {
    await page.goto(demo('camera'));
    const scanner = page.locator('[data-slot="barcode-scanner"]');
    await expect(scanner).toHaveAttribute('data-state', 'idle');
    const toggle = page.getByRole('button', { name: 'Scan' });
    await toggle.click();
    await expect(scanner).toHaveAttribute('data-state', 'scanning');
    await expect(
      page.getByText('Read: https://semantic-components.dev'),
    ).toBeVisible();
    await expect(
      page.locator('[data-slot="barcode-scanner-overlay"] polygon'),
    ).toHaveCount(1);
    await page.getByRole('button', { name: 'Stop' }).click();
    await expect(scanner).toHaveAttribute('data-state', 'idle');
  });

  test('scan once: the field filled, the camera off', async ({ page }) => {
    await page.goto(demo('once'));
    await page.getByRole('button', { name: 'Scan' }).click();
    await expect(page.getByLabel('Product code')).toHaveValue(
      'https://semantic-components.dev',
    );
    await expect(page.locator('video')).toHaveCount(0);
  });

  test('formats: products only, the QR code is not read', async ({ page }) => {
    await page.goto(demo('formats'));
    await page.getByRole('radio', { name: 'Products' }).check();
    await page.getByRole('button', { name: 'Scan' }).click();
    await expect(page.locator('[data-slot="barcode-scanner"]')).toHaveAttribute(
      'data-state',
      'scanning',
    );
    // A second of frames read, none of them the QR code.
    await expect
      .poll(() =>
        page.locator('video').evaluate((v: HTMLVideoElement) => v.currentTime),
      )
      .toBeGreaterThan(1);
    await expect(page.getByText('Nothing read yet.')).toBeVisible();
    await page.getByRole('radio', { name: 'QR codes' }).check();
    await expect(
      page.getByText('qr_code: https://semantic-components.dev'),
    ).toBeVisible();
  });

  test('controls: no light, one camera', async ({ page }) => {
    await page.goto(demo('controls'));
    await page.getByRole('button', { name: 'Scan' }).click();
    await expect(page.getByText('State: scanning')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Light' })).toBeDisabled();
    await expect(
      page.getByRole('button', { name: 'Switch camera' }),
    ).toBeDisabled();
  });
});
