import type { ScStyle } from '@semantic-components/styles';
import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

/**
 * The classes a default button gets in a style: its base, variant and size,
 * merged as `scButton` merges them (`cn`: a size's icon size wins over the
 * base's, so the base's isn't there).
 */
const classesOf = ({ button }: ScStyle) =>
  twMerge(button({ variant: 'default', size: 'default' }))
    .split(/\s+/)
    .filter(Boolean);

test.describe('Button in its style', () => {
  test(`the button has its style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const preset = styleName();
    await page.goto('/demos/button/default-button-demo');
    // Read until the button has its classes: the first render may not
    // have applied them yet.
    const target = page.getByRole('button', { name: 'Button' });
    await expect
      .poll(async () => {
        const have = new Set(
          ((await target.getAttribute('class')) ?? '').split(/\s+/),
        );
        return classesOf(styles).filter((c) => !have.has(c));
      }, `${preset} classes missing`)
      .toEqual([]);
  });
});
