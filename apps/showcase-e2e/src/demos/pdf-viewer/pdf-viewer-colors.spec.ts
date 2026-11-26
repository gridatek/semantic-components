import type { Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { expect, test } from '../../test';

/** A #RRGGBB colour's luminance (0–255). */
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** The first page's background, as drawn on its canvas: #RRGGBB. */
function pageBackground(page: Page): Promise<string> {
  return page.evaluate(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('.page canvas');
    const pixel = canvas?.getContext('2d')?.getImageData(2, 2, 1, 1).data;
    if (!pixel) return '';
    return (
      '#' +
      Array.from(pixel.slice(0, 3))
        .map((c) => c.toString(16).padStart(2, '0'))
        .join('')
    );
  });
}

// The highlight colours are the theme's variables: the :root value is the
// one saved into the PDF, whatever the mode; the .dark value only shows, on
// dark pages (reading colours in dark mode).
test.describe('PDF Viewer colours', () => {
  test('dark pages show the dark highlight, the file keeps the light one', async ({
    page,
  }) => {
    await page.goto('/demos/pdf-viewer/pdf-viewer-demo');
    test.skip(
      !(await canRecolour(page)),
      'No canvas filter (WebKit): pages are not recoloured — the next test',
    );
    const text = page.locator('.textLayer span').filter({ hasText: /\w{4,}/ });
    // The first load fetches pdf.js's worker.
    await expect(text.first()).toBeVisible({ timeout: 20_000 });

    // The app's dark mode, as ScPresetManager sets it.
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    });
    await page.getByRole('button', { name: 'View options' }).click();
    await page.getByRole('switch', { name: 'Reading colours' }).check();
    await page.keyboard.press('Escape');
    // The pages are drawn again, dark.
    await expect
      .poll(async () => luminance((await pageBackground(page)) || '#ffffff'), {
        timeout: 20_000,
      })
      .toBeLessThan(128);

    const tool = page
      .getByRole('group', { name: 'Annotation tool' })
      .getByRole('button', { name: 'Highlight' });
    await tool.click();
    await expect(tool).toHaveAttribute('aria-pressed', 'true');

    // Select a word: pdf.js highlights the selection (once its editors are
    // ready — the selection again until it does).
    const highlight = page.locator('svg.highlight').first();
    await expect(async () => {
      await expect(text.first()).toBeVisible();
      const box = await text.first().boundingBox();
      if (!box) throw new Error('no text');
      await page.mouse.move(box.x + 1, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width - 1, box.y + box.height / 2, {
        steps: 8,
      });
      await page.mouse.up();
      await expect(highlight).toBeAttached({ timeout: 2_000 });
    }).toPass({ timeout: 20_000 });

    // Shown: the .dark yellow, dark on the dark page.
    await expect
      .poll(async () => (await highlight.getAttribute('fill')) ?? '')
      .toMatch(/^#[0-9A-F]{6}$/i);
    const shown = (await highlight.getAttribute('fill')) ?? '';
    expect(luminance(shown)).toBeLessThan(128);

    // Saved: the :root yellow (#FFFF98: 1 1 0.596), as on paper.
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Download' }).click(),
    ]);
    const saved = readFileSync(await download.path()).toString('latin1');
    const color =
      /\/Subtype \/Highlight[^]*?\/C \[([\d.]+) ([\d.]+) ([\d.]+)\]/.exec(
        saved,
      );
    expect(color).not.toBeNull();
    const [r, g, b] = (color ?? []).slice(1).map(Number);
    expect(r).toBeCloseTo(1, 1);
    expect(g).toBeCloseTo(1, 1);
    expect(b).toBeCloseTo(152 / 255, 1);
  });

  test('where pages cannot be recoloured (WebKit: no canvas filter), Reading colours is off and says why', async ({
    page,
  }) => {
    await page.goto('/demos/pdf-viewer/pdf-viewer-demo');
    test.skip(await canRecolour(page), 'The browser recolours pages');
    await page.getByRole('button', { name: 'View options' }).click();
    const colours = page.getByRole('switch', { name: 'Reading colours' });
    await expect(colours).toBeDisabled();
    await expect(colours).toHaveAccessibleDescription(
      'Not available in this browser.',
    );
  });
});

/** The browser draws a canvas through a filter, as pdf.js recolours pages. */
function canRecolour(page: Page): Promise<boolean> {
  return page.evaluate(() => 'filter' in CanvasRenderingContext2D.prototype);
}
