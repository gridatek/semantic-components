import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScMediaPlayer } from './media-player';

/**
 * Your controls, in one row that wraps: the seek bar takes a row of its own —
 * above the buttons, or at the bottom edge of a small player. Over a video:
 * at its bottom, hidden while it plays untouched (never while focused in
 * them), and — with a play over the video — until the first play. Put
 * `class="ms-auto"` on what starts the right-hand side.
 */
@Directive({
  selector: '[scMediaPlayerControls]',
  host: {
    'data-slot': 'media-player-controls',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerControls {
  private readonly player = inject(ScMediaPlayer);
  private readonly styles = injectStyle().mediaPlayer;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'relative flex flex-wrap items-center gap-1',
      this.player.kind() === 'video' && [
        'absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/80 to-transparent pt-10 transition-opacity duration-300',
        this.styles.controls,
        this.player.idle() && 'pointer-events-none opacity-0',
        this.player.hasCenterPlay() && !this.player.started() && 'hidden',
      ],
      this.classInput(),
    ),
  );
}
