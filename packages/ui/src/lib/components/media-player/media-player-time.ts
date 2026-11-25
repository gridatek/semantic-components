import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScMediaPlayer } from './media-player';

/** What `time[scMediaPlayerTime]` shows. */
export type ScMediaPlayerTimeKind = 'current' | 'duration' | 'remaining';

/**
 * A time, in the app's language: `scMediaPlayerTime` (the current one),
 * `="duration"` or `="remaining"` ("-0:37"). Your `time` element; put the
 * separator between two yourself.
 */
@Directive({
  selector: 'time[scMediaPlayerTime]',
  host: {
    'data-slot': 'media-player-time',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerTime {
  private readonly player = inject(ScMediaPlayer);

  readonly which = input<ScMediaPlayerTimeKind | ''>('current', {
    alias: 'scMediaPlayerTime',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly text = computed(() => {
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

  private readonly class = computed(() =>
    cn(
      'text-xs whitespace-nowrap tabular-nums',
      this.player.kind() === 'video'
        ? 'text-white/90'
        : 'text-muted-foreground',
      this.classInput(),
    ),
  );
}
