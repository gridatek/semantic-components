import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayerNext } from './audio-player-next';

/** Shuffles the playlist, pressed while shuffled. Write its icon and name it ("Shuffle"). */
@Directive({
  selector: 'button[scAudioPlayerNextShuffle]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-shuffle',
    '[attr.aria-pressed]': 'player.shuffle()',
    '[class]': 'class()',
    '(click)': 'player.shuffle.set(!player.shuffle())',
  },
})
export class ScAudioPlayerNextShuffle {
  protected readonly player = inject(ScAudioPlayerNext);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerNextShuffle');
  }
}
