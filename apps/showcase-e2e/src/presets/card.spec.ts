import { type Locator } from '@playwright/test';
import { twMerge } from 'cn';
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

test.describe('Card in its preset', () => {
  test(`the card and its parts have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/card/card-usage-demo');
    const card = page.locator('[scCard]');
    // The frame, the card's own, then the demo's (cn).
    await expectClasses(
      card,
      twMerge(`${styles.frame} ${styles.card.card} w-full max-w-sm`),
      `${preset} card`,
    );
    await expectClasses(
      card.locator('[scCardHeader]'),
      styles.card.header,
      `${preset} header`,
    );
    await expectClasses(
      card.locator('[scCardTitle]'),
      styles.card.title,
      `${preset} title`,
    );
    await expectClasses(
      card.locator('[scCardDescription]'),
      styles.card.description,
      `${preset} description`,
    );
    await expectClasses(
      card.locator('[scCardBody]'),
      styles.card.body,
      `${preset} content`,
    );
    await expectClasses(
      card.locator('[scCardFooter]'),
      twMerge(`${styles.card.footer} flex-col gap-2`),
      `${preset} footer`,
    );
  });
});
