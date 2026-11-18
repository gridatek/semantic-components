import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('OTP Field in its style', () => {
  test(`an input has its style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const preset = styleName();
    await page.goto('/demos/otp-field/otp-field-usage-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot=otp-field-input]').first(),
        styles.otpField.input,
        'input',
      ],
    ] as const) {
      const classes = twMerge(wanted).split(/\s+/).filter(Boolean);
      // Read until it has them all: the first render may not have them yet.
      await expect
        .poll(async () => {
          const have = new Set(
            ((await target.getAttribute('class')) ?? '').split(/\s+/),
          );
          return classes.filter((c) => !have.has(c));
        }, `${preset} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
