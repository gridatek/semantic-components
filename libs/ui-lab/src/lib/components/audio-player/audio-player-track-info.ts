import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'div[scAudioPlayerTrackInfo]',
  template: `
    @if (player.currentTrack(); as track) {
      <p class="truncate font-medium">
        {{ track.title || 'Unknown Track' }}
      </p>
      @if (track.artist) {
        <p class="text-muted-foreground truncate text-sm">
          {{ track.artist }}
        </p>
      }
    } @else {
      <p class="truncate font-medium">Unknown Track</p>
    }
  `,
  host: {
    'data-slot': 'audio-player-track-info',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerTrackInfo {
  readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-center', this.classInput()),
  );
}
