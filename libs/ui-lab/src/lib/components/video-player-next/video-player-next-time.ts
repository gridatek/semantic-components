import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScVideoPlayerNext } from './video-player-next';

/**
 * A time, in the app's language: `scVideoPlayerNextTime="current"`,
 * `"duration"` or `"remaining"`.
 */
@Directive({
  selector: 'time[scVideoPlayerNextTime]',
  host: {
    'data-slot': 'video-player-time',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerNextTime {
  private readonly player = inject(ScVideoPlayerNext);

  readonly which = input<'current' | 'duration' | 'remaining'>('current', {
    alias: 'scVideoPlayerNextTime',
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
      'text-xs whitespace-nowrap text-white/90 tabular-nums',
      this.classInput(),
    ),
  );
}
