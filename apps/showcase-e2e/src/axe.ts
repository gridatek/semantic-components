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
  expect(await formLabelProblems(page)).toEqual([]);
  expect(await smallText(page)).toEqual([]);
  expect(await layoutTables(page)).toEqual([]);
}

/**
 * WAVE's "Layout table", as `table#id: first text`: a table with no header
 * cell (`<th>`). A table holds data, and data has column names: a header
 * row — visually hidden (`<thead class="sr-only">`) if the look has none.
 */
export async function layoutTables(page: Page): Promise<string[]> {
  return page
    .locator('table')
    .evaluateAll((tables) =>
      tables
        .filter((table) => !table.querySelector('th'))
        .map(
          (table) =>
            `table${table.id ? '#' + table.id : ''}: ${(table.querySelector('td')?.textContent ?? '').trim().slice(0, 40)}`,
        ),
    );
}

/**
 * WAVE's "Very small text", as `<size>: <text>`: visible text of 10px or
 * less — `aria-hidden` text too, it is still seen. 11px is the floor
 * (`text-[0.6875rem]`): smaller isn't readable for many, whatever a
 * reference does. Left out: what isn't shown, a drawing's text (SVG), and a
 * PDF page's text layer (pdf.js: its words, transparent, at the page's zoom).
 */
export async function smallText(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const found = new Set<string>();
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
    );
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent?.trim();
      const element = node.parentElement;
      if (
        !text ||
        !element ||
        element.closest('svg, script, style, .textLayer')
      )
        continue;
      if (!element.getClientRects().length) continue;
      const style = getComputedStyle(element);
      if (style.visibility === 'hidden') continue;
      const size = parseFloat(style.fontSize);
      if (size <= 10)
        found.add(`${Math.round(size * 100) / 100}px: ${text.slice(0, 40)}`);
    }
    return [...found];
  });
}

/**
 * WAVE's "Missing form label" and "Multiple form labels", as `no label: …`
 * and `two labels: …`: a form control (an input, a select, a textarea) with
 * no name — no label, `aria-label` or `aria-labelledby` — hidden ones too
 * (axe skips them; WAVE reads the HTML: a file input's native picker), and
 * one with more than one label. Left out: hidden inputs (`type="hidden"`),
 * buttons, what is inert, and an editor's content.
 */
export async function formLabelProblems(page: Page): Promise<string[]> {
  return page.locator('input, select, textarea').evaluateAll((controls) =>
    (controls as HTMLInputElement[])
      .filter(
        (control) =>
          !['hidden', 'button', 'submit', 'reset', 'image'].includes(
            control.type,
          ) && !control.closest('[inert], [contenteditable="true"]'),
      )
      .flatMap((control) => {
        const html = control.outerHTML.replace(/\s+/g, ' ').slice(0, 160);
        const labels = control.labels?.length ?? 0;
        if (labels > 1) return [`two labels: ${html}`];
        const named =
          labels > 0 ||
          !!control.getAttribute('aria-label')?.trim() ||
          !!control.getAttribute('aria-labelledby')?.trim();
        return named ? [] : [`no label: ${html}`];
      }),
  );
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
