import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

/** How long the track is ("3:42"). */
@Directive({
  selector: 'span[scAudioPlayerDuration]',
  host: {
    'data-slot': 'audio-player-duration',
    '[textContent]': 'player.formatTime(player.duration())',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerDuration {
  protected readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground w-10 text-xs tabular-nums', this.classInput()),
  );
}
