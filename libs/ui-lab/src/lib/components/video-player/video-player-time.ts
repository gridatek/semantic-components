import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScVideoPlayer } from './video-player';

/**
 * A time, in the app's language: `scVideoPlayerTime="current"`,
 * `"duration"` or `"remaining"`.
 */
@Directive({
  selector: 'time[scVideoPlayerTime]',
  host: {
    'data-slot': 'video-player-time',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerTime {
  private readonly player = inject(ScVideoPlayer);

  readonly which = input<'current' | 'duration' | 'remaining'>('current', {
    alias: 'scVideoPlayerTime',
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
