import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { type Page, expect, test } from '../test';

/**
 * Every page and every demo on a phone 360px wide — Android's most common
 * width (the Pixel 7's 412 hid what a narrower phone cuts off):
 *
 * - nothing wider than the screen: the page never scrolls sideways and
 *   nothing is cut off at its edge (WCAG 1.4.10 Reflow);
 * - a demo not cut by its frame: on a phone the docs' margin (24px) and the
 *   frame's padding (`p-4`, 16px) leave it 280px. On its route the shell's
 *   gutter is set to those 40px (the screen still 360px wide), and the demo
 *   may reach into the padding, not past the frame's border, where it clips
 *   (a full-page demo has the whole screen, as on its route);
 * - every overlay a demo opens (`aria-haspopup`, a combobox: a popover, a
 *   menu, a select, a dialog, a sheet) on the screen, whole.
 *
 * What is wide on purpose passes: a box that scrolls (a table, a code block)
 * or a part that clips (a carousel's other slides, a marquee, a `clip-path`).
 * The docs' `main` clips what passes its edge (`overflow-x-clip`), so the
 * page's width alone would hide it: each element is measured.
 */

const WIDTH = 360;
/**
 * The docs' page margin (24px) and an example frame's padding on a phone
 * (16px, `p-4`; `p-10` from `sm`): a demo there has 280px of 360.
 */
const DOCS_GUTTER = 40;
/**
 * The frame's padding: a demo laid out in its 280px may reach into it —
 * nothing is cut — but not past it, where the frame clips (`overflow-hidden`).
 */
const FRAME_PADDING = 16;
/** The most overlays opened in a demo: the first ones. */
const MAX_TRIGGERS = 8;

interface ScRoute {
  readonly path: string;
  /** A layout's demo: the whole screen, no gutter. */
  readonly fullPage: boolean;
}

/** The routes that show a page: no redirect, no parent of children only. */
function routesOf(file: string): ScRoute[] {
  const lines = readFileSync(
    join(workspaceRoot, 'apps/showcase/src/app', file),
    'utf8',
  ).split('\n');
  const routes: ScRoute[] = [];
  let parent = '';
  lines.forEach((line, i) => {
    const match = line.match(/^( +)path: '([^']*)'/);
    if (!match) return;
    const [, indent, path] = match;
    if (path.includes(':') || path.includes('*')) return;
    // The route's own lines: up to the next route.
    const own: string[] = [];
    for (const next of lines.slice(i + 1)) {
      if (/^ +path: '/.test(next)) break;
      own.push(next);
    }
    const top = indent.length === 4;
    if (top) parent = path;
    if (own.some((l) => /redirectTo|children:/.test(l))) return;
    routes.push({
      path: '/' + (top ? [path] : [parent, path]).filter(Boolean).join('/'),
      fullPage: own.some((l) => /fullPage: true/.test(l)),
    });
  });
  return routes;
}

const pages = [
  ...new Map(
    [
      'app-routes.ts',
      ...[
        'overview',
        'packages',
        'guides',
        'components',
        'charts',
        'utilities',
        'recipes',
        'ai-elements',
      ].map((name) => `routes/${name}-routes.ts`),
    ]
      .flatMap(routesOf)
      .map((route) => [route.path, route]),
  ).values(),
];
const demos = routesOf('routes/demos-routes.ts');

test.describe('On a phone', { tag: '@mobile' }, () => {
  test.use({ viewport: { width: WIDTH, height: 780 } });

  test("the docs give a demo the screen less the gutter: an example's frame on a phone", async ({
    page,
  }) => {
    await open(page, '/docs/components/button');
    const preview = page
      .locator('app-demo-container [scFrame] > :first-child')
      .first();
    await expect(preview).toBeVisible();
    const content = await preview.evaluate((el) => {
      const style = getComputedStyle(el);
      return (
        el.getBoundingClientRect().width -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight)
      );
    });
    expect(Math.round(content)).toBe(WIDTH - 2 * DOCS_GUTTER);
  });

  for (const { path } of pages)
    test(`${path}: nothing wider than the screen`, async ({ page }) => {
      await open(page, path);
      await expect
        .poll(() => page.evaluate(measure, { demo: false, allowance: 0 }), {
          timeout: 5_000,
        })
        .toEqual([]);
    });

  for (const { path, fullPage } of demos) {
    const gutter = fullPage ? null : DOCS_GUTTER;

    test(`${path}: in its width, its overlays on the screen`, async ({
      page,
    }) => {
      test.setTimeout(120_000);
      await open(page, path, gutter);
      await expect
        .poll(
          () =>
            page.evaluate(measure, {
              demo: !fullPage,
              allowance: FRAME_PADDING,
            }),
          {
            timeout: 5_000,
          },
        )
        .toEqual([]);
      expect(await overlayProblems(page, path, gutter)).toEqual([]);
    });
  }
});

