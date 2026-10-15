import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

/** The seek bar: what is buffered under it, and your `input[scAudioPlayerSeek]` in it. */
@Directive({
  selector: 'div[scAudioPlayerSeekBar]',
  host: {
    'data-slot': 'audio-player-seek-bar',
    '[style.--buffered]': 'player.bufferedPercent() + "%"',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerSeekBar {
  protected readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative h-3 flex-1 before:bg-primary/30 before:pointer-events-none before:absolute before:start-0 before:top-1/2 before:h-1 before:w-(--buffered) before:-translate-y-1/2 before:rounded-full before:transition-[height] hover:before:h-1.5 [&>input]:absolute [&>input]:inset-0 [&>input]:h-full',
      this.classInput(),
    ),
  );
}
