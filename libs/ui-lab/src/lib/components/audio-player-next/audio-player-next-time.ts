import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScAudioPlayerNext } from './audio-player-next';

/**
 * A time, in the app's language: `scAudioPlayerNextTime="current"`,
 * `"duration"` or `"remaining"`.
 */
@Directive({
  selector: 'time[scAudioPlayerNextTime]',
  host: {
    'data-slot': 'audio-player-time',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScAudioPlayerNextTime {
  private readonly player = inject(ScAudioPlayerNext);

  readonly which = input<'current' | 'duration' | 'remaining'>('current', {
    alias: 'scAudioPlayerNextTime',
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
