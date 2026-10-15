import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

/** The seek bar, over the controls: what is buffered under it, and your `input[scVideoPlayerSeek]` in it. */
@Directive({
  selector: 'div[scVideoPlayerProgress]',
  host: {
    'data-slot': 'video-player-progress',
    '[style.--buffered]': 'player.bufferedPercent() + "%"',
    '[style.--primary]': '"oklch(1 0 0)"',
    '[style.--muted]': '"oklch(1 0 0 / 0.3)"',
    '[style.--ring]': '"oklch(1 0 0 / 0.5)"',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerProgress {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative mb-2 block h-3 before:bg-white/50 before:pointer-events-none before:absolute before:start-0 before:top-1/2 before:h-1 before:w-(--buffered) before:-translate-y-1/2 before:rounded-full before:transition-[height] hover:before:h-1.5 [&>input]:absolute [&>input]:inset-0 [&>input]:h-full',
      this.classInput(),
    ),
  );
}
