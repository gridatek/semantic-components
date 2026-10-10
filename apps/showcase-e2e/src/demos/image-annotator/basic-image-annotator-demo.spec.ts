import { type Locator, type Page, expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

/** Bounding box of a visible element (fails the test if it has none). */
async function boxOf(locator: Locator) {
  const b = await locator.boundingBox();
  if (!b) throw new Error('element has no bounding box');
  return b;
}

const URL = '/demos/image-annotator/basic-image-annotator-demo';

async function ready(page: Page): Promise<Locator> {
  await page.goto(URL);
  const canvas = page.locator('[scImageAnnotatorCanvas]');
  await expect(canvas).toHaveAttribute('data-state', 'ready');
  return canvas;
}

async function stroke(
  page: Page,
  canvas: Locator,
  from: number[],
  to: number[],
) {
  const box = await boxOf(canvas);
  await page.mouse.move(box.x + from[0], box.y + from[1]);
  await page.mouse.down();
  await page.mouse.move(box.x + to[0], box.y + to[1], { steps: 6 });
  await page.mouse.up();
}

/** Alpha of the annotation layer at a CSS position inside the canvas. */
function alphaAt(canvas: Locator, x: number, y: number): Promise<number> {
  return canvas
    .locator('canvas')
    .nth(1)
    .evaluate(
      (c: HTMLCanvasElement, [px, py]) => {
        const r = c.width / c.getBoundingClientRect().width;
        return (c.getContext('2d') as CanvasRenderingContext2D).getImageData(
          Math.round(px * r),
          Math.round(py * r),
          1,
          1,
        ).data[3];
      },
      [x, y],
    );
}

test.describe('Basic Image Annotator Demo', () => {
  let errors: string[];

  test.beforeEach(({ page }) => {
    errors = collectErrors(page);
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('layout: count below the card, nothing clipped', async ({ page }) => {
    const canvas = await ready(page);
    const card = page.locator('[scImageAnnotator]');
    const cardBox = await boxOf(card);
    const countBox = await boxOf(
      page.locator('p', { hasText: 'Annotations:' }),
    );
    expect(countBox.y).toBeGreaterThanOrEqual(cardBox.y + cardBox.height - 1);

    const canvasBox = await boxOf(canvas);
    expect(
      Math.abs(canvasBox.width / canvasBox.height - 700 / 450),
    ).toBeLessThan(0.01);
    for (const name of ['Undo', 'Redo', 'Clear all', 'Download']) {
      const b = await boxOf(card.getByRole('button', { name }));
      expect(b.x + b.width).toBeLessThanOrEqual(cardBox.x + cardBox.width);
    }
  });

  test('toolbar: one tab stop, arrows, named controls', async ({ page }) => {
    await ready(page);
    const toolbar = page.getByRole('toolbar', { name: 'Annotation tools' });
    await expect(toolbar).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Red', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('slider', { name: 'Line width' }),
    ).toBeVisible();

    await press(page, 'Tab');
    await expect(page.getByRole('button', { name: 'Pen' })).toBeFocused();
    await press(page, 'ArrowRight');
    await expect(page.getByRole('button', { name: 'Line' })).toBeFocused();
    await press(page, 'Enter');
    await expect(page.getByRole('button', { name: 'Line' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    // the slider is its own tab stop and keeps its arrow keys
    const slider = page.getByRole('slider', { name: 'Line width' });
    await slider.focus();
    await press(page, 'ArrowRight');
    await expect(slider).toBeFocused();
    await expect(slider).toHaveValue('4');
  });

  test('draw, dot, erase with undo/redo, clear', async ({ page }) => {
    const canvas = await ready(page);
    const count = page.locator('p', { hasText: 'Annotations:' });

    await stroke(page, canvas, [60, 60], [200, 140]);
    await expect(count).toHaveText('Annotations: 1');

    // a single click with the pen draws a dot
    const box = await boxOf(canvas);
    await page.mouse.click(box.x + 300, box.y + 250);
    await expect(count).toHaveText('Annotations: 2');
    expect(await alphaAt(canvas, 300, 250)).toBeGreaterThan(0);

    // erasing updates the count and can be undone / redone
    await page.getByRole('button', { name: 'Eraser' }).click();
    await stroke(page, canvas, [60, 60], [62, 61]);
    await expect(count).toHaveText('Annotations: 1');
    await page.getByRole('button', { name: 'Undo' }).click();
    await expect(count).toHaveText('Annotations: 2');
    await page.getByRole('button', { name: 'Redo' }).click();
    await expect(count).toHaveText('Annotations: 1');

    await page.getByRole('button', { name: 'Clear all' }).click();
    await expect(count).toHaveText('Annotations: 0');
    await expect(
      page.getByRole('button', { name: 'Clear all' }),
    ).toHaveAttribute('aria-disabled', 'true');
    await page.getByRole('button', { name: 'Undo' }).click();
    await expect(count).toHaveText('Annotations: 1');
  });
});

test.describe('Basic Image Annotator Demo — devices', () => {
  test('touch draws', async ({ browser }) => {
    const context = await browser.newContext({
      hasTouch: true,
      viewport: { width: 900, height: 900 },
    });
    const page = await context.newPage();
    const canvas = await ready(page);
    const box = await boxOf(canvas);
    const cdp = await context.newCDPSession(page);
    const at = (x: number, y: number) => [{ x: box.x + x, y: box.y + y }];
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: at(50, 50),
    });
    for (let i = 1; i <= 6; i++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: at(50 + i * 20, 50 + i * 10),
      });
    }
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });
    await expect(page.locator('p', { hasText: 'Annotations:' })).toHaveText(
      'Annotations: 1',
    );
    await context.close();
  });

  test('responsive and sharp on a phone', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 800 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    const canvas = await ready(page);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    const box = await boxOf(canvas);
    expect(box.width).toBeLessThanOrEqual(390);
    expect(Math.abs(box.width / box.height - 700 / 450)).toBeLessThan(0.01);
    // backing store at the device pixel ratio
    const backing = await canvas
      .locator('canvas')
      .nth(1)
      .evaluate((c: HTMLCanvasElement) => c.width);
    expect(Math.abs(backing - box.width * 2)).toBeLessThanOrEqual(2);
    // drawing still lands where the pointer is
    await stroke(
      page,
      canvas,
      [box.width / 2 - 20, box.height / 2],
      [box.width / 2 + 20, box.height / 2],
    );
    expect(
      await alphaAt(canvas, box.width / 2, box.height / 2),
    ).toBeGreaterThan(0);
    await context.close();
  });
});
