import { DestroyRef, Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { ScMediaPlayer } from './media-player';
import {
  scMediaPlayerButtonClass,
  scMediaPlayerSmall,
} from './media-player-button';
import { ScMediaPlayerControls } from './media-player-controls';

/**
 * Plays, pauses — and, ended, plays again. Your icon and its name ("Play", "Pause", "Replay": `player.paused()`, `player.ended()`).
 * In the controls, the bar's play. Outside them, over a video: large, in the
 * middle — shown while paused (and before the first play), and always on a
 * small player, whose bar's play then steps aside.
 */
@Directive({
  selector: 'button[scMediaPlayerPlay]',
  host: {
    type: 'button',
    'data-slot': 'media-player-play',
    '(click)': 'player.toggle()',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerPlay {
  private readonly buttonStyles = injectStyle().button;
  private readonly player = inject(ScMediaPlayer);
  /** In the controls (the bar's play), or over the video. */
  private readonly inControls = inject(ScMediaPlayerControls, {
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      scMediaPlayerButtonClass(this.player.kind()),
      this.player.kind() === 'video' && !this.inControls
        ? [
            'absolute inset-0 z-30 m-auto size-14 rounded-full bg-black/50 transition-opacity duration-300 hover:bg-black/70 dark:hover:bg-black/70 [&_svg]:size-7',
            // Wide and playing: away; paused, or small: there.
            '@xl/media:group-not-data-paused/media:hidden',
            'group-data-idle/media:pointer-events-none group-data-idle/media:opacity-0',
          ]
        : this.player.hasCenterPlay() && scMediaPlayerSmall(this.player.kind()),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerPlay');
    if (!this.inControls) {
      this.player.ɵcenterPlays.update((n) => n + 1);
      inject(DestroyRef).onDestroy(() =>
        this.player.ɵcenterPlays.update((n) => n - 1),
      );
    }
  }
}
