import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Input Group in its style', () => {
  test(`the group has its style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const preset = styleName();
    await page.goto('/demos/input-group/input-group-usage-demo');
    const target = page.locator('[data-slot=input-group]');
    const classes = twMerge(styles.inputGroup).split(/\s+/).filter(Boolean);
    // Read until it has them all: the first render may not have them yet.
    await expect
      .poll(async () => {
        const have = new Set(
          ((await target.getAttribute('class')) ?? '').split(/\s+/),
        );
        return classes.filter((c) => !have.has(c));
      }, `${preset} classes missing`)
      .toEqual([]);
  });
});
