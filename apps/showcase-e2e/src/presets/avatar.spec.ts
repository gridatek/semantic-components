import { expect, test } from '../test';
import { presetName, presetStyles } from './preset';

test.describe('Avatar in its preset', () => {
  test(`the group count has its preset's classes`, async ({ page }) => {
    const styles = presetStyles();
    const preset = presetName();
    await page.goto('/demos/avatar/group-count-avatar-demo');
    const count = page.locator('[scAvatarGroupCount]');
    const wanted = styles.avatarGroupCount.split(/\s+/).filter(Boolean);
    await expect
      .poll(async () => {
        const have = new Set(
          ((await count.getAttribute('class')) ?? '').split(/\s+/),
        );
        return wanted.filter((c) => !have.has(c));
      }, `${preset} group count`)
      .toEqual([]);
  });
});
