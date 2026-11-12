import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Drawer in its preset', () => {
  test(`the drawer, its handle, header, title and description have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/drawer/drawer-usage-demo');
    await page.getByRole('button', { name: 'Edit profile' }).click();
    for (const [target, wanted, what] of [
      [page.getByRole('dialog'), styles.drawer.content, 'drawer'],
      [page.locator('[scDrawerHandle]'), styles.drawer.handle, 'handle'],
      [page.locator('[scDrawerHeader]'), styles.drawer.header, 'header'],
      [page.locator('[scDrawerTitle]'), styles.drawer.title, 'title'],
      [
        page.locator('[scDrawerDescription]'),
        styles.drawer.description,
        'description',
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
