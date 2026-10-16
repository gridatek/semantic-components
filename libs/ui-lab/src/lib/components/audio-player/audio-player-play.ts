import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayer } from './audio-player';

/** Plays or pauses. Write its icon and name from `player.paused()` ("Play" / "Pause"). */
@Directive({
  selector: 'button[scAudioPlayerPlay]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-play',
    '[class]': 'class()',
    '(click)': 'player.toggle()',
  },
})
export class ScAudioPlayerPlay {
  protected readonly player = inject(ScAudioPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerPlay');
  }
}
