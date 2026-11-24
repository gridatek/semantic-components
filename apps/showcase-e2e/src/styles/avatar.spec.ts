import { expect, test } from '../test';
import { currentStyle, styleName } from './style';

test.describe('Avatar in its style', () => {
  test(`the group count has its style's classes`, async ({ page }) => {
    const styles = currentStyle();
    const style = styleName();
    await page.goto('/demos/avatar/group-count-avatar-demo');
    const count = page.locator('[scAvatarGroupCount]');
    const wanted = styles.avatarGroupCount.split(/\s+/).filter(Boolean);
    await expect
      .poll(async () => {
        const have = new Set(
          ((await count.getAttribute('class')) ?? '').split(/\s+/),
        );
        return wanted.filter((c) => !have.has(c));
      }, `${style} group count`)
      .toEqual([]);
  });
});
