import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Field in its style', () => {
  test(`its parts have their style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/field/fieldset-field-demo');
    for (const [target, wanted, what] of [
      [page.locator('fieldset[scFieldset]'), styles.field.set, 'set'],
      [page.locator('legend[scLegend]'), styles.field.legend, 'legend'],
      [page.locator('[scFieldGroup]').first(), styles.field.group, 'group'],
      [page.locator('[scField]').first(), styles.field.field, 'field'],
      [
        page.locator('[scFieldDescription]').first(),
        styles.field.description,
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
