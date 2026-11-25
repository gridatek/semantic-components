import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { type ScToggleVariants, injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
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
  private readonly toggleStyles = injectStyle().toggle;
  private readonly state = inject(ScEmojiPickerState);

  readonly category = input.required<ScEmojiListCategory>({
    alias: 'scEmojiPickerCategoryButton',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScToggleVariants['variant']>('default');
  readonly size = input<ScToggleVariants['size']>('sm');

  private readonly current = computed(
    () => this.state.currentCategory() === this.category().index,
  );

  private readonly class = computed(() =>
    // The style's toggle (pressed: the category at the top), square: ten
    // in a row.
    cn(
      this.toggleStyles({ variant: this.variant(), size: this.size() }),
      'shrink-0 px-0',
      this.classInput(),
    ),
  );
}
