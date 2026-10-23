import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * Between the current time and the duration: your text ("/"), dimmed. Hidden
 * from screen readers — the seek slider says "0:12 of 0:52".
 */
@Directive({
  selector: 'span[scVideoPlayerTimeSeparator]',
  host: {
    'data-slot': 'video-player-time-separator',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerTimeSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-xs text-white/60', this.classInput()),
  );
}
