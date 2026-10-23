import { type Locator, type Page, expect } from '@playwright/test';

/**
 * Mobile-first checks, for tests tagged `@mobile` (they run in the phone
 * projects: a small screen, touch).
 */

/** The page doesn't scroll sideways: nothing wider than the screen. */
export async function expectNoHorizontalScroll(page: Page): Promise<void> {
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(0);
}

/** The interactive elements a target-size check looks at. */
const TARGETS = [
  'button',
  'a[href]',
  'input:not([type="hidden"])',
  'select',
  'textarea',
  '[role="button"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="tab"]',
  '[role="option"]',
  '[role="menuitem"]',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[tabindex="0"]',
].join(', ');

/**
 * Every visible interactive element in `scope` is at least `min` × `min` CSS
 * pixels — WCAG 2.5.8 Target Size (Minimum): 24. A control inside its
 * `<label>` is measured by the label (clicking the label works it); links
 * inside running text are exempt (the inline exception), and so are hidden or
 * disabled ones.
 * Fails with the list of the elements too small.
 */
export async function expectTargetSize(
  scope: Locator,
  min = 24,
): Promise<void> {
  const small = await scope.evaluate(
    (root, { selector, min }) => {
      const found: string[] = [];
      for (const element of root.querySelectorAll<HTMLElement>(selector)) {
        const style = getComputedStyle(element);
        if (style.visibility === 'hidden' || style.display === 'none') continue;
        if (element.closest('[inert], [aria-hidden="true"]')) continue;
        if ((element as HTMLButtonElement).disabled) continue;
        // Inline: a link in a sentence.
        if (
          element.matches('a') &&
          element.closest('p, li') &&
          style.display === 'inline'
        )
          continue;
        // A control in its label is clicked through the label: that's the target.
        const box = (
          element.closest('label') ?? element
        ).getBoundingClientRect();
        if (!box.width || !box.height) continue;
        if (box.width < min || box.height < min) {
          const name =
            element.getAttribute('aria-label') ||
            element.textContent?.trim().slice(0, 30) ||
            element.getAttribute('data-slot') ||
            element.tagName.toLowerCase();
          found.push(
            `${name} (${Math.round(box.width)}×${Math.round(box.height)})`,
          );
        }
      }
      return found;
    },
    { selector: TARGETS, min },
  );
  expect(small, `targets smaller than ${min}×${min}`).toEqual([]);
}
