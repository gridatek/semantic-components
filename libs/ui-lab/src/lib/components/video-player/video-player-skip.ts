import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScVideoPlayer } from './video-player';

/** Skips by its seconds (`[scVideoPlayerSkip]="-10"`). Write its icon and name it ("Back 10 seconds"). */
@Directive({
  selector: 'button[scVideoPlayerSkip]',
  host: {
    type: 'button',
    'data-slot': 'video-player-skip',
    '[class]': 'class()',
    '(click)': 'player.seekBy(seconds())',
  },
})
export class ScVideoPlayerSkip {
  protected readonly player = inject(ScVideoPlayer);

  readonly seconds = input.required<number>({ alias: 'scVideoPlayerSkip' });
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
    ɵwarnIfUnnamed('scVideoPlayerSkip');
  }
}
