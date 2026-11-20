import type { Page } from '@playwright/test';
import { expect, test } from '../../test';

const demo = (name: string) => `/demos/tags-input/${name}`;

/** The tags, as the chips show them. */
const chips = (page: Page) =>
  page.locator('[data-slot=combobox-chip]').filter({ hasNotText: /^$/ });

test.describe('Tags Input recipe', () => {
  test('usage: the text typed is offered first; Enter adds it as a tag', async ({
    page,
  }) => {
    await page.goto(demo('tags-input-usage-demo'));
    const input = page.getByRole('combobox', { name: 'Skills' });
    await expect(chips(page)).toHaveCount(2);
    await input.click();
    await input.pressSequentially('Docker');
    await expect(page.getByRole('option')).toHaveText(['Add “Docker”']);
    await page.keyboard.press('Enter');
    await expect(chips(page).last()).toContainText('Docker');
    await expect(chips(page).last()).not.toContainText('Add');
    await expect(input).toHaveValue('');
  });

  test('usage: a comma adds a tag too; a suggestion is picked by ↓ and Enter', async ({
    page,
  }) => {
    await page.goto(demo('tags-input-usage-demo'));
    const input = page.getByRole('combobox', { name: 'Skills' });
    await input.click();
    await input.pressSequentially('Go,');
    await expect(chips(page).last()).toContainText('Go');
    await expect(input).toHaveValue('');

    await input.pressSequentially('sig');
    await expect(page.getByRole('option')).toHaveText(['Add “sig”', 'Signals']);
    // ↓ onto Signals: autoHighlight settles on the first item a moment after
    // the list renders, and may land after a quick ↓ — press again, as you
    // would, until Signals is the one.
    const signals = page.getByRole('option', { name: 'Signals' });
    await expect(async () => {
      await page.keyboard.press('ArrowDown');
      await expect(input).toHaveAttribute(
        'aria-activedescendant',
        (await signals.getAttribute('id')) ?? 'missing',
        { timeout: 1000 },
      );
    }).toPass();
    await page.keyboard.press('Enter');
    await expect(chips(page).last()).toContainText('Signals');
  });

  test('usage: a tag already there is not offered again; a chip removes itself', async ({
    page,
  }) => {
    await page.goto(demo('tags-input-usage-demo'));
    const input = page.getByRole('combobox', { name: 'Skills' });
    await input.click();
    await input.pressSequentially('Angular');
    await expect(page.getByRole('option')).toHaveCount(0);
    await page.getByRole('button', { name: 'Remove TypeScript' }).click();
    await expect(chips(page)).toHaveCount(1);
    // Backspace in the empty input removes the last tag.
    await input.fill('');
    await input.press('Backspace');
    await expect(chips(page)).toHaveCount(0);
  });

  test('emails: only an address is offered; else a word says why', async ({
    page,
  }) => {
    await page.goto(demo('emails-tags-input-demo'));
    const input = page.getByRole('combobox', { name: 'Invite' });
    await input.click();
    await input.pressSequentially('grace');
    await expect(page.getByText('Not an email address yet.')).toBeVisible();
    await expect(page.getByRole('option')).toHaveCount(0);
    await input.pressSequentially('@example.com');
    await expect(page.getByRole('option')).toHaveText([
      'Invite “grace@example.com”',
    ]);
    await page.keyboard.press('Enter');
    await expect(chips(page)).toHaveCount(2);
    await expect(chips(page).last()).toContainText('grace@example.com');
  });

  test('limit: three at most, then nothing more is offered', async ({
    page,
  }) => {
    await page.goto(demo('limit-tags-input-demo'));
    const input = page.getByRole('combobox', { name: 'Topics' });
    await input.click();
    for (const topic of ['Sales', 'Support']) {
      await input.pressSequentially(topic);
      // Enter once the first item is highlighted (autoHighlight).
      const first = page.getByRole('option').first();
      await expect(first).toHaveText(`Add “${topic}”`);
      await expect(input).toHaveAttribute(
        'aria-activedescendant',
        (await first.getAttribute('id')) ?? 'missing',
      );
      await page.keyboard.press('Enter');
      await expect(chips(page).last()).toContainText(topic);
    }
    await expect(chips(page)).toHaveCount(3);
    await expect(page.getByText('3 of 3.')).toBeVisible();
    await input.pressSequentially('Product');
    await expect(
      page.getByText('Three topics at most — remove one first.'),
    ).toBeVisible();
    await expect(page.getByRole('option')).toHaveCount(0);
  });

  test('form: one tag at least, from the schema, once touched', async ({
    page,
  }) => {
    await page.goto(demo('form-tags-input-demo'));
    const input = page.getByRole('combobox', { name: 'Keywords' });
    const errors = page.locator('[scFieldErrors]');
    await input.click();
    await input.blur();
    await expect(errors).toHaveText('Add one keyword at least.');
    await input.click();
    await input.pressSequentially('angular,');
    await expect(errors).toBeEmpty();
    await expect(page.locator('pre')).toContainText('"angular"');
  });
});
