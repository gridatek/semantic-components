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
  selector: 'button[scAudioPlayerPlay]',
  template: '<ng-content />',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'player.togglePlay()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAudioPlayerPlay {
  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerPlay');
  }

  readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'default', size: 'icon-lg' }),
      "rounded-full size-12 [&_svg:not([class*='size-'])]:size-6",
      this.classInput(),
    ),
  );
}
