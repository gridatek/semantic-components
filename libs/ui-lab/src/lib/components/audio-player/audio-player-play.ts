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
  selector: 'button[scAudioPlayerPlay]',
  template: '<ng-content />',
  host: {
    'data-slot': 'audio-player-play',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-label]': "player.isPlaying() ? 'Pause' : 'Play'",
    '(click)': 'player.togglePlay()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerPlay {
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
