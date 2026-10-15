import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The track's title and artist: write them from `player.currentTrack()`. */
@Directive({
  selector: 'div[scAudioPlayerTrackInfo]',
  host: {
    'data-slot': 'audio-player-track-info',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerTrackInfo {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-center', this.classInput()),
  );
}
