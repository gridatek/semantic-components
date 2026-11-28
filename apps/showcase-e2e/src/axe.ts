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
    // A heavy page (the Editor's) under CI load takes seconds to react.
    await expect(page.locator('html')).toHaveClass(/\bdark\b/, {
      timeout: 15_000,
    });
  }
  // Settled: the page's code loaded (its route is lazy) — network idle, but
  // not forever: a page loading images (or Firefox) may never get there —
  // the page shown (its heading), its fonts in, and what fades or slides in
  // arrived: colours measured mid-fade fail contrast. Asked again until none
  // runs: WebKit starts some of a theme switch's transitions (an input's
  // colour) after the first look, which then measured the light theme's
  // text on the dark one's background. What still runs at the deadline is
  // taken to its end: under load, WebKit's clock lags (a 150 ms transition
  // lasting seconds), and axe checks the colours the page settles on.
  await page
    .waitForLoadState('networkidle', { timeout: 10_000 })
    .catch(() => undefined);
  await page.locator('h1').first().waitFor({ timeout: 15_000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
    const deadline = performance.now() + 3000;
    const running = () =>
      document
        .getAnimations()
        .filter(
          (a) =>
            a.playState === 'running' &&
            a.effect?.getComputedTiming().iterations !== Infinity,
        );
    for (
      let left = running();
      left.length && performance.now() < deadline;
      left = running()
    ) {
      await Promise.race([
        Promise.allSettled(left.map((a) => a.finished)),
        new Promise((resolve) =>
          setTimeout(resolve, deadline - performance.now()),
        ),
      ]);
    }
    running().forEach((a) => a.finish());
  });
  const results = await new AxeBuilder({ page })
    .exclude('[inert]')
    .exclude('[data-disabled="true"]')
    // A Usage's dev-only iframe (a layout's demo on its own route): a page in
    // a page — its main beside the docs page's. Not in production.
    .exclude('app-usage-code app-dev-only iframe')
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
  expect(await orphanLabels(page)).toEqual([]);
  expect(await redundantLinks(page)).toEqual([]);
}

/**
 * Adjacent links to one URL (WAVE's "Redundant link"), as `"first" and
 * "second": url`: two tab stops, read twice, for one place — keep one link,
 * or give a placeholder its own fragment. In the page's order, hidden links
 * too, as WAVE reads the HTML: one link per width, the other hidden, is two
 * (the header's GitHub link). Left out: what is inert, and what an editor
 * holds (`contenteditable`: its links are text there, no tab stops — an
 * editor beside the view of its content).
 */
export async function redundantLinks(page: Page): Promise<string[]> {
  return page.locator('a[href]').evaluateAll((all) => {
    const shown = (all as HTMLAnchorElement[]).filter(
      (a) => !a.closest('[inert], [contenteditable="true"]'),
    );
    const name = (a: HTMLAnchorElement) =>
      (a.getAttribute('aria-label') ?? a.textContent ?? '')
        .trim()
        .replace(/\s+/g, ' ')
        .slice(0, 40);
    return shown.flatMap((a, i) =>
      i > 0 && a.href === shown[i - 1].href
        ? [
            `"${name(shown[i - 1])}" and "${name(a)}": ${a.getAttribute('href')}`,
          ]
        : [],
    );
  });
}

/**
 * The page's labels tied to no control (WAVE's "Orphaned form label"), as
 * HTML: axe checks from the control's side only — a control with no name —
 * so a `<label>` naming nothing passes it. Tied: by `for` or by wrapping
 * (`label.control`), or named by a custom control's `aria-labelledby` — a
 * field's label, which then has no `for`: a `for` tying to nothing (a
 * custom control, an id not there) fails even so. Left out as axe leaves them: what is inert, disabled, in the Usage's
 * dev-only iframe (another document).
 */
export async function orphanLabels(page: Page): Promise<string[]> {
  return page.locator('label').evaluateAll((labels) => {
    const referenced = new Set(
      [...document.querySelectorAll('[aria-labelledby]')].flatMap((e) =>
        (e.getAttribute('aria-labelledby') ?? '').split(/\s+/),
      ),
    );
    return (labels as HTMLLabelElement[])
      .filter(
        (label) =>
          !label.control &&
          (label.hasAttribute('for') ||
            !(label.id && referenced.has(label.id))) &&
          !label.closest('[inert], [data-disabled="true"]'),
      )
      .map((label) => label.outerHTML);
  });
}
