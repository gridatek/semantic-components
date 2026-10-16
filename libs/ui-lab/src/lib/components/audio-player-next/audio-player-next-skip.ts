import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayerNext } from './audio-player-next';

/** Skips by its seconds (`[scAudioPlayerNextSkip]="-15"`). Write its icon and name it ("Back 15 seconds"). */
@Directive({
  selector: 'button[scAudioPlayerNextSkip]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-skip',
    '[class]': 'class()',
    '(click)': 'player.seekBy(seconds())',
  },
})
export class ScAudioPlayerNextSkip {
  protected readonly player = inject(ScAudioPlayerNext);

  readonly seconds = input.required<number>({
    alias: 'scAudioPlayerNextSkip',
  });
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
    ɵwarnIfUnnamed('scAudioPlayerNextSkip');
  }
}
