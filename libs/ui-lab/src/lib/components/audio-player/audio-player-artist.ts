import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The track's artist. */
@Directive({
  selector: '[scAudioPlayerArtist]',
  host: {
    'data-slot': 'audio-player-artist',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerArtist {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground truncate text-sm', this.classInput()),
  );
}
