import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScEmojiPickerState } from './emoji-picker-state';

/** A category's header (write its `label`): sticks while its rows scroll. */
@Directive({
  selector: 'div[scEmojiPickerCategoryHeader]',
  host: {
    'data-slot': 'emoji-picker-category-header',
    '[class]': 'class()',
    '[style.position]': 'state.sticky() ? "sticky" : null',
  },
})
export class ScEmojiPickerCategoryHeader {
  protected readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-muted-foreground pointer-events-auto top-0 px-3 pt-3.5 pb-2 text-xs leading-none [contain:layout_paint]',
      this.classInput(),
    ),
  );
}
