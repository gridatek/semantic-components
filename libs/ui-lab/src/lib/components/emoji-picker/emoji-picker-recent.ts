import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPickerItem } from './emoji-picker-item';
import { ScEmojiPickerState } from './emoji-picker-state';

@Component({
  selector: 'div[scEmojiPickerRecent]',
  imports: [ScEmojiPickerItem],
  template: `
    @if (state.recentEmojis().length > 0 && !state.searchQuery()) {
      <p class="text-muted-foreground mb-1 text-xs">Recently used</p>
      <div class="flex flex-wrap gap-1">
        @for (emoji of state.recentEmojis(); track emoji.emoji) {
          <button scEmojiPickerItem [emoji]="emoji">
            {{ emoji.emoji }}
          </button>
        }
      </div>
    }
  `,
  host: {
    'data-slot': 'emoji-picker-recent',
    '[class]': 'class()',
    '[hidden]': 'state.recentEmojis().length === 0 || !!state.searchQuery()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEmojiPickerRecent {
  readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('block border-t p-2', this.classInput()),
  );
}
