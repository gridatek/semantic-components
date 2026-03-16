import { test } from '@playwright/test';
import { expectNoA11yViolations } from '../axe';

test.describe('MCP Server Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/getting-started/mcp-server');
    await expectNoA11yViolations(page);
  });
});
