import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'button[sc-audio-player-next]',
  template: '<ng-content />',
  host: {
    'data-slot': 'audio-player-next',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': '!player.canGoNext()',
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
      'size-8 rounded-full flex items-center justify-center',
      'hover:bg-accent transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-ring',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      '[&_svg]:size-5',
      this.classInput(),
    ),
  );
}
