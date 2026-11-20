import type { Locator, Page } from '@playwright/test';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/range-slider-next/${name}`;

/**
 * Where a value sits on the slider, as the pointer goes: along the track,
 * less half a thumb at each end (the thumb stays inside the track).
 */
async function pointAt(
  page: Page,
  slider: Locator,
  fraction: number,
): Promise<{ x: number; y: number }> {
  await expect(slider.locator('input').first()).toBeVisible();
  const { box, thumb, rtl, vertical } = await slider.evaluate((el) => {
    const rect = el.getBoundingClientRect();
    const input = el.querySelector('input') as HTMLInputElement;
    return {
      box: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      thumb:
        parseFloat(
          getComputedStyle(input).getPropertyValue('--sc-slider-thumb'),
        ) || 0,
      rtl: getComputedStyle(el).direction === 'rtl',
      vertical: input.getAttribute('aria-orientation') === 'vertical',
    };
  });
  if (vertical) {
    return {
      x: box.x + box.width / 2,
      y: box.y + box.height - thumb / 2 - (box.height - thumb) * fraction,
    };
  }
  const along = thumb / 2 + (box.width - thumb) * fraction;
  return {
    x: rtl ? box.x + box.width - along : box.x + along,
    y: box.y + box.height / 2,
  };
}

async function pressAt(page: Page, slider: Locator, fraction: number) {
  const { x, y } = await pointAt(page, slider, fraction);
  await page.mouse.click(x, y);
}

test.describe('Range Slider Next demos', () => {
  test('usage: two named thumbs; each steps by its arrows and stops at the other', async ({
    page,
  }) => {
    await page.goto(demo('range-slider-next-usage-demo'));
    const from = page.getByRole('slider', { name: 'Minimum' });
    const to = page.getByRole('slider', { name: 'Maximum' });
    await expect(from).toHaveValue('25');
    await expect(to).toHaveValue('75');

    await from.focus();
    await page.keyboard.press('ArrowRight');
    await expect(from).toHaveValue('26');
    await page.keyboard.press('End');
    await expect(from).toHaveValue('75');

    await to.focus();
    await page.keyboard.press('Home');
    await expect(to).toHaveValue('75');
    await page.keyboard.press('ArrowRight');
    await expect(to).toHaveValue('76');
  });

  test('usage: a press on the track brings the nearer thumb, which follows the drag', async ({
    page,
  }) => {
    await page.goto(demo('range-slider-next-usage-demo'));
    const slider = page.locator('[scRangeSliderNext]');
    const from = page.getByRole('slider', { name: 'Minimum' });
    const to = page.getByRole('slider', { name: 'Maximum' });

    await pressAt(page, slider, 0.1);
    await expect(from).toHaveValue('10');
    await expect(from).toBeFocused();
    await pressAt(page, slider, 0.9);
    await expect(to).toHaveValue('90');
    await expect(to).toBeFocused();

    const start = await pointAt(page, slider, 0.9);
    const end = await pointAt(page, slider, 0.6);
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(end.x, end.y, { steps: 5 });
    await page.mouse.up();
    await expect(to).toHaveValue('60');
    await expect(from).toHaveValue('10');
  });

  test('usage: both on one spot, the direction of the drag picks the thumb that can move', async ({
    page,
  }) => {
    await page.goto(demo('range-slider-next-usage-demo'));
    const slider = page.locator('[scRangeSliderNext]');
    const from = page.getByRole('slider', { name: 'Minimum' });
    const to = page.getByRole('slider', { name: 'Maximum' });
    const drag = async (a: number, b: number) => {
      const start = await pointAt(page, slider, a);
      const end = await pointAt(page, slider, b);
      await page.mouse.move(start.x, start.y);
      await page.mouse.down();
      await page.mouse.move(end.x, end.y, { steps: 5 });
      await page.mouse.up();
    };

    // Both at the right end: only from can go, to the left.
    await to.focus();
    await page.keyboard.press('End');
    await from.focus();
    await page.keyboard.press('End');
    await expect(from).toHaveValue('100');
    await drag(1, 0.5);
    await expect(from).toHaveValue('50');
    await expect(to).toHaveValue('100');

    // Both at the left end: only to can go, to the right.
    await from.focus();
    await page.keyboard.press('Home');
    await to.focus();
    await page.keyboard.press('Home');
    await expect(to).toHaveValue('0');
    await drag(0, 0.8);
    await expect(to).toHaveValue('80');
    await expect(from).toHaveValue('0');
  });

  test('label and value: a group named by its label; the values read in euros', async ({
    page,
  }) => {
    await page.goto(demo('label-range-slider-next-demo'));
    const group = page.getByRole('group', { name: 'Price' });
    await expect(group).toBeVisible();
    const from = group.getByRole('slider', { name: 'Minimum price' });
    await expect(from).toHaveAttribute('aria-valuetext', '€200');
    await expect(
      group.getByRole('slider', { name: 'Maximum price' }),
    ).toHaveAttribute('aria-valuetext', '€800');
    await expect(page.getByText('€200 – €800')).toBeVisible();
    // Each thumb is described by the field's description.
    await expect(from).toHaveAccessibleDescription(
      'Nights from this price to that one.',
    );

    await from.focus();
    await page.keyboard.press('ArrowRight');
    await expect(from).toHaveAttribute('aria-valuetext', '€210');
    await expect(page.getByText('€210 – €800')).toBeVisible();
  });

  test('steps: by tens, and two steps apart at least', async ({ page }) => {
    await page.goto(demo('steps-range-slider-next-demo'));
    const from = page.getByRole('slider', { name: 'Minimum' });
    const to = page.getByRole('slider', { name: 'Maximum' });
    await from.focus();
    await page.keyboard.press('ArrowRight');
    await expect(from).toHaveValue('40');
    await page.keyboard.press('End');
    await expect(from).toHaveValue('50');
    await to.focus();
    await page.keyboard.press('Home');
    await expect(to).toHaveValue('70');
    await expect(page.getByText('50 – 70')).toBeVisible();
  });

  test('vertical: says so; ArrowUp raises, a press near the top brings the upper thumb', async ({
    page,
  }) => {
    await page.goto(demo('vertical-range-slider-next-demo'));
    const lowest = page.getByRole('slider', { name: 'Lowest' });
    const highest = page.getByRole('slider', { name: 'Highest' });
    await expect(lowest).toHaveAttribute('aria-orientation', 'vertical');
    await lowest.focus();
    await page.keyboard.press('ArrowUp');
    await expect(lowest).toHaveValue('21');
    await pressAt(page, page.locator('[scRangeSliderNext]'), 0.9);
    await expect(highest).toHaveValue('90');
  });

  test('form: one field, the pair; its rule, once touched, marks both thumbs', async ({
    page,
  }) => {
    await page.goto(demo('form-range-slider-next-demo'));
    const lowest = page.getByRole('slider', { name: 'Lowest budget' });
    const highest = page.getByRole('slider', { name: 'Highest budget' });
    const errors = page.locator('[scFieldErrors]');
    await expect(lowest).not.toHaveAttribute('aria-invalid');

    await lowest.focus();
    await page.keyboard.press('Tab');
    await expect(highest).toBeFocused();
    // Out of the slider (Firefox's Tab stays: nothing follows on the page).
    await highest.blur();
    await expect(errors).toHaveText('Leave 100 at least between them.');
    await expect(lowest).toHaveAttribute('aria-invalid', 'true');
    await expect(highest).toHaveAttribute('aria-invalid', 'true');

    await highest.focus();
    await page.keyboard.press('ArrowRight');
    await expect(highest).toHaveValue('500');
    await expect(errors).toBeEmpty();
    await expect(lowest).not.toHaveAttribute('aria-invalid');
    await expect(page.locator('pre')).toContainText('500');
  });

  test('disabled: neither thumb takes the focus or a press', async ({
    page,
  }) => {
    await page.goto(demo('disabled-range-slider-next-demo'));
    const from = page.getByRole('slider', { name: 'Minimum' });
    await expect(from).toBeDisabled();
    await expect(page.getByRole('slider', { name: 'Maximum' })).toBeDisabled();
    await pressAt(page, page.locator('[scRangeSliderNext]'), 0.1);
    await expect(from).toHaveValue('25');
  });

  test('RTL: from on the right; ← raises it, a press at the right end brings it', async ({
    page,
  }) => {
    await page.goto(demo('rtl-range-slider-next-demo'));
    const slider = page.locator('[scRangeSliderNext]');
    const from = page.getByRole('slider', { name: 'الحد الأدنى' });
    const to = page.getByRole('slider', { name: 'الحد الأقصى' });
    await from.focus();
    await page.keyboard.press('ArrowLeft');
    await expect(from).toHaveValue('26');
    await page.keyboard.press('ArrowRight');
    await expect(from).toHaveValue('25');
    await pressAt(page, slider, 0.05);
    await expect(from).toHaveValue('5');
    // The press was at the right end: start, right to left.
    const box = await slider.boundingBox();
    const { x } = await pointAt(page, slider, 0.05);
    expect(x).toBeGreaterThan((box?.x ?? 0) + (box?.width ?? 0) / 2);
    await expect(to).toHaveValue('75');
  });
});
