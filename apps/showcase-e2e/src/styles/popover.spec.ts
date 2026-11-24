import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Popover in its style', () => {
  test(`the popover, its title and description have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const style = styleName();
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
        }, `${style} ${what} classes missing`)
        .toEqual([]);
    }
  });
});
