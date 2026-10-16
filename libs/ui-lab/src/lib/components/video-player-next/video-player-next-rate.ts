import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScVideoPlayerNext } from './video-player-next';

/** Plays at its speed (`[scVideoPlayerNextRate]="1.5"`), pressed while it is the one. Write its text ("1.5×"). */
@Directive({
  selector: 'button[scVideoPlayerNextRate]',
  host: {
    type: 'button',
    'data-slot': 'video-player-rate',
    '[attr.aria-pressed]': 'player.playbackRate() === rate()',
    '[class]': 'class()',
    '(click)': 'player.playbackRate.set(rate())',
  },
})
export class ScVideoPlayerNextRate {
  protected readonly player = inject(ScVideoPlayerNext);

  readonly rate = input.required<number>({ alias: 'scVideoPlayerNextRate' });
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
    ɵwarnIfUnnamed('scVideoPlayerNextRate');
  }
}
