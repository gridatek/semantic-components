import { type Locator } from '@playwright/test';
import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

/** Read until it has them all: the first render may not have them yet. */
async function expectClasses(target: Locator, classes: string, what: string) {
  const wanted = classes.split(/\s+/).filter(Boolean);
  await expect
    .poll(async () => {
      const have = new Set(
        ((await target.getAttribute('class')) ?? '').split(/\s+/),
      );
      return wanted.filter((c) => !have.has(c));
    }, what)
    .toEqual([]);
}

test.describe('Breadcrumb in its style', () => {
  test(`the list, its items and the ellipsis have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const preset = styleName();
    await page.goto('/demos/breadcrumb/ellipsis-breadcrumb-demo');
    const s = styles.breadcrumb;
    await expectClasses(
      page.locator('[scBreadcrumbList]'),
      s.list,
      `${preset} list`,
    );
    await expectClasses(
      page.locator('[scBreadcrumbItem]').first(),
      s.item,
      `${preset} item`,
    );
    await expectClasses(
      page.locator('[scBreadcrumbEllipsis]'),
      s.ellipsis,
      `${preset} ellipsis`,
    );
  });
});
