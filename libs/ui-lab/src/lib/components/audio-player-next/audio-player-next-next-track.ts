import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayerNext } from './audio-player-next';

/** The next track; disabled after the last (unless repeating them all). Write its icon and name it ("Next track"). */
@Directive({
  selector: 'button[scAudioPlayerNextNextTrack]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-next-track',
    '[disabled]': 'player.upcoming() === null',
    '[class]': 'class()',
    '(click)': 'player.nextTrack()',
  },
})
export class ScAudioPlayerNextNextTrack {
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
    ɵwarnIfUnnamed('scAudioPlayerNextNextTrack');
  }
}
