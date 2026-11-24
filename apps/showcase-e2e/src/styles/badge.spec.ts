import { twMerge } from 'cn';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

const VARIANTS = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
] as const;

test.describe('Badge in its style', () => {
  test(`each variant has its style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/badge/variants-badge-demo');
    const badges = page.locator('[scBadge]');
    for (const [i, variant] of VARIANTS.entries()) {
      const wanted = twMerge(styles.badge({ variant }))
        .split(/\s+/)
        .filter(Boolean);
      await expect
        .poll(async () => {
          const have = new Set(
            ((await badges.nth(i).getAttribute('class')) ?? '').split(/\s+/),
          );
          return wanted.filter((c) => !have.has(c));
        }, `${style} ${variant}`)
        .toEqual([]);
    }
  });
});
