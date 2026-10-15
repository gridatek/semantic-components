import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { buttonVariants, cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'button[scAudioPlayerShuffle]',
  template: '<ng-content />',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'player.shuffle()',
    '(click)': 'player.shuffle.set(!player.shuffle())',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAudioPlayerShuffle {
  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerShuffle');
  }

  readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      'rounded-full',
      this.classInput(),
    ),
  );
}
