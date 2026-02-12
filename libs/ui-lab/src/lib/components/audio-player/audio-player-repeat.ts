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
  selector: 'button[sc-audio-player-repeat]',
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
      'size-8 rounded-full flex items-center justify-center',
      'hover:bg-accent transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-ring',
      '[&_svg]:size-4',
      this.classInput(),
    ),
  );
}
