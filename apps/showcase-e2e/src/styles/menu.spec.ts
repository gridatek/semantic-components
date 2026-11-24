import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Menu in its style', () => {
  test(`an item has its style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/menu/menu-usage-demo');
    await page.getByRole('button', { name: 'Open' }).click();
    const target = page.getByRole('menuitem', { name: 'Profile' });
    const classes = twMerge(styles.menu.item).split(/\s+/).filter(Boolean);
    // Read until it has them all: the first render may not have them yet.
    await expect
      .poll(async () => {
        const have = new Set(
          ((await target.getAttribute('class')) ?? '').split(/\s+/),
        );
        return classes.filter((c) => !have.has(c));
      }, `${style} classes missing`)
      .toEqual([]);
  });
});
