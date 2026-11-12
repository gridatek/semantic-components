import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Context Menu in its preset', () => {
  test(`an item has the context menu's classes`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/context-menu/basic-context-menu-demo');
    await page.locator('[scContextMenuTrigger]').click({ button: 'right' });
    const target = page.getByRole('menuitem', { name: 'Back' });
    const classes = twMerge(styles.contextMenu.item)
      .split(/\s+/)
      .filter(Boolean);
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
