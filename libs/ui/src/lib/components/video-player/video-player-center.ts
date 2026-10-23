import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * Over the middle of the video: play (large) and the skips around it. Shown
 * on a small player (below 576px wide), as other players do; on a wide one,
 * only while paused, and then only its play. Hidden, as the controls, while
 * playing untouched. Clicks between its buttons reach the video.
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
      'pointer-events-none absolute inset-0 z-10 hidden items-center justify-center gap-6 transition-opacity duration-300 *:pointer-events-auto',
      // Small: always; wide: while paused.
      '@max-xl/video:flex group-data-paused/video:flex',
      // Playing untouched: away, as the controls.
      'group-data-idle/video:opacity-0 group-data-idle/video:*:pointer-events-none',
      // Its play: large and round.
      '[&>[data-slot=video-player-play]]:size-14 [&>[data-slot=video-player-play]]:rounded-full [&>[data-slot=video-player-play]]:bg-black/50 [&>[data-slot=video-player-play]_svg]:size-7',
      this.classInput(),
    ),
  );
}
