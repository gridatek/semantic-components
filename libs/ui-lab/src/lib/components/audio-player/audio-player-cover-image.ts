import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

/** The current track's cover (hidden when it has none). Write its `alt`. */
@Directive({
  selector: 'img[scAudioPlayerCoverImage]',
  host: {
    'data-slot': 'audio-player-cover-image',
    '[src]': 'player.currentTrack()?.cover ?? ""',
    '[hidden]': '!player.currentTrack()?.cover',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerCoverImage {
  protected readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('size-full object-cover', this.classInput()),
  );
}
