import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Toast in its preset', () => {
  test(`a toast and its stack have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/toast/toast-usage-demo');
    await page.getByRole('button', { name: 'Show Toast' }).click();
    for (const [target, wanted, what] of [
      [page.locator('[data-slot=toast]'), styles.toast.toast, 'toast'],
      [page.locator('[data-slot=toast-list]'), styles.toast.list, 'list'],
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
