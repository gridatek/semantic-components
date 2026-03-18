import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';

@Directive({
  selector: 'div[scEmojiPickerGrid]',
  exportAs: 'scEmojiPickerGrid',
  host: {
    'data-slot': 'emoji-picker-grid',
    role: 'grid',
    '[class]': 'class()',
    '[style.grid-template-columns]': 'state.gridColumns()',
  },
})
export class ScEmojiPickerGrid {
  readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('grid gap-1 overflow-y-auto p-2 h-64', this.classInput()),
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
}
