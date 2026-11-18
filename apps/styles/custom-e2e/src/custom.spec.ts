import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { twMerge } from 'cn';
// The app's own style, the one its parts must show (not a package: the app's).
// eslint-disable-next-line @nx/enforce-module-boundaries
import { button } from '../../custom/src/app/custom-style/button';

/**
 * The custom app: a page of components in the app's own style (a copy of
 * nova in src/app/custom-style, given to provideSemanticComponents).
 */

test('opens on its page, nothing in the console', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      errors.push(message.text());
    }
  });
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Custom style');
  await expect(page).toHaveTitle('Custom style');
  expect(errors).toEqual([]);
});

test("its parts take the app's style: a button has its classes", async ({
  page,
}) => {
  await page.goto('/');
  const signIn = page.getByRole('button', { name: 'Sign in', exact: true });
  // Read as cn merges them: every class of the style's default button.
  const wanted = twMerge(button({})).split(/\s+/).filter(Boolean);
  await expect
    .poll(async () => {
      const have = new Set(
        ((await signIn.getAttribute('class')) ?? '').split(/\s+/),
      );
      return wanted.filter((c) => !have.has(c));
    }, 'the custom style button classes missing')
    .toEqual([]);
});

test('no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  // Fonts in and what animates done: axe checks the colours it settles on.
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.allSettled(
      document
        .getAnimations()
        .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity)
        .map((a) => a.finished),
    );
  });
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});
