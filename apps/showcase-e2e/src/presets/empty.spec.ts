import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Empty in its preset', () => {
  test(`an empty state, its media, title and body have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/empty/outline-empty-demo');
    for (const [target, wanted, what] of [
      [
        page.locator('[scEmpty]').first(),
        `${styles.empty.root} border`,
        'root',
      ],
      [
        page.locator('[scEmptyMedia]').first(),
        styles.empty.media({ variant: 'icon' }),
        'media',
      ],
      [page.locator('[scEmptyTitle]').first(), styles.empty.title, 'title'],
      [page.locator('[scEmptyBody]').first(), styles.empty.body, 'body'],
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
