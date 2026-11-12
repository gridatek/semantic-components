import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Menubar in its preset', () => {
  test(`the bar, an item and a menu item have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/menubar/menubar-usage-demo');
    const bar = page.getByRole('menubar', { name: 'Browser' });
    const file = bar.getByRole('menuitem', { name: 'File', exact: true });
    await file.click();
    for (const [target, wanted, what] of [
      [bar, styles.menubar.bar, 'bar'],
      [file, styles.menubar.trigger, 'trigger'],
      [
        page.getByRole('menuitem', { name: 'New Tab' }),
        styles.menubar.menu.item,
        'menu item',
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
