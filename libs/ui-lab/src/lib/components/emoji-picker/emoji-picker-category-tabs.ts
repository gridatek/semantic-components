import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';

@Directive({
  selector: 'div[scEmojiPickerCategoryTabs]',
  exportAs: 'scEmojiPickerCategoryTabs',
  host: {
    role: 'tablist',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerCategoryTabs {
  readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex overflow-x-auto border-b', this.classInput()),
  );
}
