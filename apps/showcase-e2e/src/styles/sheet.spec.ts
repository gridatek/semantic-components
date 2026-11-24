import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Sheet in its style', () => {
  test(`the sheet, its header, title and description have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/sheet/sheet-usage-demo');
    await page.getByRole('button', { name: 'Open' }).click();
    for (const [target, wanted, what] of [
      [
        page.getByRole('dialog'),
        `${styles.sheet.content} ${styles.sheet.close}`,
        'sheet',
      ],
      [page.locator('[scSheetHeader]'), styles.sheet.header, 'header'],
      [page.locator('[scSheetTitle]'), styles.sheet.title, 'title'],
      [
        page.locator('[scSheetDescription]'),
        styles.sheet.description,
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
