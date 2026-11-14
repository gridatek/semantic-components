import { expectNoA11yViolations } from '../../axe';
import { expectNoHorizontalScroll } from '../../mobile';
import { expect, test } from '../../test';

test.describe('Calendar Page', () => {
  test('should have no accessibility violations', async ({ page }) => {
    // Many calendars, 42 days each: over 30 s on CI in Firefox.
    test.slow();
    await page.goto('/docs/components/calendar');
    await expectNoA11yViolations(page);
  });

  test('should have no accessibility violations in dark mode', async ({
    page,
  }) => {
    // Many calendars, 42 days each: over 30 s on CI in Firefox.
    test.slow();
    await page.goto('/docs/components/calendar');
    await expectNoA11yViolations(page, { dark: true });
  });

  test('API reference: every part', async ({ page }) => {
    await page.goto('/docs/components/calendar');
    const table = page.getByRole('region', { name: 'Calendar parts' });
    await expect(table.getByRole('row').locator('td:first-child')).toHaveText([
      'ScCalendar',
      'ScCalendarHeader, ScCalendarHeading',
      'ScCalendarPrevious, ScCalendarNext',
      'ScCalendarDay',
      'ScCalendarFooter, ScCalendarToday, ScCalendarClear',
    ]);
  });

  test('the page fits a phone, its tables scrolling in their own box @mobile', async ({
    page,
  }) => {
    await page.goto('/docs/components/calendar');
    await page
      .getByRole('heading', { name: 'API reference' })
      .scrollIntoViewIfNeeded();
    await expectNoHorizontalScroll(page);
  });
});
