import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { EmojiCategory } from './emoji-picker-state';
import { ScEmojiPickerState } from './emoji-picker-state';

/** A category toggle in the category toolbar; pressed when it is shown. */
@Directive({
  selector: 'button[scEmojiPickerCategoryTab]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'category().name',
    '[attr.aria-pressed]': 'isActive()',
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
      'shrink-0 p-2 text-lg outline-none hover:bg-accent transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 rounded-md',
      this.isActive() && 'bg-accent',
      this.classInput(),
    ),
  );
}
