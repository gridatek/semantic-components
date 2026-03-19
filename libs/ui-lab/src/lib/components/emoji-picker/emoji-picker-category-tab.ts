import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { EmojiCategory } from './emoji-picker-state';
import { ScEmojiPickerState } from './emoji-picker-state';

@Directive({
  selector: 'button[scEmojiPickerCategoryTab]',
  host: {
    'data-slot': 'emoji-picker-category-tab',
    type: 'button',
    role: 'tab',
    '[class]': 'class()',
    '[attr.aria-label]': 'category().name',
    '[attr.aria-selected]': 'isActive()',
    '(click)': 'state.activeCategory.set(category().id)',
  },
})
export class ScEmojiPickerCategoryTab {
  readonly state = inject(ScEmojiPickerState);

  readonly category = input.required<EmojiCategory>();

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly isActive = computed(
    () => this.category().id === this.state.activeCategory(),
  );

  protected readonly class = computed(() =>
    cn(
      'shrink-0 p-2 text-lg hover:bg-accent transition-colors',
      this.isActive() && 'bg-accent',
      this.classInput(),
    ),
  );
}
