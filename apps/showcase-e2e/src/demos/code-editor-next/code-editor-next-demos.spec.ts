import { type Page, expect, test } from '@playwright/test';
import { collectErrors, press } from '../../interaction';

const demo = (name: string) =>
  `/demos/code-editor-next/${name}-code-editor-next-demo`;
const editor = (page: Page, name?: string) =>
  name
    ? page.getByRole('textbox', { name, exact: true })
    : page.locator('.cm-content').first();
const line = (page: Page, n: number) =>
  page.locator('.cm-content .cm-line').nth(n - 1);

let errors: string[];

test.beforeEach(({ page }) => {
  errors = collectErrors(page);
});

test.afterEach(() => {
  expect(errors).toEqual([]);
});

test('Basic: highlighted; typed; undone; Tab indents', async ({ page }) => {
  await page.goto(demo('basic'));
  const content = editor(page, 'counter.ts');
  await expect(content).toHaveAttribute('aria-multiline', 'true');
  await expect(page.locator('.cm-content .cm-line')).toHaveCount(13);
  // Colored by Shiki.
  await expect
    .poll(() =>
      page.locator('.cm-content span[style*="--shiki-light"]').count(),
    )
    .toBeGreaterThan(20);
  // Typed at the end — colored too, after the pause.
  await line(page, 13).click();
  await press(page, 'End');
  await press(page, 'Enter');
  await page.keyboard.type('const answer = 42;');
  await expect(page.locator('.cm-content .cm-line')).toHaveCount(14);
  await expect(line(page, 14)).toHaveText('const answer = 42;');
  await expect
    .poll(() => line(page, 14).locator('span[style*="--shiki-light"]').count())
    .toBeGreaterThan(0);
  // Undone.
  await press(page, 'ControlOrMeta+z');
  await expect(page.locator('.cm-content .cm-line')).toHaveCount(13);
  // Tab indents the line; Shift+Tab takes it back.
  await line(page, 2).click();
  await press(page, 'Tab');
  await expect(line(page, 2)).toHaveText('  ');
  await press(page, 'Shift+Tab');
  await expect(line(page, 2)).toHaveText('');
  await expect(content).toBeFocused();
});

test('Basic: Escape, then Shift+Tab, moves on', async ({ page }) => {
  await page.goto(demo('basic'));
  const content = editor(page, 'counter.ts');
  await line(page, 1).click();
  await expect(content).toBeFocused();
  // (Nothing focusable follows it on this page: back to the copy button.)
  await press(page, 'Escape');
  await press(page, 'Shift+Tab');
  await expect(page.getByRole('button', { name: 'Copy code' })).toBeFocused();
  await expect(line(page, 1)).toHaveText(
    "import { Component, signal } from '@angular/core';",
  );
});

test('In a form: named by its label; required; run', async ({ page }) => {
  await page.goto(demo('form'));
  const content = editor(page, 'Query');
  await page.getByRole('button', { name: 'Run' }).click();
  await expect(page.getByRole('alert')).toHaveText('Write a query.');
  await expect(content).toHaveAttribute('aria-invalid', 'true');
  await content.click();
  await page.keyboard.type('SELECT 1;');
  await press(page, 'Enter');
  await page.keyboard.type('SELECT 2;');
  await page.getByRole('button', { name: 'Run' }).click();
  await expect(page.getByRole('status')).toHaveText('Ran 2 lines.');
  await expect(content).not.toHaveAttribute('aria-invalid');
});

test('Languages: switched, highlighted', async ({ page }) => {
  await page.goto(demo('languages'));
  await page.getByRole('button', { name: 'Python' }).click();
  await expect(line(page, 1)).toHaveText('def greet(name: str) -> str:');
  await expect
    .poll(() =>
      page.locator('.cm-content span[style*="--shiki-light"]').count(),
    )
    .toBeGreaterThan(5);
});

test('Wrap: lines wrapped, no numbers', async ({ page }) => {
  await page.goto(demo('wrap'));
  await expect(page.locator('.cm-content')).toHaveClass(/cm-lineWrapping/);
  await expect(page.locator('.cm-gutters')).toHaveCount(0);
  await expect
    .poll(() =>
      page
        .locator('.cm-scroller')
        .evaluate((scroller) => scroller.scrollWidth - scroller.clientWidth),
    )
    .toBeLessThanOrEqual(1);
});

test('Read-only and disabled: not edited', async ({ page }) => {
  await page.goto(demo('readonly'));
  const readOnly = editor(page, 'Read-only');
  const disabled = editor(page, 'Disabled');
  await expect(readOnly).toHaveAttribute('aria-readonly', 'true');
  await expect(disabled).toHaveAttribute('aria-disabled', 'true');
  await expect(disabled).toHaveAttribute('contenteditable', 'false');
  await readOnly.click();
  await page.keyboard.type('x');
  await expect(readOnly).not.toContainText('x"');
  await expect(readOnly.locator('.cm-line').first()).toHaveText('{');
});
