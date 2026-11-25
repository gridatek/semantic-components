import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '../test';

/**
 * Every page and every demo on a phone: nothing wider than the screen. The
 * page never scrolls sideways and nothing is cut off at its edge (WCAG 1.4.10
 * Reflow); what is wide scrolls in a box of its own (a table, a code block)
 * or is clipped on purpose by its component (a carousel's other slides, a
 * marquee). The docs' `main` clips what passes its edge (`overflow-x-clip`),
 * so the page's width alone would hide it: each element is measured.
 */

/** The routes that show a page: no redirect, no parent of children only. */
function pagesOf(file: string): string[] {
  const lines = readFileSync(
    join(workspaceRoot, 'apps/showcase/src/app', file),
    'utf8',
  ).split('\n');
  const routes: string[] = [];
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
    routes.push(
      '/' + (top ? [path] : [parent, path]).filter(Boolean).join('/'),
    );
  });
  return routes;
}

const routes = [
  ...new Set([
    ...pagesOf('app-routes.ts'),
    ...[
      'overview',
      'packages',
      'guides',
      'components',
      'charts',
      'utilities',
      'recipes',
      'ai-elements',
      'demos',
    ].flatMap((file) => pagesOf(`routes/${file}-routes.ts`)),
  ]),
];

test.describe('On a phone', { tag: '@mobile' }, () => {
  for (const route of routes)
    test(`${route}: nothing wider than the screen`, async ({ page }) => {
      await page.goto(route);
      // The route's page in: the shell's outlet followed by it.
      await expect(page.locator('app-root > router-outlet + *')).toBeAttached({
        timeout: 15_000,
      });
      // Its code and images loaded (not forever: some never idle), its fonts
      // in, and what slides in arrived — measured at rest, as in axe.ts.
      await page
        .waitForLoadState('networkidle', { timeout: 10_000 })
        .catch(() => undefined);
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
        )
          await Promise.race([
            Promise.allSettled(left.map((a) => a.finished)),
            new Promise((r) => setTimeout(r, deadline - performance.now())),
          ]);
        running().forEach((a) => a.finish());
      });
      // Asked again until it holds: a layout measured once it has settled
      // (a masonry placing its items, a chart taking its width).
      await expect
        .poll(() => page.evaluate(overflowing), { timeout: 5_000 })
        .toEqual([]);
    });
});

/**
 * The elements past the screen's edge that nothing of their own holds: no
 * ancestor scrolls or clips them sideways, but the page (`html`, `body`, the
 * docs' `main`). Only the outermost of each: its children follow it.
 */
function overflowing(): string[] {
  const width = document.documentElement.clientWidth;
  const page = new Set<Element>([
    document.documentElement,
    document.body,
    ...document.querySelectorAll('main[data-slot="sidebar-inset"]'),
  ]);
  /** Held by an ancestor of its own that scrolls or clips sideways. */
  const held = (element: Element) => {
    for (let a = element.parentElement; a && !page.has(a); a = a.parentElement)
      if (getComputedStyle(a).overflowX !== 'visible') return true;
    return false;
  };
  const past = (element: Element) => {
    const style = getComputedStyle(element);
    if (style.visibility === 'hidden' || style.display === 'contents')
      return false;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return false;
    return rect.right > width + 1 || rect.left < -1;
  };
  const found = [...document.body.querySelectorAll('*')].filter(
    (element) => past(element) && !held(element),
  );
  return found
    .filter((element) => !found.includes(element.parentElement as Element))
    .slice(0, 10)
    .map((element) => {
      const rect = element.getBoundingClientRect();
      const slot = element.getAttribute('data-slot');
      const classes = (element.getAttribute('class') ?? '').slice(0, 80);
      return (
        `<${element.tagName.toLowerCase()}${slot ? ` data-slot="${slot}"` : ''}` +
        ` class="${classes}"> ${Math.round(rect.left)}…${Math.round(rect.right)} of ${width}`
      );
    });
}
