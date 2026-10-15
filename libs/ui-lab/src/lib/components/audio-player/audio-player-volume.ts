import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The volume row: mute, the volume slider, full volume. */
@Directive({
  selector: 'div[scAudioPlayerVolume]',
  host: {
    'data-slot': 'audio-player-volume',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerVolume {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center justify-center gap-2', this.classInput()),
  );
}
