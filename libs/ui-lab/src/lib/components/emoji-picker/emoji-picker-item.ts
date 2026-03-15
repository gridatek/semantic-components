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
      'flex items-center justify-center rounded p-1 text-xl hover:bg-accent transition-colors',
      'focus:outline-none focus:ring-1 focus:ring-ring',
      this.classInput(),
    ),
  );
}
