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
  selector: 'button[scAudioPlayerNext]',
  template: '<ng-content />',
  host: {
    'data-slot': 'audio-player-next',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!player.canGoNext()',
    '[attr.aria-disabled]': '!player.canGoNext() || null',
    '[attr.aria-label]': "'Next track'",
    '(click)': 'player.next()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerNext {
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
