import { Toolbar } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';

/**
 * The category switcher. All categories share one emoji grid, so this is a
 * toolbar of toggle buttons (aria `Toolbar`: one Tab stop, arrow keys) rather
 * than tabs, which would need a panel per category.
 */
@Directive({
  selector: 'div[scEmojiPickerCategoryTabs]',
  exportAs: 'scEmojiPickerCategoryTabs',
  hostDirectives: [Toolbar],
  host: {
    '[attr.aria-label]': 'label()',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerCategoryTabs {
  readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly label = input('Emoji categories', { alias: 'aria-label' });

  protected readonly class = computed(() =>
    cn('flex overflow-x-auto border-b', this.classInput()),
  );
}
