import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayerNext } from './audio-player-next';

/** Plays at its speed (`[scAudioPlayerNextRate]="1.5"`), pressed while it is the one. Write its text ("1.5×"). */
@Directive({
  selector: 'button[scAudioPlayerNextRate]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-rate',
    '[attr.aria-pressed]': 'player.playbackRate() === rate()',
    '[class]': 'class()',
    '(click)': 'player.playbackRate.set(rate())',
  },
})
export class ScAudioPlayerNextRate {
  protected readonly player = inject(ScAudioPlayerNext);

  readonly rate = input.required<number>({
    alias: 'scAudioPlayerNextRate',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerNextRate');
  }
}
