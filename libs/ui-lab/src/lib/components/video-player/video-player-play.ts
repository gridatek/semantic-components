import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScVideoPlayer } from './video-player';

/** Plays or pauses. Write its icon and name from `player.paused()` ("Play" / "Pause"). */
@Directive({
  selector: 'button[scVideoPlayerPlay]',
  host: {
    type: 'button',
    'data-slot': 'video-player-play',
    '[class]': 'class()',
    '(click)': 'player.toggle()',
  },
})
export class ScVideoPlayerPlay {
  protected readonly player = inject(ScVideoPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      // Over the video: white.
      'text-white hover:bg-white/15 hover:text-white dark:hover:bg-white/15 aria-pressed:bg-white/20',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerPlay');
  }
}
