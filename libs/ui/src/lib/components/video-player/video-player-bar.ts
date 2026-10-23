import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * The controls' row, in `scVideoPlayerControls`. On a small player (below
 * 576px wide), as in Vidstack's small layout: play steps aside when there's a
 * `scVideoPlayerCenter`, captions when there's a `scVideoPlayerTop`; the
 * skips, mute, the volume, the speeds and picture-in-picture always — the
 * time, the title and fullscreen stay, the seek bar under them.
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
