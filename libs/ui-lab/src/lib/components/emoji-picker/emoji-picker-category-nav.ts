import { Toolbar } from '@angular/aria/toolbar';
import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/**
 * A row of category buttons (`scEmojiPickerCategoryButton` for each of
 * `picker.categories()`): a toolbar — one Tab stop, arrow keys between
 * them. Give it an `aria-label`.
 */
@Directive({
  selector: 'div[scEmojiPickerCategoryNav]',
  hostDirectives: [Toolbar],
  host: {
    'data-slot': 'emoji-picker-category-nav',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerCategoryNav {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex gap-0.5 border-b px-1 py-1', this.classInput()),
  );
}
