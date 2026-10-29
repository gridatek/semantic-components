import { collectErrors, press } from '../../interaction';
import { expectRtl } from '../../rtl';
import { type Locator, type Page, expect, test } from '../../test';

const demo = (name: string) =>
  `/demos/questionnaire/${name}-questionnaire-demo`;
const shown = (page: Page) =>
  page.locator('[data-slot=questionnaire-item]:not([hidden])');
const result = (page: Page) => page.locator('pre');

/** Focus, then Space: a choice made from the keyboard. */
const choose = async (radio: Locator) => {
  await radio.focus();
  await radio.press('Space');
  await expect(radio).toBeChecked();
};

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Questionnaire: one at a time; checked before moving on', async ({
  page,
}) => {
  await page.goto(demo('basic'));
  const progress = page.getByRole('progressbar', { name: 'Progress' });
  await expect(progress).toHaveText('Question 1 of 3');
  await expect(progress).toHaveAttribute('aria-valuenow', '1');
  await expect(page.locator('[data-slot=questionnaire-item]')).toHaveCount(3);
  await expect(shown(page)).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Previous' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Skip' })).toBeHidden();

  // Unanswered: the error, and the first answer focused.
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('alert')).toHaveText(
    'Choose an answer to continue.',
  );
  await expect(shown(page)).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('radio', { name: /Add tests/ })).toBeFocused();

  // Answered: Enter moves on, focus on the question.
  // WebKit doesn't focus a clicked radio: chosen by keyboard, as a reader would.
  await choose(page.getByRole('radio', { name: /Write the docs/ }));
  await press(page, 'Enter');
  await expect(progress).toHaveText('Question 2 of 3');
  await expect(progress).toHaveAttribute('aria-valuetext', 'Question 2 of 3');
  await expect(shown(page)).toBeFocused();
  await expect(shown(page).locator('legend')).toHaveText('How much of it?');

  await page.getByRole('button', { name: 'Previous' }).click();
  await expect(
    page.getByRole('radio', { name: /Write the docs/ }),
  ).toBeChecked();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('radio', { name: 'All of it' }).check();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeHidden();
  await page.getByRole('radio', { name: 'This month' }).check();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(result(page)).toContainText('"goal": "docs"');
  await expect(result(page)).toContainText('"when": "month"');
});

test('Multiple Selection: checkboxes, skipped, a text answer', async ({
  page,
}) => {
  await page.goto(demo('multiple'));
  await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
  const code = page.getByRole('checkbox', { name: 'The code' });
  await code.focus();
  await press(page, 'Space');
  await expect(code).toBeChecked();
  // ↓ between the checkboxes.
  await press(page, 'ArrowDown');
  await expect(
    page.getByRole('checkbox', { name: 'The open issues' }),
  ).toBeFocused();
  await page.getByRole('button', { name: 'Next' }).click();

  const notes = page.getByRole('textbox', { name: 'Notes' });
  await notes.fill('One');
  await notes.press('Enter');
  await notes.pressSequentially('Two');
  await expect(notes).toHaveValue('One\nTwo');
  await notes.press('Control+Enter');
  await expect(result(page)).toContainText('"code": true');
  await expect(result(page)).toContainText('"notes": "One\\nTwo"');
});

test('Shortcuts: a letter picks a choice, Enter confirms', async ({ page }) => {
  await page.goto(demo('shortcuts'));
  await expect(
    page.locator('[data-slot=questionnaire-choice-shortcut]'),
  ).toHaveText(['A', 'B', 'C']);
  const archive = page.getByRole('radio', { name: /Archive it/ });
  await expect(archive).toHaveAttribute('aria-keyshortcuts', 'B');
  await shown(page).focus();
  await press(page, 'b');
  await expect(archive).toBeChecked();
  await expect(archive).toBeFocused();
  await press(page, 'Enter');
  await expect(result(page)).toContainText('"action": "archive"');
});

test('RTL: mirrored; ← is forward, → is back', async ({ page }) => {
  await page.goto(demo('rtl'));
  const progress = page.getByRole('progressbar', { name: 'التقدّم' });
  await expect(progress).toHaveText('السؤال 1 من 2');
  await expectRtl(shown(page));
  await shown(page).focus();
  await press(page, '1');
  await expect(
    page.getByRole('radio', { name: /إضافة الاختبارات/ }),
  ).toBeChecked();
  await shown(page).focus();
  await press(page, 'ArrowLeft');
  await expect(progress).toHaveText('السؤال 2 من 2');
  await expect(shown(page)).toBeFocused();
  await press(page, 'ArrowRight');
  await expect(progress).toHaveText('السؤال 1 من 2');
});
