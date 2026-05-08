import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { Emoji } from './emoji-picker-state';
import { ScEmojiPickerState } from './emoji-picker-state';

@Directive({
  selector: 'div[scEmojiPickerGrid]',
  exportAs: 'scEmojiPickerGrid',
  host: {
    '[class]': 'class()',
  },
})
export class ScEmojiPickerGrid {
  readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block h-64 overflow-y-auto p-2', this.classInput()),
  );

  readonly emojis = computed(() =>
    this.state.searchQuery()
      ? this.state.filteredEmojis()
      : this.state.activeCategoryEmojis(),
  );

  readonly isEmpty = computed(
    () =>
      this.state.searchQuery() !== '' &&
      this.state.filteredEmojis().length === 0,
  );

  readonly rows = computed(() => {
    const items = this.emojis();
    const cols = this.state.columns();
    const result: Emoji[][] = [];
    for (let i = 0; i < items.length; i += cols) {
      result.push(items.slice(i, i + cols));
    }
    return result;
  });
}
