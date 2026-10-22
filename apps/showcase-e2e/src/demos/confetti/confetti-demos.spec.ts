import { type Page, expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

const demo = (name: string) => `/demos/confetti/${name}-confetti-demo`;
const canvas = (page: Page) => page.locator('canvas[data-slot="confetti"]');

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Coloured pixels in each area of the screen, as seen — from a screenshot.
 * `pink`: count only pink ones (red, some blue, little green).
 */
async function colored(
  page: Page,
  areas: Area[],
  pink = false,
): Promise<number[]> {
  const png = (await page.screenshot()).toString('base64');
  return page.evaluate(
    async ({ png, areas, pink }) => {
      const image = new Image();
      image.src = 'data:image/png;base64,' + png;
      await image.decode();
      const board = document.createElement('canvas');
      board.width = image.width;
      board.height = image.height;
      const context = board.getContext('2d', { willReadFrequently: true });
      if (!context) return areas.map(() => 0);
      context.drawImage(image, 0, 0);
      // The screenshot is in device pixels; the areas, in CSS pixels.
      const scale = image.width / innerWidth;
      return areas.map(({ x, y, width, height }) => {
        const { data } = context.getImageData(
          x * scale,
          y * scale,
          width * scale,
          height * scale,
        );
        let count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
          const hit = pink
            ? r > 200 && b > 60 && r - g > 80
            : Math.max(r, g, b) - Math.min(r, g, b) > 60;
          if (hit) count++;
        }
        return count;
      });
    },
    { png, areas, pink },
  );
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Burst: one canvas, hidden from readers, never in the way', async ({
  page,
}) => {
  test.slow();
  await page.goto(demo('burst'));
  await expect(canvas(page)).toHaveCount(0);
  const button = page.getByRole('button', { name: 'Celebrate' });
  await button.click();
  await expect(canvas(page)).toHaveAttribute('aria-hidden', 'true');
  await expect(canvas(page)).toHaveCSS('pointer-events', 'none');
  await expect(canvas(page)).toHaveCSS('position', 'fixed');
  await expect(canvas(page)).toHaveAttribute('data-active');
  // Clickable through, and still one canvas.
  await button.click();
  await expect(canvas(page)).toHaveCount(1);
  // Fallen: no longer active.
  await expect(canvas(page)).not.toHaveAttribute('data-active', {
    timeout: 25_000,
  });
});

test('From the element: the burst starts where the click was', async ({
  page,
}) => {
  await page.goto(demo('element'));
  const view = page.viewportSize() ?? { width: 1280, height: 720 };
  const left = page.getByRole('button', { name: 'Left' });
  const right = page.getByRole('button', { name: 'Right' });
  /** A band of the screen, 240 px wide, centred on a button. */
  const band = async (button: typeof left) => {
    const box = await button.boundingBox();
    const centre = (box?.x ?? 0) + (box?.width ?? 0) / 2;
    return {
      x: Math.max(0, centre - 120),
      y: 0,
      width: 240,
      height: view.height,
    };
  };
  const [around, away] = [await band(left), await band(right)];
  const before = await colored(page, [around, away]);
  await left.click();
  await expect(canvas(page)).toHaveAttribute('data-active');
  // Around the button clicked, not the other one.
  await expect
    .poll(async () => {
      const [near, far] = await colored(page, [around, away]);
      return near - before[0] > (far - before[1]) * 3 + 50;
    })
    .toBe(true);
});

test('Sides: from both edges', async ({ page }) => {
  await page.goto(demo('sides'));
  const view = page.viewportSize() ?? { width: 1280, height: 720 };
  const edge = Math.floor(view.width / 4);
  await page.getByRole('button', { name: 'Launch' }).click();
  await expect
    .poll(async () => {
      const [left, right] = await colored(page, [
        { x: 0, y: 0, width: edge, height: view.height },
        { x: view.width - edge, y: 0, width: edge, height: view.height },
      ]);
      return Math.min(left, right);
    })
    .toBeGreaterThan(100);
});

test('Fireworks: for three seconds, then done', async ({ page }) => {
  test.slow();
  await page.goto(demo('fireworks'));
  await page.getByRole('button', { name: 'Fireworks' }).click();
  await expect(canvas(page)).toHaveAttribute('data-active');
  // Still going, well after a single burst would have.
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await expect(canvas(page)).toHaveAttribute('data-active');
  await expect(canvas(page)).not.toHaveAttribute('data-active', {
    timeout: 25_000,
  });
});

test('Colours: the ones given', async ({ page }) => {
  await page.goto(demo('custom'));
  const view = page.viewportSize() ?? { width: 1280, height: 720 };
  await page.getByRole('button', { name: 'Party' }).click();
  await expect
    .poll(async () => {
      const [rose] = await colored(
        page,
        [{ x: 0, y: 0, width: view.width, height: view.height }],
        true,
      );
      return rose;
    })
    .toBeGreaterThan(30);
});

test('Reduced motion: no confetti at all', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(demo('sides'));
  const view = page.viewportSize() ?? { width: 1280, height: 720 };
  const screen = { x: 0, y: 0, width: view.width, height: view.height };
  const button = page.getByRole('button', { name: 'Launch' });
  await button.focus();
  const [before] = await colored(page, [screen]);
  await button.click();
  // A while: none falls — the screen as it was.
  await new Promise((resolve) => setTimeout(resolve, 800));
  const [after] = await colored(page, [screen]);
  // (A button's hover may shift a few pixels; a burst, hundreds.)
  expect(Math.abs(after - before)).toBeLessThan(40);
  await expect(canvas(page)).not.toHaveAttribute('data-active');
});

test('After a form: sent, then confetti — and words', async ({ page }) => {
  await page.goto(demo('form'));
  await page.getByRole('button', { name: 'Join' }).click();
  await expect(page.getByRole('alert')).toHaveText('Your name, please.');
  await expect(canvas(page)).toHaveCount(0);
  await page.getByLabel('Your name').fill('Ada');
  await page.getByRole('button', { name: 'Join' }).click();
  await expect(page.getByRole('status')).toHaveText('Welcome aboard, Ada!');
  await expect(canvas(page)).toHaveAttribute('data-active');
});

test('On an event: the last task ticked, confetti — no button', async ({
  page,
}) => {
  await page.goto(demo('event'));
  await expect(page.getByRole('status')).toHaveText('2 to go.');
  await page.getByLabel('Book the venue').check();
  await expect(canvas(page)).toHaveCount(0);
  await page.getByLabel('Send the invites').check();
  await expect(page.getByRole('status')).toHaveText('All done — well done!');
  await expect(canvas(page)).toHaveAttribute('data-active');
});
