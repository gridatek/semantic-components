import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';
import type { ScEmojiListCategory as Category } from './emoji-picker-types';

/**
 * A category's place in the list, over its rows: holds its
 * `scEmojiPickerCategoryHeader`, which sticks while the rows scroll.
 */
@Directive({
  selector: 'div[scEmojiPickerCategory]',
  host: {
    'data-slot': 'emoji-picker-category',
    '[class]': 'class()',
    '[style.top.px]': 'state.categoryTop(category())',
    '[style.height.px]': 'height()',
  },
})
export class ScEmojiPickerCategory {
  protected readonly state = inject(ScEmojiPickerState);

  readonly category = input.required<Category>({
    alias: 'scEmojiPickerCategory',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  // Over the rows (they scroll under its header); clicks go through to them.
  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-x-0 z-10 [contain:content]',
      this.classInput(),
    ),
  );

  protected readonly height = computed(
    () =>
      (this.state.headerHeight() ?? 0) +
      this.category().rowsCount * (this.state.rowHeight() ?? 0),
  );
}
