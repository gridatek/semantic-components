import { workspaceRoot } from '@nx/devkit';
import type { Page } from '@playwright/test';
import { join } from 'node:path';

/**
 * Serves Emojibase's data from node_modules instead of the CDN, so the
 * tests don't depend on the network.
 */
export async function serveEmojibase(page: Page): Promise<void> {
  await page.route(
    'https://cdn.jsdelivr.net/npm/emojibase-data/**',
    (route) => {
      const path = new URL(route.request().url()).pathname.replace(
        '/npm/emojibase-data/',
        '',
      );
      return route.fulfill({
        path: join(workspaceRoot, 'node_modules/emojibase-data', path),
        contentType: 'application/json',
      });
    },
  );
}
