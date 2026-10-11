import { expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

test.describe('Basic Kanban Board Demo', () => {
  let errors: string[];

  test.beforeEach(async ({ page }) => {
    errors = collectErrors(page);
    await page.goto('/demos/kanban-board/basic-kanban-board-demo');
    await expect(page.locator('[data-slot=kanban-card]').first()).toBeVisible();
  });

  test.afterEach(() => {
    expect(errors).toEqual([]);
  });

  test('board is named and explains the keyboard moves', async ({ page }) => {
    const board = page.getByRole('region', { name: 'Project board' });
    await expect(board).toHaveAttribute(
      'aria-describedby',
      'basic-kanban-hint',
    );
    await expect(page.locator('#basic-kanban-hint')).toContainText('Alt');
  });

  test('Alt + arrows move a card between and within columns', async ({
    page,
  }) => {
    const backlog = page.getByRole('list', { name: 'Backlog cards' });
    const todo = page.getByRole('list', { name: 'To Do cards' });
    const card = backlog.getByRole('listitem').first();
    const title = (await card.getAttribute('aria-label')) as string;

    await card.focus();
    await press(page, 'Alt+ArrowRight');
    const moved = todo.getByRole('listitem', { name: title });
    await expect(moved).toBeVisible();
    await expect(moved).toBeFocused();
    await expect(page.locator('[aria-live]')).toContainText(
      `${title} moved to To Do`,
    );

    // Last in To Do; Alt+ArrowUp moves it one place up.
    const count = await todo.getByRole('listitem').count();
    await expect(todo.getByRole('listitem').nth(count - 1)).toHaveAttribute(
      'aria-label',
      title,
    );
    await press(page, 'Alt+ArrowUp');
    await expect(todo.getByRole('listitem').nth(count - 2)).toHaveAttribute(
      'aria-label',
      title,
    );
    await expect(todo.getByRole('listitem', { name: title })).toBeFocused();
  });

  test('priority is text and the delete button shows on focus', async ({
    page,
  }) => {
    const firstCard = page.locator('[data-slot=kanban-card]').first();
    await expect(firstCard).not.toContainText('!');
    const del = firstCard.getByRole('button', { name: 'Delete card' });
    await del.focus();
    await expect(del).toHaveCSS('opacity', '1');
  });
});
