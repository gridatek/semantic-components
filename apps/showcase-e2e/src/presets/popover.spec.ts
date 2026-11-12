import { twMerge } from 'cn';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Popover in its preset', () => {
  test(`the popover, its title and description have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/popover/basic-popover-demo');
    await page.getByRole('button', { name: 'Open Popover' }).click();
    for (const [target, wanted, what] of [
      [page.getByRole('dialog'), `${styles.popover.popup}`, 'popover'],
      [page.locator('[scPopoverHeader]'), styles.popover.header, 'header'],
      [page.locator('[scPopoverTitle]'), styles.popover.title, 'title'],
      [
        page.locator('[scPopoverDescription]'),
        styles.popover.description,
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
