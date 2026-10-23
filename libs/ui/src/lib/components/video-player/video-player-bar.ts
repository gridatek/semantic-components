import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * The controls' row, in `scVideoPlayerControls`. On a small player (below
 * 576px wide) with a `scVideoPlayerCenter`, its play and skip buttons step
 * aside — they're in the center; the volume, the speeds and
 * picture-in-picture step aside on any small player.
 */
@Directive({
  selector: 'div[scVideoPlayerBar]',
  host: {
    'data-slot': 'video-player-bar',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerBar {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-1', this.classInput()),
  );
}
