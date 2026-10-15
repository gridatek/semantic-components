import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The progress row: the current time, the seek bar, the duration. */
@Directive({
  selector: 'div[scAudioPlayerProgress]',
  host: {
    'data-slot': 'audio-player-progress',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerProgress {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-2', this.classInput()),
  );
}
