import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScEmojiPicker } from './emoji-picker';
import { SC_EMOJI_FONT_FAMILY } from './emoji-picker-data';

/**
 * The emoji hovered or moved to with the keyboard, and its name — or, while
 * there's none, your text (\`Select an emoji…\`): put it in the footer.
 */
@Component({
  selector: 'div[scEmojiPickerPreview]',
  template: `
    @if (picker.activeEmoji(); as emoji) {
      <span
        class="flex size-7 flex-none items-center justify-center text-lg"
        [style.font-family]="font"
      >
        {{ emoji.emoji }}
      </span>
      <span class="text-secondary-foreground truncate text-xs">
        {{ emoji.label }}
      </span>
    } @else {
      <span
        class="text-muted-foreground ms-1.5 flex h-7 items-center truncate text-xs"
      >
        <ng-content />
      </span>
    }
  `,
  host: {
    'data-slot': 'emoji-picker-preview',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScEmojiPickerPreview {
  private readonly picker = inject(ScEmojiPicker);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly font = SC_EMOJI_FONT_FAMILY;

  private readonly class = computed(() =>
    cn('flex min-w-0 flex-1 items-center gap-1', this.classInput()),
  );
}
