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
  selector: 'button[scAudioPlayerRepeat]',
  template: '<ng-content />',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'player.cycleRepeat()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScAudioPlayerRepeat {
  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerRepeat');
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
