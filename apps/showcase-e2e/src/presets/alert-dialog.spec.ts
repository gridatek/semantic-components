import { type Locator } from '@playwright/test';
import { twMerge } from 'cn';
import { openStill } from '../looks';
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

test.describe('Alert Dialog in its preset', () => {
  test(`the backdrop, dialog and its parts have their preset's classes`, async ({
    page,
  }) => {
    const styles = presetStyles();
    const preset = presetName();
    await openStill(page, '/demos/alert-dialog/media-alert-dialog-demo');
    await page.getByRole('button', { name: 'Share Project' }).click();
    const dialog = page.getByRole('alertdialog');
    const s = styles.alertDialog;
    await expectClasses(
      page.locator('[scBackdrop]'),
      styles.backdrop,
      `${preset} backdrop`,
    );
    await expectClasses(
      dialog,
      twMerge(`relative max-w-[calc(100%-2rem)] text-sm ${s.content} w-screen`),
      `${preset} dialog`,
    );
    for (const [part, classes] of [
      ['[scAlertDialogHeader]', s.header],
      ['[scAlertDialogMedia]', s.media],
      ['[scAlertDialogTitle]', s.title],
      ['[scAlertDialogDescription]', s.description],
      ['[scAlertDialogFooter]', s.footer],
    ] as const)
      await expectClasses(dialog.locator(part), classes, `${preset} ${part}`);
  });
});
