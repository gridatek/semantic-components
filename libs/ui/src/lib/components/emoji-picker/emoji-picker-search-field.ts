import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** The search field's row: your icon, then `input[scEmojiPickerSearch]`. */
@Directive({
  selector: 'div[scEmojiPickerSearchField]',
  host: {
    'data-slot': 'emoji-picker-search-wrapper',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerSearchField {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex h-9 items-center gap-2 border-b px-3 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:opacity-50',
      this.classInput(),
    ),
  );
}
