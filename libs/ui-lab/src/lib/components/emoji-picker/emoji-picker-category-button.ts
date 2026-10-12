import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';
import type { ScEmojiListCategory } from './emoji-picker-types';

/**
 * Scrolls the list to a category (write its icon); `aria-pressed` on the
 * category at the top of the list. Named by the category's label.
 */
@Directive({
  selector: 'button[scEmojiPickerCategoryButton]',
  hostDirectives: [ToolbarWidget],
  host: {
    'data-slot': 'emoji-picker-category-button',
    type: 'button',
    '[attr.aria-label]': 'category().label',
    '[attr.aria-pressed]': 'current()',
    '[class]': 'class()',
    '(click)': 'state.scrollToCategory(category().index)',
  },
})
export class ScEmojiPickerCategoryButton {
  protected readonly state = inject(ScEmojiPickerState);

  readonly category = input.required<ScEmojiListCategory>({
    alias: 'scEmojiPickerCategoryButton',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly current = computed(
    () => this.state.currentCategory() === this.category().index,
  );

  protected readonly class = computed(() =>
    cn(
      'hover:bg-accent aria-pressed:bg-accent aria-pressed:text-accent-foreground text-muted-foreground focus-visible:ring-ring/50 flex size-7 shrink-0 items-center justify-center rounded-sm outline-none focus-visible:ring-3 [&_svg]:size-4',
      this.classInput(),
    ),
  );
}
