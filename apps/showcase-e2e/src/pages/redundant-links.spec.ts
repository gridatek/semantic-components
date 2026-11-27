import { expect, test } from '@playwright/test';
import { redundantLinks } from '../axe';

/**
 * Adjacent links to the same URL (WAVE's "Redundant link"): two tab stops,
 * read twice, for one place. The page-level helper checks it; what isn't
 * shown (another width's link, an inert or hidden part) is left out. Plain
 * markup: no app.
 */
test('two shown links in a row to one URL are found; with another link between, one hidden, or one in an editor (no tab stop), not', async ({
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
  ]);
});
