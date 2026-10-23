import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * The top bar of a small player (below 576px wide), as in Vidstack's small
 * layout: its controls at the end — captions. Not on a wide player. Hidden,
 * as the controls, while playing untouched.
 */
@Directive({
  selector: 'div[scVideoPlayerTop]',
  host: {
    'data-slot': 'video-player-top',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerTop {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-x-0 top-0 z-20 hidden items-center justify-end gap-1 bg-linear-to-b from-black/60 to-transparent px-3 pt-2 pb-6 transition-opacity duration-300',
      // Small only, once played.
      '@max-xl/video:group-data-started/video:flex',
      // Playing untouched: away, as the controls.
      'group-data-idle/video:pointer-events-none group-data-idle/video:opacity-0',
      this.classInput(),
    ),
  );
}
