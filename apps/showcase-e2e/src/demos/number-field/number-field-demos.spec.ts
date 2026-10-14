import { type Locator, expect, test } from '@playwright/test';
import { collectErrors } from '../../interaction';

/** The value, as written and as a number. */
async function expectValue(input: Locator, text: string, now: string) {
  await expect(input).toHaveValue(text);
  await expect(input).toHaveAttribute('aria-valuenow', now);
}

/** An element's centre on the page. */
async function center(locator: Locator): Promise<{ x: number; y: number }> {
  const box = (await locator.boundingBox()) ?? {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

test.describe('Number field', () => {
  test('keyboard: steps, small and large steps, bounds', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/number-field/basic-number-field-demo');
    const count = page.getByRole('spinbutton', { name: 'Count' });
    await expect(count).toHaveAttribute('aria-valuemin', '0');
    await expect(count).toHaveAttribute('aria-valuemax', '100');
    await expectValue(count, '10', '10');

    await count.press('ArrowUp');
    await expectValue(count, '11', '11');
    await count.press('Shift+ArrowUp');
    await expectValue(count, '21', '21');
    await count.press('Alt+ArrowDown');
    await expectValue(count, '20.9', '20.9');
    await count.press('PageDown');
    await expectValue(count, '10.9', '10.9');
    await count.press('End');
    await expectValue(count, '100', '100');
    await count.press('ArrowUp');
    await expectValue(count, '100', '100');
    await count.press('Home');
    await expectValue(count, '0', '0');
    expect(errors).toEqual([]);
  });

  test('typing: kept as typed, then clamped and committed', async ({
    page,
  }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/number-field/basic-number-field-demo');
    const count = page.getByRole('spinbutton', { name: 'Count' });
    const summary = page.locator('dl');

    await count.fill('500');
    // While typing: the value follows, uncommitted.
    await expect(summary).toContainText('Value500');
    await expect(summary).toContainText('Committed10');
    await count.press('Enter');
    await expectValue(count, '100', '100');
    await expect(summary).toContainText('Committed100');

    // Letters don't get in.
    await count.fill('');
    await count.pressSequentially('4a2');
    await expect(count).toHaveValue('42');
    await count.blur();
    await expect(summary).toContainText('Committed42');

    // Emptied: no value.
    await count.fill('');
    await count.press('Enter');
    await expect(count).not.toHaveAttribute('aria-valuenow');
    expect(errors).toEqual([]);
  });

  test('buttons: step, repeat while held, keep focus', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/number-field/basic-number-field-demo');
    const count = page.getByRole('spinbutton', { name: 'Count' });
    const increase = page.getByRole('button', { name: 'Increase count' });
    const decrease = page.getByRole('button', { name: 'Decrease count' });
    await expect(increase).toHaveAttribute('tabindex', '-1');
    await expect(increase).toHaveAttribute(
      'aria-controls',
      (await count.getAttribute('id')) ?? '',
    );

    await count.focus();
    await increase.click();
    await expectValue(count, '11', '11');
    await expect(count).toBeFocused();
    await decrease.click();
    await expectValue(count, '10', '10');

    // Held: repeats.
    const box = await center(increase);
    await page.mouse.move(box.x, box.y);
    await page.mouse.down();
    await expect
      .poll(async () => Number(await count.getAttribute('aria-valuenow')))
      .toBeGreaterThan(14);
    await page.mouse.up();
    expect(errors).toEqual([]);
  });

  test('locale and format: German euros, both ways', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/number-field/price-number-field-demo');
    const price = page.getByRole('spinbutton', { name: 'Preis' });
    await expectValue(price, '1.234,50\u00A0€', '1234.5');
    await expect(price).toHaveAttribute('aria-valuetext', '1.234,50\u00A0€');

    await price.fill('99,95');
    await price.blur();
    await expectValue(price, '99,95\u00A0€', '99.95');
    // The other usual separator works too.
    await price.fill('1234.5');
    await price.blur();
    await expectValue(price, '1.234,50\u00A0€', '1234.5');
    expect(errors).toEqual([]);
  });

  test('snapOnStep and the wheel', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/number-field/steps-number-field-demo');
    const width = page.getByRole('spinbutton', { name: 'Width (px)' });
    await width.fill('12');
    await width.press('ArrowUp');
    await expectValue(width, '15', '15');
    await width.press('ArrowDown');
    await expectValue(width, '10', '10');
    await width.hover();
    await page.mouse.wheel(0, -100);
    await expectValue(width, '15', '15');
    expect(errors).toEqual([]);
  });

  test('scrubbing: dragging the label steps the value', async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === 'firefox',
      "Firefox reports a locked pointer's synthetic moves from the window's centre",
    );
    const errors = collectErrors(page);
    await page.goto('/demos/number-field/scrubbing-number-field-demo');
    const opacity = page.getByRole('spinbutton', { name: 'Opacity' });
    await expectValue(opacity, '50%', '0.5');
    const label = await center(page.getByText('Opacity', { exact: true }));
    await page.mouse.move(label.x, label.y);
    await page.mouse.down();
    // 2 px per step of 1%.
    for (let x = 4; x <= 40; x += 4) {
      await page.mouse.move(label.x + x, label.y);
    }
    await page.mouse.up();
    await expectValue(opacity, '70%', '0.7');
    expect(errors).toEqual([]);
  });

  test('disabled and read-only: the field and its class', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/number-field/disabled-number-field-demo');
    const fields = page.locator('[data-slot=number-field]');
    const disabled = fields.nth(0);
    const readonly = fields.nth(1);
    await expect(disabled).toHaveAttribute('data-disabled', 'true');
    // The consumer's width replaces the field's.
    const classes = ((await disabled.getAttribute('class')) ?? '').split(' ');
    expect(classes).toContain('w-40');
    expect(classes).not.toContain('w-full');
    await expect(
      page.getByRole('spinbutton', { name: 'Disabled' }),
    ).toBeDisabled();
    await expect(readonly).toHaveAttribute('data-disabled', 'false');
    await expect(readonly).toHaveAttribute('data-readonly', 'true');
    expect(errors).toEqual([]);
  });

  test('Signal Forms: schema bounds, required, touched', async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto('/demos/number-field/signal-forms-number-field-demo');
    const quantity = page.getByRole('spinbutton', { name: 'Quantity' });
    await expect(quantity).toHaveAttribute('aria-valuemin', '1');
    await expect(quantity).toHaveAttribute('aria-valuemax', '100');

    await quantity.fill('');
    await quantity.blur();
    await expect(page.getByRole('alert')).toHaveText('Enter a quantity.');
    await expect(quantity).toHaveAttribute('aria-invalid', 'true');
    // The number field is a scField: its state follows the form.
    const field = page.locator('[data-slot=number-field]');
    await expect(field).toHaveAttribute('role', 'group');
    await expect(field).toHaveAttribute('data-invalid', 'true');

    await quantity.fill('250');
    await quantity.blur();
    await expectValue(quantity, '100', '100');
    await expect(page.getByRole('alert')).toHaveCount(0);
    await expect(field).toHaveAttribute('data-invalid', 'false');
    await expect(page.locator('pre')).toContainText('"value": 100');
    expect(errors).toEqual([]);
  });
});
