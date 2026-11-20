import { expectNoA11yViolations } from '../axe';
import { fromOtherSite } from '../interaction';
import { expect, test } from '../test';

test.describe('Typeset Page', () => {
  test('each sample in its tab, set by the container; nothing stripped from it', async ({
    page,
  }) => {
    const messages: string[] = [];
    page.on('console', (m) => {
      // The navbar asks GitHub for the stars: another site, not ours.
      if (
        (m.type() === 'warning' || m.type() === 'error') &&
        !fromOtherSite(m, page)
      )
        messages.push(m.text().split('\n')[0]);
    });
    await page.goto('/typeset');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Typeset');
    await expect(
      page.getByRole('link', { name: 'Get started', exact: true }),
    ).toHaveAttribute('href', '/docs/guides/typeset');
    const tabs = page.getByRole('tablist', { name: 'Samples' });
    await expect(tabs.getByRole('tab')).toHaveText([
      'Docs',
      'Chat',
      'Article',
      'Changelog',
      'Notes',
    ]);

    // Docs, first: plain elements, set by the container alone.
    const panel = page.getByRole('tabpanel');
    const content = panel.locator('article.typeset');
    await expect(
      content.getByRole('heading', { name: 'Lazy-loading routes' }),
    ).toHaveCSS('font-weight', '600');
    await expect(content.locator('ol')).toHaveCSS('list-style-type', 'decimal');
    await expect(content.locator('pre').first()).toHaveCSS(
      'font-family',
      /mono|Mono|monospace/,
    );

    // Each tab, its sample.
    const headings: Record<string, string> = {
      Chat: '1. See what runs',
      Article: 'The Space Between Lines',
      Changelog: 'Acme Notes changelog',
      Notes: 'Design review — November 14',
    };
    for (const [tab, heading] of Object.entries(headings)) {
      await tabs.getByRole('tab', { name: tab }).click();
      await expect(
        content.getByRole('heading', { name: heading }),
      ).toBeVisible();
    }

    // The chat's question: page chrome, outside the container.
    await tabs.getByRole('tab', { name: 'Chat' }).click();
    const question = panel.locator('[data-slot=bubble]');
    await expect(question).toContainText('search box');
    await expect(question.locator('xpath=ancestor::article')).toHaveCount(0);
    expect(messages).toEqual([]);
  });

  test('no accessibility violations, light and dark', async ({ page }) => {
    await page.goto('/typeset');
    await expect(page.locator('article.typeset h2').first()).toBeVisible();
    await expectNoA11yViolations(page);
    await expectNoA11yViolations(page, { dark: true });
  });
});
