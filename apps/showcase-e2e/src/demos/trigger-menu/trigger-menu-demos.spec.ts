import { collectErrors, focus, press, type } from '../../interaction';
import { type Page, expect, test } from '../../test';

const demo = (name: string) => `/demos/trigger-menu/${name}-demo`;
const editor = (page: Page) => page.locator('[data-slot=token-input-editor]');
const options = (page: Page) => page.getByRole('listbox').getByRole('option');
const chips = (page: Page) => page.locator('[data-slot=token-input-token]');

async function start(page: Page, name: string) {
  await page.goto(demo(name));
  await expect(editor(page)).toHaveAttribute('contenteditable', 'true');
  await focus(editor(page));
}

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test.describe('Usage', () => {
  test.beforeEach(({ page }) => start(page, 'trigger-menu-usage'));

  test('@ opens the list at the character; the first highlighted', async ({
    page,
  }) => {
    await type(page, 'Hi @');
    await expect(options(page)).toHaveCount(5);
    await expect(options(page).first()).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(page.getByRole('status')).toHaveText('5 people found.');
  });

  test('what follows filters by label and keywords', async ({ page }) => {
    await type(page, '@group');
    await expect(options(page)).toHaveText([/Design team/]);
    await press(page, 'Enter');
    await expect(chips(page)).toHaveText(['@Design team']);
  });

  test('↓ / ↑ wrap; Tab chooses', async ({ page }) => {
    await type(page, '@');
    await press(page, 'ArrowUp');
    await expect(options(page).last()).toHaveAttribute('aria-selected', 'true');
    await press(page, 'ArrowDown');
    await expect(options(page).first()).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await press(page, 'Tab');
    await expect(chips(page)).toHaveText(['@Hollis Grant']);
    await expect(editor(page)).toBeFocused();
  });

  test('nothing found: the empty text; a space closes it', async ({ page }) => {
    await type(page, '@zz');
    await expect(page.getByText('No one found.')).toBeVisible();
    await type(page, ' ');
    await expect(page.getByRole('listbox')).toHaveCount(0);
  });

  test('an @ inside a word opens nothing', async ({ page }) => {
    await type(page, 'mail@');
    await expect(page.getByRole('listbox')).toHaveCount(0);
  });
});

test.describe('Commands', () => {
  test.beforeEach(({ page }) => start(page, 'commands-trigger-menu'));

  test('/ at the start: the commands; a disabled one skipped', async ({
    page,
  }) => {
    await type(page, '/');
    await expect(
      page.getByRole('listbox', { name: 'Commands' }).getByRole('option'),
    ).toHaveText(['remind', 'poll', 'giphy', 'status']);
    await expect(options(page).nth(2)).toHaveAttribute('aria-disabled', 'true');
    await press(page, 'ArrowDown');
    await press(page, 'ArrowDown');
    await expect(options(page).nth(3)).toHaveAttribute('aria-selected', 'true');
    await press(page, 'Enter');
    await expect(chips(page)).toHaveText(['/status']);
  });

  test('/ later in the line opens nothing; @ does', async ({ page }) => {
    await type(page, 'a /');
    await expect(page.getByRole('listbox')).toHaveCount(0);
    await type(page, ' @');
    await expect(page.getByRole('listbox', { name: 'People' })).toBeVisible();
  });
});

test('Loading: busy while the loader runs, then its items', async ({
  page,
}) => {
  await start(page, 'loading-trigger-menu');
  await type(page, '@ke');
  await expect(page.getByRole('listbox')).toHaveAttribute('aria-busy', 'true');
  await expect(
    page.getByText('Searching…', { exact: true }).first(),
  ).toBeAttached();
  await expect(options(page)).toHaveText(['Kenji Watanabe', 'Noah Becker']);
  await expect(page.getByRole('listbox')).not.toHaveAttribute('aria-busy');
  await expect(page.getByRole('status')).toHaveText('2 people found.');
});

test('RTL: the list opens at the @, its start edge on the character', async ({
  page,
}) => {
  await start(page, 'rtl-trigger-menu');
  await type(page, 'مرحبا @');
  await expect(options(page)).toHaveCount(3);
  const popup = page.locator('[data-slot=trigger-menu-popup]');
  await expect
    .poll(async () => {
      const at = await editor(page).evaluate((element) => {
        const text = element.firstChild as Text;
        const range = document.createRange();
        const index = text.data.indexOf('@');
        range.setStart(text, index);
        range.setEnd(text, index + 1);
        return range.getBoundingClientRect().right;
      });
      const box = await popup.boundingBox();
      return Math.abs((box?.x ?? 0) + (box?.width ?? 0) - at);
    })
    .toBeLessThan(2);
});
