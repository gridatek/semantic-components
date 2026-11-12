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

test.describe('Alert in its preset', () => {
  test(`the alert and its parts have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/alert/action-alert-demo');
    const alert = page.locator('[scAlert]');
    // The demo's max-w-md merged over the preset's (cn).
    await expectClasses(
      alert,
      twMerge(`${styles.alert.alert({ variant: 'default' })} max-w-md`),
      `${preset} alert`,
    );
    await expectClasses(
      alert.locator('[scAlertTitle]'),
      styles.alert.title,
      `${preset} title`,
    );
    await expectClasses(
      alert.locator('[scAlertDescription]'),
      styles.alert.description,
      `${preset} description`,
    );
    await expectClasses(
      alert.locator('[scAlertAction]'),
      styles.alert.action,
      `${preset} action`,
    );

    await page.goto('/demos/alert/destructive-alert-demo');
    await expectClasses(
      page.locator('[scAlert]'),
      twMerge(`${styles.alert.alert({ variant: 'destructive' })} max-w-md`),
      `${preset} destructive`,
    );
  });
});
