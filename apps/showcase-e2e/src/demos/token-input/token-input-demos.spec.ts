import { collectErrors, focus, press, type } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/token-input/${name}-demo`;
const editor = (page: Page) =>
  page.locator('[data-slot=token-input-editor]').first();
const chips = (page: Page) => page.locator('[data-slot=token-input-token]');
const picked = (page: Page) => page.getByTestId('picked');

/** The editor as it reads: text, each chip [its text]. */
const shown = (page: Page) =>
  editor(page).evaluate((element) =>
    Array.from(element.childNodes)
      .map((node) =>
        node.nodeType === 3
          ? (node as Text).data
          : node.nodeName === 'SPAN'
            ? `[${(node.textContent ?? '').trim().replace(/\s+/g, ' ')}]`
            : '',
      )
      .join(''),
  );

/** Focus in the editor, the caret at the end, once it shows its value. */
async function toEnd(page: Page) {
  await expect(editor(page)).toHaveAttribute('contenteditable', 'true');
  await focus(editor(page));
  await press(page, 'Control+End');
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('token-input-usage'));
    await expect(chips(page)).toHaveCount(1);
  });

  test('the arrows step over the token in one press', async ({ page }) => {
    await toEnd(page);
    await press(page, 'Control+Home');
    for (let i = 0; i < 9; i++) await press(page, 'ArrowRight');
    await type(page, 'Z');
    await expect(picked(page)).toContainText(
      'Explain [@routes.ts](file:src/routes.ts)Z and',
    );
  });

  test('Backspace removes the token whole; Ctrl + Z puts it back', async ({
    page,
  }) => {
    await toEnd(page);
    await press(page, 'Control+Home');
    for (let i = 0; i < 9; i++) await press(page, 'ArrowRight');
    await press(page, 'Backspace');
    await expect(chips(page)).toHaveCount(0);
    await expect(picked(page)).toContainText('Explain  and how');
    await press(page, 'Control+z');
    await expect(chips(page)).toHaveCount(1);
    await expect(picked(page)).toContainText(
      'Explain [@routes.ts](file:src/routes.ts) and',
    );
  });

  test('the remove part removes its token; focus stays in the editor', async ({
    page,
  }) => {
    await toEnd(page);
    await page.locator('[data-slot=token-input-token-remove]').click();
    await expect(chips(page)).toHaveCount(0);
    await expect(editor(page)).toBeFocused();
  });

  test('Shift + Enter: a new line, typed on', async ({ page }) => {
    await toEnd(page);
    await press(page, 'Shift+Enter');
    await type(page, 'Thanks');
    await expect.poll(() => shown(page)).toMatch(/pages\.\nThanks$/);
  });
});

test.describe('Mentions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('mentions-token-input'));
    await toEnd(page);
  });

  test('@ and a name: Enter makes the person a token, announced', async ({
    page,
  }) => {
    await type(page, 'Hi @am');
    await expect(page.getByRole('option')).toHaveText([
      /Amara Diallo/,
      /Design team/,
    ]);
    await press(page, 'Enter');
    await expect(page.getByRole('listbox')).toHaveCount(0);
    await expect(picked(page)).toHaveText('Hi [@Amara Diallo](mention:u2)');
    await expect(page.locator('[data-slot=token-input-status]')).toHaveText(
      'Amara Diallo mentioned.',
    );
    // A space after the token: typing goes on.
    await type(page, 'and');
    await expect(picked(page)).toHaveText('Hi [@Amara Diallo](mention:u2) and');
  });

  test('a click on an option; Escape dismisses, Ctrl + Space brings it back', async ({
    page,
  }) => {
    await type(page, '@ken');
    await page.getByRole('option', { name: /Kenji/ }).click();
    await expect(picked(page)).toHaveText('[@Kenji Watanabe](mention:u3)');
    await expect(editor(page)).toBeFocused();
    // The popup gone (its leave animation) before the next one.
    await expect(page.getByRole('listbox')).toHaveCount(0);
    await type(page, '@');
    await expect(page.getByRole('listbox')).toBeVisible();
    await press(page, 'Escape');
    await expect(page.getByRole('listbox')).toBeHidden();
    await press(page, 'Control+Space');
    await expect(page.getByRole('listbox')).toBeVisible();
  });

  test('the editor points at the list and the highlighted item', async ({
    page,
  }) => {
    await type(page, '@');
    await expect(editor(page)).toHaveAttribute('aria-autocomplete', 'list');
    const list = page.getByRole('listbox', { name: 'People' });
    await expect(editor(page)).toHaveAttribute(
      'aria-controls',
      (await list.getAttribute('id')) ?? '',
    );
    await press(page, 'ArrowDown');
    const second = page.getByRole('option').nth(1);
    await expect(second).toHaveAttribute('aria-selected', 'true');
    await expect(editor(page)).toHaveAttribute(
      'aria-activedescendant',
      (await second.getAttribute('id')) ?? '',
    );
  });
});

test.describe('Prompt', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('prompt-token-input'));
    await toEnd(page);
  });

  test('/ at the start: a skill; later, none', async ({ page }) => {
    await type(page, '/');
    await expect(page.getByRole('option')).toHaveCount(3);
    await press(page, 'Enter');
    await type(page, 'it, a / b');
    await expect(page.getByRole('listbox')).toHaveCount(0);
    await expect.poll(() => shown(page)).toBe('[skill explain] it, a / b');
  });

  test('a file attached: pending, then ready; Enter sends', async ({
    page,
  }) => {
    await type(page, 'Read ');
    await page.getByRole('button', { name: 'Attach README.md' }).click();
    await expect(chips(page)).toHaveAttribute('data-pending', '');
    await expect(chips(page)).not.toHaveAttribute('data-pending');
    await toEnd(page);
    await press(page, 'Enter');
    await expect(picked(page)).toHaveText('Sent: Read README.md');
    await expect(chips(page)).toHaveCount(0);
  });
});

test.describe('Deleting tokens', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(demo('deletion-token-input'));
    await expect(chips(page)).toHaveCount(1);
  });

  test('select: the first Backspace selects, the second removes', async ({
    page,
  }) => {
    await page.getByRole('combobox').selectOption('select');
    await toEnd(page);
    await press(page, 'Backspace');
    await expect(chips(page)).toHaveAttribute('data-selected', '');
    await press(page, 'Backspace');
    await expect(chips(page)).toHaveCount(0);
  });

  test('revert: the token back into its text, the menu open on it', async ({
    page,
  }) => {
    await page.getByRole('combobox').selectOption('revert');
    await toEnd(page);
    await press(page, 'Backspace');
    await expect(chips(page)).toHaveCount(0);
    await expect.poll(() => shown(page)).toBe('Thanks @Hollis Grant');
    const options = page.getByRole('listbox').getByRole('option');
    // Its text, spaces and all, is the query.
    await expect(options).toHaveText(['Hollis Grant']);
    for (let i = 0; i < 12; i++) await press(page, 'Backspace');
    await expect.poll(() => shown(page)).toBe('Thanks @');
    await expect(options).toHaveCount(3);
  });
});

test('Codec: the value as its codec writes it', async ({ page }) => {
  await page.goto(demo('codec-token-input'));
  await expect(chips(page)).toHaveText(['@Hollis Grant', '@Amara Diallo']);
  await expect(picked(page)).toHaveText('Ship it, <@u1> and <@u2>!');
});

test('Form: some text and a reviewer, from the schema', async ({ page }) => {
  await page.goto(demo('form-token-input'));
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByRole('alert')).toHaveText('Write a request.');
  await expect(editor(page)).toHaveAttribute('aria-invalid', 'true');
  await toEnd(page);
  await type(page, 'Please check ');
  await expect(page.getByRole('alert')).toHaveText('Mention a reviewer.');
  await type(page, '@ho');
  await press(page, 'Enter');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByRole('status')).toHaveText(
    'Please check [@Hollis Grant](mention:u1)',
  );
});

test('Methods: insert at the caret, remove, undo, clear', async ({ page }) => {
  await page.goto(demo('methods-token-input'));
  const insert = page.getByRole('button', { name: 'Insert a file' });
  await expect(editor(page)).toHaveAttribute('contenteditable', 'true');
  await insert.click();
  await insert.click();
  await expect(picked(page)).toHaveText(
    'Notes on [@notes-1.md](file:notes-1.md)[@notes-2.md](file:notes-2.md)',
  );
  await page.getByRole('button', { name: 'Remove the first file' }).click();
  await expect(chips(page)).toHaveText(['notes-2.md file']);
  await page.getByRole('button', { name: 'Undo' }).click();
  await expect(chips(page)).toHaveCount(2);
  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(chips(page)).toHaveCount(0);
  await expect(editor(page)).toHaveAttribute('data-empty');
});

test('Submit shortcut: Enter a new line, Ctrl + Enter sends', async ({
  page,
}) => {
  await page.goto(demo('submit-shortcut-token-input'));
  await toEnd(page);
  await type(page, 'one');
  await press(page, 'Enter');
  await type(page, 'two');
  await press(page, 'Control+Enter');
  await expect(picked(page)).toHaveText('one\ntwo');
});

test('RTL: ← steps over the token forward, as the text reads', async ({
  page,
}) => {
  await page.goto(demo('rtl-token-input'));
  await toEnd(page);
  await press(page, 'Control+Home');
  for (let i = 0; i < 5; i++) await press(page, 'ArrowLeft');
  // At the token: one press over it.
  await press(page, 'ArrowLeft');
  await type(page, 'X');
  await expect.poll(() => shown(page)).toBe('شكرا [@ليلى حسن]X على المراجعة.');
});
