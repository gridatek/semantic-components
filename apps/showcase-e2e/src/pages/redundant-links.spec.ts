import { expect, test } from '@playwright/test';
import { redundantLinks } from '../axe';

/**
 * Adjacent links to the same URL (WAVE's "Redundant link"): two tab stops,
 * read twice, for one place. The page-level helper checks it — hidden
 * links too, as WAVE reads the HTML (one link per width, the other hidden,
 * is two). Left out: an inert part, an editor's content. Plain markup: no
 * app.
 */
test("two links in a row to one URL are found, a hidden one too (another width's); with another link between, inert, or in an editor (no tab stop), not", async ({
  page,
}) => {
  await page.setContent(`
    <main>
      <a href="/docs">Docs</a> <a href="/docs">Read the docs</a>
      <a href="/a">A</a> <a href="/b">B</a> <a href="/a">A again</a>
      <a href="/c">C</a> <a href="/c" style="display: none">C, another width</a>
      <a href="/d">D</a> <div inert><a href="/d">D, inert</a></div>
      <a href="/page#one">One</a> <a href="/page#two">Two</a>
      <div contenteditable="true"><p>A <a href="/e">link</a></p></div>
      <div><p>A <a href="/e">link</a>, the view of it</p></div>
    </main>
  `);
  expect(await redundantLinks(page)).toEqual([
    '"Docs" and "Read the docs": /docs',
    '"C" and "C, another width": /c',
  ]);
});
