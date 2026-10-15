import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

/** How far the track has played ("1:05"). */
@Directive({
  selector: 'span[scAudioPlayerCurrentTime]',
  host: {
    'data-slot': 'audio-player-current-time',
    '[textContent]': 'player.formatTime(player.currentTime())',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerCurrentTime {
  protected readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground w-10 text-xs tabular-nums', this.classInput()),
  );
}
