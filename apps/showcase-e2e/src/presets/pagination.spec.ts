import { type Locator } from '@playwright/test';
import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

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

test.describe('Pagination in its preset', () => {
  test(`the list, the ellipsis, Previous and Next have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/pagination/ellipsis-pagination-demo');
    const nav = page.getByRole('navigation', { name: 'Products' });
    await expectClasses(
      nav.locator('[scPaginationList]'),
      styles.pagination.list,
      `${preset} list classes missing`,
    );
    await expectClasses(
      nav.locator('[scPaginationEllipsis]').first(),
      styles.pagination.ellipsis,
      `${preset} ellipsis classes missing`,
    );
    await expectClasses(
      nav.getByRole('button', { name: 'Previous' }),
      styles.pagination.previous,
      `${preset} Previous classes missing`,
    );
    await expectClasses(
      nav.getByRole('button', { name: 'Next' }),
      styles.pagination.next,
      `${preset} Next classes missing`,
    );
  });
});
