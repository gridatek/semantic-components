import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';

/** Shown over the list while the emojis load (write a spinner or text). */
@Directive({
  selector: '[scEmojiPickerLoading]',
  host: {
    'data-slot': 'emoji-picker-loading',
    '[hidden]': '!state.loading()',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerLoading {
  protected readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground absolute inset-0 flex items-center justify-center',
      this.classInput(),
    ),
  );
}
