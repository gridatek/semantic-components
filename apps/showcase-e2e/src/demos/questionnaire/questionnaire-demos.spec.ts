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

test('Usage: one at a time; checked before moving on; an optional one skipped', async ({
  page,
}) => {
  await page.goto('/demos/questionnaire/questionnaire-usage-demo');
  const progress = page.getByRole('progressbar', { name: 'Progress' });
  await expect(progress).toHaveText('Question 1 of 3');
  await expect(progress).toHaveAttribute('aria-valuenow', '1');
  await expect(page.locator('[data-slot=questionnaire-item]')).toHaveCount(3);
  await expect(shown(page)).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Previous' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Skip' })).toBeHidden();
  await expect(
    page.locator('[data-slot=questionnaire-choice-shortcut]:visible'),
  ).toHaveText(['A', 'B', 'C']);

  // Unanswered: the error, and the first answer focused.
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('alert')).toHaveText(
    'Choose an answer to continue.',
  );
  await expect(shown(page)).toHaveAttribute('aria-invalid', 'true');
  await expect(
    page.getByRole('radio', { name: /Tool call timeline/ }),
  ).toBeFocused();

  // Answered: Enter moves on, focus on the question.
  // WebKit doesn't focus a clicked radio: chosen by keyboard, as a reader would.
  await choose(page.getByRole('radio', { name: /Approval checkpoints/ }));
  await press(page, 'Enter');
  await expect(progress).toHaveText('Question 2 of 3');
  await expect(progress).toHaveAttribute('aria-valuetext', 'Question 2 of 3');
  await expect(shown(page)).toBeFocused();

  // Optional: skipped.
  await page.getByRole('button', { name: 'Skip' }).click();
  await expect(progress).toHaveText('Question 3 of 3');
  await page.getByRole('button', { name: 'Previous' }).click();
  await page.getByRole('button', { name: 'Previous' }).click();
  await expect(
    page.getByRole('radio', { name: /Approval checkpoints/ }),
  ).toBeChecked();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByRole('button', { name: 'Next' })).toBeHidden();
  await page.getByRole('radio', { name: 'Start now' }).check();
  await page.getByRole('button', { name: 'Save plan' }).click();
  await expect(result(page)).toContainText('"direction": "approvals"');
  await expect(result(page)).toContainText('"timing": "now"');
});

test('Skip: an optional question passed unanswered; a required one not', async ({
  page,
}) => {
  await page.goto(demo('skip'));
  const skip = page.getByRole('button', { name: 'Skip' });
  await expect(skip).toBeHidden();
  await page.getByRole('radio', { name: 'Bug fix' }).check();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(skip).toBeVisible();
  await skip.click();
  await expect(skip).toBeHidden();
  await page.getByRole('radio', { name: 'Run the test suite' }).check();
  await page.getByRole('button', { name: 'Submit brief' }).click();
  await expect(result(page)).toContainText('"constraint": ""');
});

test('Validation: Submit goes back to the question the schema rejects, its message shown', async ({
  page,
}) => {
  await page.goto(demo('validation'));
  await page.getByRole('radio', { name: 'A short summary' }).check();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('radio', { name: 'The public' }).check();
  await page.getByRole('button', { name: 'Configure' }).click();
  await expect(shown(page).locator('legend')).toHaveText(
    'How much detail should the answer include?',
  );
  await expect(page.getByRole('alert')).toHaveText(
    'Public answers need enough context. Choose a complete answer.',
  );
  await expect(result(page)).toHaveCount(0);
  await page.getByRole('radio', { name: 'A complete answer' }).check();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Configure' }).click();
  await expect(result(page)).toContainText('"detail": "complete"');
});

test('Controlled: the question shown is the page’s state', async ({ page }) => {
  await page.goto(demo('controlled'));
  const status = page.getByRole('status');
  await expect(status).toHaveText('Current checkpoint: Change scope');
  await page.getByRole('radio', { name: 'Only the target component' }).check();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(status).toHaveText('Current checkpoint: Verification');
});

test('Resume: back where it stopped, the saved answers; Reset restores them', async ({
  page,
}) => {
  await page.goto(demo('resume'));
  const progress = page.getByRole('progressbar', { name: 'Progress' });
  await expect(progress).toHaveText('Question 2 of 3');
  const tests = page.getByRole('checkbox', { name: 'Run migration tests' });
  await expect(tests).toBeChecked();
  await tests.uncheck();
  await page.getByRole('button', { name: 'Previous' }).click();
  await expect(
    page.getByRole('radio', { name: 'Incremental migration' }),
  ).toBeChecked();
  await page.getByRole('button', { name: 'Reset changes' }).click();
  await expect(progress).toHaveText('Question 2 of 3');
  await expect(tests).toBeChecked();
});

test('Conditional: the cloud question only for a cloud run', async ({
  page,
}) => {
  await page.goto(demo('conditional'));
  const progress = page.getByRole('progressbar', { name: 'Progress' });
  await expect(progress).toHaveText('Question 1 of 2');
  await choose(page.getByRole('radio', { name: 'In the cloud' }));
  await expect(progress).toHaveText('Question 1 of 3');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(shown(page).locator('legend')).toHaveText(
    'Which cloud environment should it use?',
  );
});

test('Navigation state: Next disabled until answered', async ({ page }) => {
  await page.goto(demo('navigation-state'));
  const next = page.getByRole('button', { name: 'Next' });
  await expect(next).toBeDisabled();
  await page.getByRole('radio', { name: 'Read files only' }).check();
  await expect(next).toBeEnabled();
  await next.click();
  await expect(
    page.getByRole('button', { name: 'Save permissions' }),
  ).toBeDisabled();
});

test('Custom progress: a step per question, filled up to the current one', async ({
  page,
}) => {
  await page.goto(demo('progress'));
  const progress = page.getByRole('progressbar', { name: 'Progress' });
  await expect(progress).toHaveText('Checkpoint 1 of 4');
  const steps = progress.locator('span');
  await expect(steps).toHaveCount(4);
  await expect(steps.nth(0)).toHaveClass(/bg-primary/);
  await expect(steps.nth(1)).toHaveClass(/bg-muted/);
});

test('Card and Dialog: a question named by its card title; a dialog closed by sending', async ({
  page,
}) => {
  await page.goto(demo('card'));
  await expect(
    page.getByRole('group', { name: 'What should the agent work on?' }),
  ).toBeVisible();

  await page.goto(demo('dialog'));
  await page.getByRole('button', { name: 'Answer the agent' }).click();
  const dialog = page.getByRole('dialog', {
    name: 'The agent has two questions',
  });
  await dialog.getByRole('radio', { name: 'Only this folder' }).check();
  await dialog.getByRole('button', { name: 'Next' }).click();
  await dialog.getByRole('radio', { name: 'A quick check' }).check();
  await dialog.getByRole('button', { name: 'Send answers' }).click();
  await expect(dialog).toHaveCount(0);
  await expect(result(page)).toContainText('"scope": "folder"');
});

test('Freeform: answered in words, Enter moves on', async ({ page }) => {
  await page.goto(demo('freeform'));
  const approach = page.getByRole('textbox', { name: 'Refactoring approach' });
  await approach.fill('Extract the parser first.');
  await approach.press('Control+Enter');
  const deadline = page.getByRole('textbox', { name: 'Deadline' });
  await expect(deadline).toBeVisible();
  await deadline.fill('Friday');
  await deadline.press('Enter');
  await expect(result(page)).toContainText('"deadline": "Friday"');
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
