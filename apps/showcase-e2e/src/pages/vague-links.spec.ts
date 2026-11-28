import { expect, test } from '@playwright/test';
import { vagueLinks } from '../axe';

/**
 * WAVE's "Suspicious link text": a link that says nothing out of context
 * ("Learn more", "click here", "Details"). Its text names where it goes — the
 * rest in an `sr-only` span when the look keeps it short. Plain markup: no
 * app.
 */
test('a link reading only "Learn more" or "Details" is found; one saying what about, even out of sight, is not', async ({
  page,
}) => {
  await page.setContent(`
    <main>
      <a href="/a">Learn more</a>
      <a href="/b">Details</a>
      <a href="/c">Learn more <span class="sr-only">about projects</span></a>
      <a href="/d">Pricing</a>
      <a href="/docs/components/link">Link</a>
      <a href="/docs/components/link">Link<span class="sr-only"> component</span></a>
    </main>
  `);
  // "Link" alone too, even the Link component's page: WAVE flags it.
  expect(await vagueLinks(page)).toEqual(['Learn more', 'Details', 'Link']);
});
