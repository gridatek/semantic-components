import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The track's title. */
@Directive({
  selector: '[scAudioPlayerTitle]',
  host: {
    'data-slot': 'audio-player-title',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('truncate font-medium', this.classInput()),
  );
}
