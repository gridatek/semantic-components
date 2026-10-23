import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * Over the middle of the video: play, large. Shown on a small player (below
 * 576px wide), as in Vidstack's small layout; on a wide one, only while
 * paused. Hidden, as the controls, while playing untouched. Above the controls
 * (their padding reaches over the middle of a small player); clicks around its
 * button go through.
 */
@Directive({
  selector: 'div[scVideoPlayerCenter]',
  host: {
    'data-slot': 'video-player-center',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerCenter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-0 z-30 hidden items-center justify-center gap-6 transition-opacity duration-300 *:pointer-events-auto',
      // Small: always; wide: while paused (so before the first play too).
      '@max-xl/video:flex group-data-paused/video:flex',
      // Playing untouched: away, as the controls.
      'group-data-idle/video:opacity-0 group-data-idle/video:*:pointer-events-none',
      // Its play: large and round.
      '[&>[data-slot=video-player-play]]:size-14 [&>[data-slot=video-player-play]]:rounded-full [&>[data-slot=video-player-play]]:bg-black/50 [&>[data-slot=video-player-play]_svg]:size-7',
      this.classInput(),
    ),
  );
}
