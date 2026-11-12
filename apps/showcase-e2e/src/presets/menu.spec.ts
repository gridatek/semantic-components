import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Menu in its preset', () => {
  test(`an item has its preset's classes`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
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
      }, `${preset} classes missing`)
      .toEqual([]);
  });
});
