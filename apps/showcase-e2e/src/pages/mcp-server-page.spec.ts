import { expectNoA11yViolations } from '../axe';
import { test } from '../test';

test.describe('MCP Server Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/docs/packages/mcp-server');
    await expectNoA11yViolations(page);
  });
});
