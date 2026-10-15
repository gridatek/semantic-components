import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The cover's frame: put an `img[scAudioPlayerCoverImage]` in it. */
@Directive({
  selector: 'div[scAudioPlayerCover]',
  host: {
    'data-slot': 'audio-player-cover',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerCover {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'mx-auto aspect-square w-full overflow-hidden rounded-md bg-muted shrink-0',
      this.classInput(),
    ),
  );
}
