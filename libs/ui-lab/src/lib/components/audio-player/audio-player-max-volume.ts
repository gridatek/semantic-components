import { Directive, computed, inject, input } from '@angular/core';
import { buttonVariants, cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

/** Sets the volume to the full. Write its icon and name it. */
@Directive({
  selector: 'button[scAudioPlayerMaxVolume]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-max-volume',
    '(click)': 'player.setVolume(1)',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerMaxVolume {
  protected readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'sm' }),
      'size-7 rounded-full',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerMaxVolume');
  }
}
