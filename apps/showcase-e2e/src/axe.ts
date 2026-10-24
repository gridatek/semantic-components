import AxeBuilder from '@axe-core/playwright';
import { Page, expect } from '@playwright/test';

/**
 * No axe violations on the page. `dark`: in dark mode — the browser's color
 * scheme dark, which the theme follows by default (the `.dark` class).
 */
export async function expectNoA11yViolations(
  page: Page,
  { dark = false }: { dark?: boolean } = {},
) {
  if (dark) {
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  }
  // Settled: the page's code loaded (its route is lazy) — network idle, but
  // not forever: a page loading images (or Firefox) may never get there —
  // the page shown (its heading), its fonts in, and what fades or slides in
  // arrived: colours measured mid-fade fail contrast.
  await page
    .waitForLoadState('networkidle', { timeout: 10_000 })
    .catch(() => undefined);
  await page.locator('h1').first().waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    const finite = document
      .getAnimations()
      .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity);
    await Promise.race([
      Promise.allSettled(finite.map((a) => a.finished)),
      new Promise((resolve) => setTimeout(resolve, 3000)),
    ]);
  });
  const results = await new AxeBuilder({ page })
    .exclude('[inert]')
    .exclude('[data-disabled="true"]')
    .analyze();
  // Label in name, on a tree item named by a label (the org chart's card):
  // axe counts as visible text the item's children — tree items of their
  // own, named apart — and what is aria-hidden (an avatar's initials). The
  // item passes if its text without them is its label's.
  for (const violation of results.violations) {
    if (violation.id !== 'label-content-name-mismatch') continue;
    const kept = [];
    for (const node of violation.nodes) {
      const labelInName = await page.evaluate((selector) => {
        const item = document.querySelector(selector);
        const labels = item?.getAttribute('aria-labelledby');
        if (!item?.matches('[role=treeitem]') || !labels) return false;
        const text = (element: Element) => {
          const copy = element.cloneNode(true) as Element;
          copy
            .querySelectorAll('[role=group], [aria-hidden=true]')
            .forEach((e) => e.remove());
          return (copy.textContent ?? '').replace(/\s+/g, '');
        };
        const label = labels
          .split(' ')
          .map((id) => document.getElementById(id))
          .map((e) => (e ? text(e) : ''))
          .join('');
        return text(item) === label;
      }, String(node.target[0]));
      if (!labelInName) kept.push(node);
    }
    violation.nodes = kept;
  }
  expect(results.violations.filter((v) => v.nodes.length)).toEqual([]);
}
