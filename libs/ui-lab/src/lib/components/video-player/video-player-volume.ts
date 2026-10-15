import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The volume: mute, and the volume slider shown on hover. */
@Directive({
  selector: 'div[scVideoPlayerVolume]',
  host: {
    'data-slot': 'video-player-volume',
    '[style.--primary]': '"oklch(1 0 0)"',
    '[style.--muted]': '"oklch(1 0 0 / 0.3)"',
    '[style.--ring]': '"oklch(1 0 0 / 0.5)"',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerVolume {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group/volume flex items-center gap-1 [&_[data-slot=video-player-volume-slider]]:h-1 [&_[data-slot=video-player-volume-slider]]:w-0 [&_[data-slot=video-player-volume-slider]]:opacity-0 [&_[data-slot=video-player-volume-slider]]:transition-all hover:[&_[data-slot=video-player-volume-slider]]:w-20 hover:[&_[data-slot=video-player-volume-slider]]:opacity-100 focus-within:[&_[data-slot=video-player-volume-slider]]:w-20 focus-within:[&_[data-slot=video-player-volume-slider]]:opacity-100',
      this.classInput(),
    ),
  );
}
