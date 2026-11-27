import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '../test';

/**
 * The server's own health across requests (the CI job `ssr`, its log in
 * `dist/ssr-showcase.log`): a page's code blocks are highlighted on the
 * server, by one Shiki for the whole process — not one per request, which
 * Shiki warns about past ten and which slowed the server as the suite ran.
 */
const log = join(__dirname, '../../../../dist/ssr-showcase.log');

/** Docs pages, each with its code blocks. */
const pages = [
  'button',
  'card',
  'dialog',
  'tabs',
  'input',
  'select',
  'checkbox',
  'switch',
  'badge',
  'avatar',
  'alert',
  'accordion',
].map((name) => `/docs/components/${name}`);

test.describe('SSR server', () => {
  test.skip(!process.env['SSR'], 'The CI job `ssr` only');

  test('one code highlighter for every request: Shiki made once', async ({
    page,
  }) => {
    test.skip(!existsSync(log), 'Reads the server’s log');
    test.slow();
    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator('h1').first()).toBeVisible();
    }
    expect(readFileSync(log, 'utf8')).not.toContain('[Shiki]');
  });
});
