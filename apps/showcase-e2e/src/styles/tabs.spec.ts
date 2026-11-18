import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Tabs in its style', () => {
  test(`the list and a tab have their style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const preset = styleName();
    await page.goto('/demos/tabs/tabs-usage-demo');
    for (const [target, wanted, what] of [
      [page.getByRole('tablist'), styles.tabs.list({}), 'list'],
      [page.getByRole('tab').first(), styles.tabs.trigger, 'tab'],
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