/**
 * Each overlay the demo opens, in turn — opened, measured at rest, closed
 * (the page loaded again if it stays open) — and what each shows past the
 * screen's edges.
 */
async function overlayProblems(
  page: Page,
  path: string,
  gutter: number | null,
): Promise<string[]> {
  const triggers = page.locator(
    'app-root > router-outlet + * :is([aria-haspopup]:not([aria-haspopup="false"]), [role="combobox"])',
  );
  const count = Math.min(await triggers.count(), MAX_TRIGGERS);
  const problems: string[] = [];
  for (let i = 0; i < count; i++) {
    const trigger = triggers.nth(i);
    const usable =
      (await trigger.isVisible()) &&
      (await trigger.isEnabled()) &&
      (await trigger.getAttribute('aria-disabled')) !== 'true';
    if (!usable) continue;
    const name = await trigger.evaluate((element) =>
      (element.getAttribute('aria-label') ?? element.textContent ?? '')
        .replace(/s+/g, ' ')
        .trim()
        .slice(0, 40),
    );
    await trigger.scrollIntoViewIfNeeded();
    await trigger.tap();
    // Some open as you type (a combobox's input): nothing to measure.
    const opened = await page
      .waitForFunction(overlayCount, undefined, { timeout: 2_000 })
      .then(() => true)
      .catch(() => false);
    if (opened) {
      await page.evaluate(settle);
      const found = await until(page, measureOverlays, 3_000);
      problems.push(...found.map((p) => `"${name}" opens ${p}`));
    }
    // Closed, the page as it was for the next one.
    await page.keyboard.press('Escape');
    const closed = await page
      .waitForFunction(`!(${overlayCount})()`, undefined, { timeout: 2_000 })
      .then(() => true)
      .catch(() => false);
    if (!closed) await open(page, path, gutter);
  }
  return problems;
}

/** `measure` asked again until it finds nothing, or `timeout` ms: what it finds last. */
async function until(
  page: Page,
  measure: () => string[],
  timeout: number,
): Promise<string[]> {
  const deadline = Date.now() + timeout;
  for (;;) {
    const found = await page.evaluate(measure);
    if (!found.length || Date.now() > deadline) return found;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

/**
 * The route's page, at rest: in, its code and images loaded (not forever:
 * some never idle), its fonts in, what slides in arrived — as in axe.ts. A
 * demo given the docs' gutter: its width as in its frame.
 */
async function open(page: Page, path: string, gutter: number | null = null) {
  await page.goto(path);
  await expect(page.locator('app-root > router-outlet + *')).toBeAttached({
    timeout: 15_000,
  });
  if (gutter !== null)
    await page.addStyleTag({
      content: `app-root { padding-inline: ${gutter}px !important; }`,
    });
  await page
    .waitForLoadState('networkidle', { timeout: 10_000 })
    .catch(() => undefined);
  await page.evaluate(settle);
}

/** Fonts in, and what animates (not forever) at its end. */
async function settle(): Promise<void> {
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
  )
    await Promise.race([
      Promise.allSettled(left.map((a) => a.finished)),
      new Promise((r) => setTimeout(r, deadline - performance.now())),
    ]);
  running().forEach((a) => a.finish());
}

/** The overlays open: CDK's panes with a size, open dialogs and popovers. */
function overlayCount(): number {
  return [
    ...document.querySelectorAll(
      '.cdk-overlay-pane, dialog[open], [popover]:popover-open',
    ),
  ].filter((e) => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  }).length;
}

/**
 * The elements past the screen's edge that nothing of their own holds — no
 * ancestor scrolls or clips them sideways, but the page (`html`, `body`, the
 * docs' `main`) — and, for a demo, past the width it is given: the shell's
 * gutter (its padding). Only the outermost of each: its children follow it.
 */
