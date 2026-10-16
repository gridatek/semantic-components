import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayerNext } from './audio-player-next';

/** Back to the track's start, or — near it — the track before. Write its icon and name it ("Previous track"). */
@Directive({
  selector: 'button[scAudioPlayerNextPreviousTrack]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-previous-track',
    '[class]': 'class()',
    '(click)': 'player.previousTrack()',
  },
})
export class ScAudioPlayerNextPreviousTrack {
  protected readonly player = inject(ScAudioPlayerNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerNextPreviousTrack');
  }
}
