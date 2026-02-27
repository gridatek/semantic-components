import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'button[scAudioPlayerRepeat]',
  template: '<ng-content />',
  host: {
    'data-slot': 'audio-player-repeat',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': "'Repeat: ' + player.repeat()",
    '(click)': 'player.cycleRepeat()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerRepeat {
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
