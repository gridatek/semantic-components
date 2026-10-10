import type { Locator, Page } from '@playwright/test';

/**
 * Presses a key, holding it long enough for a render to happen before the
 * next key. `@angular/aria` comboboxes relay keys to their popup once per
 * render, so keys pressed within the same frame would be coalesced.
 */
export async function press(page: Page, key: string): Promise<void> {
  await page.keyboard.press(key, { delay: 50 });
}

/** Types text one paced key at a time (see `press`). */
export async function type(page: Page, text: string): Promise<void> {
  await page.keyboard.type(text, { delay: 50 });
}

/** Collects page errors and `console.error` messages for later assertion. */
export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message.split('\n')[0]));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text().split('\n')[0]);
  });
  return errors;
}

/** Text of the element referenced by `aria-activedescendant`, if any. */
export async function activeDescendantText(
  owner: Locator,
): Promise<string | null> {
  const id = await owner.getAttribute('aria-activedescendant');
  if (!id) return null;
  return (
    (await owner.page().locator(`[id="${id}"]`).textContent())?.trim() ?? null
  );
}

/** Number of `[role=menu]` elements actually shown. */
export function openMenuCount(page: Page): Promise<number> {
  return page.evaluate(
    () =>
      Array.from(document.querySelectorAll('[role=menu]')).filter(
        (m) =>
          getComputedStyle(m).display !== 'none' &&
          m.getBoundingClientRect().height > 0,
      ).length,
  );
}
