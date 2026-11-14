import {
  type ConsoleMessage,
  type Locator,
  type Page,
  expect,
} from '@playwright/test';

/**
 * Focuses an element once it can take focus. A `<div>` made focusable by a
 * `tabindex` host binding (an `@angular/aria` combobox trigger) may not be
 * yet just after the page loads, and `focus()` on it then does nothing.
 */
export async function focus(locator: Locator): Promise<void> {
  await expect(async () => {
    await locator.focus();
    await expect(locator).toBeFocused({ timeout: 100 });
  }).toPass();
}

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

/**
 * A message about another site's resource, not our page: Firefox logs the
 * cookies refused to an image from github.com (the avatars) as console
 * errors, and GitHub sometimes refuses a burst of them (403).
 */
export function fromOtherSite(m: ConsoleMessage, page: Page): boolean {
  const from = m.location().url;
  if (!/^https?:/.test(from)) return false;
  return new URL(from).origin !== new URL(page.url()).origin;
}

/**
 * Lets the page write to the clipboard. Chromium needs the permission;
 * Firefox and WebKit allow a write after a click, and don't know these
 * permissions (`grantPermissions` throws there).
 */
export async function allowClipboard(page: Page): Promise<void> {
  const context = page.context();
  if (context.browser()?.browserType().name() !== 'chromium') return;
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
}

/** Collects page errors and `console.error` messages for later assertion. */
export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message.split('\n')[0]));
  page.on('console', (m) => {
    if (m.type() === 'error' && !fromOtherSite(m, page))
      errors.push(m.text().split('\n')[0]);
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

/**
 * A part disabled without native `disabled` (a link, a pagination link: only
 * `aria-disabled`) still looks it: faded, and no pointer.
 */
export async function expectLooksDisabled(locator: Locator): Promise<void> {
  await expect(locator).toHaveAttribute('aria-disabled', 'true');
  await expect(locator).toHaveCSS('opacity', '0.5');
  await expect(locator).toHaveCSS('pointer-events', 'none');
}
