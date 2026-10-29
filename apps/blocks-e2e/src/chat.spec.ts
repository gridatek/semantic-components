import { type Page, expect, test } from '@playwright/test';

const viewport = (page: Page) =>
  page.getByRole('region', { name: 'Conversation' });

/** A row's top in the conversation. */
const rowTop = (page: Page, id: string) =>
  page.evaluate((id) => {
    const v = document.querySelector('[data-slot=message-scroller-viewport]');
    const row = document.querySelector(`[data-message-id="${id}"]`);
    if (!v || !row) return null;
    return row.getBoundingClientRect().top - v.getBoundingClientRect().top;
  }, id);

test('Chat: the steps, then a sent message near the top and its reply', async ({
  page,
}) => {
  await page.goto('/chat');
  await expect(viewport(page)).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Read the Trace page' }),
  ).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByText('Searched the docs')).toBeVisible();

  const message = page.getByRole('textbox', { name: 'Message' });
  await message.fill('How does it scroll?');
  await message.press('Enter');
  await expect(message).toHaveValue('');
  await expect(page.locator('[data-message-id=ask-1]')).toContainText(
    'How does it scroll?',
  );
  // Your message near the top: the previous one peeking above it.
  await expect
    .poll(async () => {
      const top = await rowTop(page, 'ask-1');
      return top !== null && top > 40 && top < 120;
    })
    .toBe(true);
  await expect(page.getByText('Searching the docs…')).toBeVisible();
  const reply = page.locator('[data-message-id=reply-1]');
  await expect(reply).toContainText('Each step of the reply', {
    timeout: 15_000,
  });
  await expect(page.getByRole('button', { name: 'Send' })).toBeEnabled();
});

test('Chat: Shift+Enter starts a new line', async ({ page }) => {
  await page.goto('/chat');
  const message = page.getByRole('textbox', { name: 'Message' });
  await message.fill('One');
  await message.press('Shift+Enter');
  await message.pressSequentially('Two');
  await expect(message).toHaveValue('One\nTwo');
  await expect(page.locator('[data-message-id=ask-1]')).toHaveCount(0);
});
