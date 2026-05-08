import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerState } from './emoji-picker-state';

@Directive({
  selector: 'div[scEmojiPickerRecent]',
  exportAs: 'scEmojiPickerRecent',
  host: {
    '[class]': 'class()',
    '[hidden]': '!visible()',
  },
})
export class ScEmojiPickerRecent {
  readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-wrap gap-1 border-t p-2', this.classInput()),
  );

  readonly visible = computed(
    () => this.state.recentEmojis().length > 0 && !this.state.searchQuery(),
  );
}