function measure({
  demo,
  allowance,
}: {
  demo: boolean;
  allowance: number;
}): string[] {
  const width = document.documentElement.clientWidth;
  const root = document.querySelector('app-root');
  const content = root?.querySelector(':scope > router-outlet + *');
  const page = new Set<Element>([
    document.documentElement,
    document.body,
    ...document.querySelectorAll('main[data-slot="sidebar-inset"]'),
  ]);
  /** Held by its own `clip-path`, or by an ancestor that scrolls or clips. */
  const held = (element: Element, top: Set<Element>) => {
    if (getComputedStyle(element).clipPath !== 'none') return true;
    for (let a = element.parentElement; a && !top.has(a); a = a.parentElement) {
      const style = getComputedStyle(a);
      if (style.overflowX !== 'visible' || style.clipPath !== 'none')
        return true;
    }
    return false;
  };
  /** In a fixed box: the screen's, not the page's (a toast, a bar). */
  const fixed = (element: Element) => {
    for (let a: Element | null = element; a; a = a.parentElement)
      if (getComputedStyle(a).position === 'fixed') return true;
    return false;
  };
  const shown = (element: Element) => {
    const style = getComputedStyle(element);
    if (style.visibility === 'hidden' || style.display === 'contents')
      return false;
    const r = element.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const label = (element: Element, [from, to]: [number, number]) => {
    const r = element.getBoundingClientRect();
    const slot = element.getAttribute('data-slot');
    const classes = (element.getAttribute('class') ?? '').slice(0, 80);
    return (
      `<${element.tagName.toLowerCase()}${slot ? ` data-slot="${slot}"` : ''}` +
      ` class="${classes}"> ${Math.round(r.left)}…${Math.round(r.right)}` +
      ` past ${Math.round(from)}…${Math.round(to)}`
    );
  };
  /** The outermost elements of `scope` past [from, to]. */
  const past = (
    scope: Element[],
    top: Set<Element>,
    [from, to]: [number, number],
  ) => {
    const found = scope.filter((element) => {
      if (!shown(element) || held(element, top)) return false;
      const r = element.getBoundingClientRect();
      return r.right > to + 1 || r.left < from - 1;
    });
    return found
      .filter((element) => !found.includes(element.parentElement as Element))
      .slice(0, 10)
      .map((element) => label(element, [from, to]));
  };

  const screen = past([...document.body.querySelectorAll('*')], page, [
    0,
    width,
  ]);
  if (!demo || !root || !content) return screen;
  // The demo's width: the shell's box, less its gutter.
  const box = root.getBoundingClientRect();
  const style = getComputedStyle(root);
  const area: [number, number] = [
    box.left + parseFloat(style.paddingLeft) - allowance,
    box.right - parseFloat(style.paddingRight) + allowance,
  ];
  const inDemo = [content, ...content.querySelectorAll('*')].filter(
    (element) => !fixed(element),
  );
  return [
    ...screen,
    ...past(inDemo, new Set([root]), area).map((p) => `cut by its frame: ${p}`),
  ];
}

/** What the open overlays show past the screen's edges, held by nothing of theirs. */
function measureOverlays(): string[] {
  const [width, height] = [
    document.documentElement.clientWidth,
    window.innerHeight,
  ];
  const found: string[] = [];
  for (const overlay of document.querySelectorAll(
    '.cdk-overlay-pane, dialog[open], [popover]:popover-open',
  )) {
    const elements = [overlay, ...overlay.querySelectorAll('*')].filter((e) => {
      const style = getComputedStyle(e);
      if (style.visibility === 'hidden' || style.display === 'contents')
        return false;
      const r = e.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      // Held by its own clip, or a box of the overlay's that scrolls or clips.
      if (style.clipPath !== 'none') return false;
      if (e !== overlay)
        for (let a = e.parentElement; a; a = a.parentElement) {
          const s = getComputedStyle(a);
          if (s.overflowX !== 'visible' || s.overflowY !== 'visible')
            return false;
          if (a === overlay) break;
        }
      return (
        r.left < -1 ||
        r.right > width + 1 ||
        r.top < -1 ||
        r.bottom > height + 1
      );
    });
    const outer = elements.filter(
      (e) => !elements.includes(e.parentElement as Element),
    );
    for (const e of outer.slice(0, 5)) {
      const r = e.getBoundingClientRect();
      const slot = e.getAttribute('data-slot');
      found.push(
        `<${e.tagName.toLowerCase()}${slot ? ` data-slot="${slot}"` : ''}>` +
          ` ${Math.round(r.left)}…${Math.round(r.right)} × ${Math.round(r.top)}…${Math.round(r.bottom)}` +
          ` past the screen (${width} × ${height})`,
      );
    }
  }
  return found;
}
