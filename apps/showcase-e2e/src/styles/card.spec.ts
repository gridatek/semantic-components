import { type Locator } from '@playwright/test';
import { twMerge } from 'cn';
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

test.describe('Card in its style', () => {
  test(`the card and its parts have their style's classes`, async ({
    page,
  }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/card/card-usage-demo');
    const card = page.locator('[scCard]');
    // The frame, the card's own, then the demo's (cn).
    await expectClasses(
      card,
      twMerge(`${styles.frame} ${styles.card.card} w-full max-w-sm`),
      `${style} card`,
    );
    await expectClasses(
      card.locator('[scCardHeader]'),
      styles.card.header,
      `${style} header`,
    );
    await expectClasses(
      card.locator('[scCardTitle]'),
      styles.card.title,
      `${style} title`,
    );
    await expectClasses(
      card.locator('[scCardDescription]'),
      styles.card.description,
      `${style} description`,
    );
    await expectClasses(
      card.locator('[scCardBody]'),
      styles.card.body,
      `${style} content`,
    );
    await expectClasses(
      card.locator('[scCardFooter]'),
      twMerge(`${styles.card.footer} flex-col gap-2`),
      `${style} footer`,
    );
  });
});
