import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPicker } from './emoji-picker';
import type { Emoji } from './emoji-picker-state';

@Directive({
  selector: 'button[scEmojiPickerItem]',
  host: {
    'data-slot': 'emoji-picker-item',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': 'emoji().name',
    '(click)': 'picker.selectEmoji(emoji())',
  },
})
export class ScEmojiPickerItem {
  readonly picker = inject(ScEmojiPicker);

  readonly emoji = input.required<Emoji>();

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex size-8 items-center justify-center rounded-md text-xl transition-colors hover:bg-accent',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
      this.classInput(),
    ),
  );
}
