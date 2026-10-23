import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScEmojiPickerState } from './emoji-picker-state';

/** Shown over the list when the emojis couldn't be loaded. */
@Directive({
  selector: '[scEmojiPickerError]',
  host: {
    'data-slot': 'emoji-picker-error',
    role: 'alert',
    '[hidden]': '!state.failed()',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerError {
  protected readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground absolute inset-0 flex items-center justify-center p-4 text-center text-sm',
      this.classInput(),
    ),
  );
}
