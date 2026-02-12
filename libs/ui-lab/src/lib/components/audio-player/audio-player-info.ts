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
  selector: 'div[sc-audio-player-info]',
  template: `
    @if (player.currentTrack(); as track) {
      <p class="font-medium truncate">
        {{ track.title || 'Unknown Track' }}
      </p>
      @if (track.artist) {
        <p class="text-sm text-muted-foreground truncate">
          {{ track.artist }}
        </p>
      }
    } @else {
      <p class="font-medium truncate">Unknown Track</p>
    }
  `,
  host: {
    'data-slot': 'audio-player-info',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerInfo {
  readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));
}
