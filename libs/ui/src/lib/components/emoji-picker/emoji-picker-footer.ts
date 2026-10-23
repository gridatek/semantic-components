import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * A row under the list, as wide as it: e.g. a preview of `activeEmoji()`
 * and a `scEmojiPickerSkinTone` button.
 */
@Directive({
  selector: 'div[scEmojiPickerFooter]',
  host: {
    'data-slot': 'emoji-picker-footer',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex w-full max-w-(--sc-emoji-picker-viewport-width) min-w-0 items-center gap-1 border-t p-2',
      this.classInput(),
    ),
  );
}
