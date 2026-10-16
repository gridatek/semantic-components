import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScVideoPlayer } from './video-player';

/** The controls' bar, over the video's foot: it hides while playing untouched. */
@Directive({
  selector: '[scVideoPlayerControls]',
  host: {
    'data-slot': 'video-player-controls',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerControls {
  private readonly player = inject(ScVideoPlayer);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-x-0 bottom-0 z-20 flex flex-col gap-1 bg-linear-to-t from-black/80 to-transparent px-3 pt-10 pb-2 transition-opacity duration-300',
      this.player.idle() && 'pointer-events-none opacity-0',
      this.classInput(),
    ),
  );
}
