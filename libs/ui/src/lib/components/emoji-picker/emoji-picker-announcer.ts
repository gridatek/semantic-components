import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScEmojiPickerState } from './emoji-picker-state';

/**
 * Announces the emoji moved to with the arrow keys (focus stays in the
 * search field, so screen readers need telling). Visually hidden; its text
 * is the emoji's name.
 */
@Directive({
  selector: '[scEmojiPickerAnnouncer]',
  host: {
    'data-slot': 'emoji-picker-announcer',
    'aria-live': 'polite',
    '[class]': 'class()',
    '[textContent]': 'label()',
  },
})
export class ScEmojiPickerAnnouncer {
  private readonly state = inject(ScEmojiPickerState);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('sr-only', this.classInput()));

  private readonly label = computed(() =>
    this.state.interaction() === 'keyboard'
      ? (this.state.activeEmoji()?.label ?? '')
      : '',
  );
}
