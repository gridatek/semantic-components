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
  selector: 'button[scAudioPlayerShuffle]',
  template: '<ng-content />',
  host: {
    'data-slot': 'audio-player-shuffle',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-pressed]': 'player.shuffle()',
    '[attr.aria-label]': "'Shuffle'",
    '(click)': 'player.shuffle.set(!player.shuffle())',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerShuffle {
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
