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
  selector: 'div[sc-audio-player-cover]',
  template: `
    @if (player.currentTrack(); as track) {
      @if (track.cover) {
        <img
          [src]="track.cover"
          [alt]="track.title || 'Album cover'"
          class="size-full object-cover"
        />
      }
    }
  `,
  host: {
    'data-slot': 'audio-player-cover',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerCover {
  readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('rounded-md overflow-hidden bg-muted flex-shrink-0', this.classInput()),
  );
}
