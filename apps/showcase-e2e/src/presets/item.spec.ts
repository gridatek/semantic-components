import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Item in its preset', () => {
  test(`an item, its media and text have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/item/size-item-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[data-slot="item"]').nth(2),
        styles.item.root({ variant: 'outline', size: 'xs' }),
        'item',
      ],
      [
        page.locator('[data-slot="item-media"]').first(),
        styles.item.media({ variant: 'icon' }),
        'media',
      ],
      [page.locator('[scItemTitle]').first(), styles.item.title, 'title'],
      [
        page.locator('[data-slot="item-description"]').first(),
        styles.item.description,
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
