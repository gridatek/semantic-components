import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScAudioPlayer } from './audio-player';

/**
 * A time, in the app's language: `scAudioPlayerTime="current"`,
 * `"duration"` or `"remaining"`.
 */
@Directive({
  selector: 'time[scAudioPlayerTime]',
  host: {
    'data-slot': 'audio-player-time',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerTime {
  private readonly player = inject(ScAudioPlayer);

  readonly which = input<'current' | 'duration' | 'remaining'>('current', {
    alias: 'scAudioPlayerTime',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly text = computed(() => {
    const duration = this.player.duration();
    const current = this.player.currentTime();
    switch (this.which()) {
      case 'duration':
        return this.player.formatTime(duration);
      case 'remaining':
        return `-${this.player.formatTime(duration - current)}`;
      default:
        return this.player.formatTime(current);
    }
  });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground text-xs whitespace-nowrap tabular-nums',
      this.classInput(),
    ),
  );
}
