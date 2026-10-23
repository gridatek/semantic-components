import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScEmojiPickerState } from './emoji-picker-state';

/**
 * Shown over the list when no emoji matches the search; `search()` for
 * your text.
 */
@Directive({
  selector: '[scEmojiPickerEmpty]',
  exportAs: 'scEmojiPickerEmpty',
  host: {
    'data-slot': 'emoji-picker-empty',
    '[hidden]': '!state.empty()',
    '[class]': 'class()',
  },
})
export class ScEmojiPickerEmpty {
  protected readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** What was searched for. */
  readonly search = this.state.search.asReadonly();

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground absolute inset-0 flex items-center justify-center text-sm',
      this.classInput(),
    ),
  );
}
