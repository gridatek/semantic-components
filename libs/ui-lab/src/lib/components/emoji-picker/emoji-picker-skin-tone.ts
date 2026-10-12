import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScEmojiPicker } from './emoji-picker';
import { SC_EMOJI_FONT_FAMILY, skinToneVariation } from './emoji-picker-data';

/**
 * Changes the skin tone, cycling through them; write `variation()` (the
 * emoji in the current tone) in it and give it an `aria-label` (e.g. with
 * `picker.skinToneNames()`).
 */
@Directive({
  selector: 'button[scEmojiPickerSkinTone]',
  exportAs: 'scEmojiPickerSkinTone',
  host: {
    'data-slot': 'emoji-picker-skin-tone',
    type: 'button',
    'aria-live': 'polite',
    '[class]': 'class()',
    '[style.font-family]': 'font',
    '(click)': 'picker.nextSkinTone()',
  },
})
export class ScEmojiPickerSkinTone {
  protected readonly picker = inject(ScEmojiPicker);

  /** The emoji showing the tone. */
  readonly emoji = input('✋', { alias: 'scEmojiPickerSkinTone' });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly font = SC_EMOJI_FONT_FAMILY;

  /** The emoji in the current skin tone. */
  readonly variation = computed(() =>
    skinToneVariation(this.emoji() || '✋', this.picker.skinTone()),
  );

  protected readonly class = computed(() =>
    cn(
      'hover:bg-accent focus-visible:ring-ring/50 flex size-7 shrink-0 items-center justify-center rounded-sm text-base outline-none focus-visible:ring-3',
      this.classInput(),
    ),
  );
}
