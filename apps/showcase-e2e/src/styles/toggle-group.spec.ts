import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Toggle Group in its style', () => {
  test(`an item has its style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const preset = styleName();
    await page.goto('/demos/toggle-group/spacing-toggle-group-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot=toggle-group-item]').last(),
        `${styles.toggleGroup.item} ${styles.toggle({ variant: 'outline', size: 'sm' })}`,
        'item',
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
