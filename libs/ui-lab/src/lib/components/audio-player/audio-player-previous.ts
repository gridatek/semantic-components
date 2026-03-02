import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'button[scAudioPlayerPrevious]',
  template: '<ng-content />',
  host: {
    'data-slot': 'audio-player-previous',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!player.canGoPrevious()',
    '[attr.aria-disabled]': '!player.canGoPrevious() || null',
    '[attr.aria-label]': "'Previous track'",
    '(click)': 'player.previous()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerPrevious {
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
