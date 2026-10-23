import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * The length, in a badge at the bottom corner, before the first play — as
 * Vidstack's start duration. Your `time[scVideoPlayerTime="duration"]` goes
 * in it. Gone once played.
 */
@Directive({
  selector: 'div[scVideoPlayerStartDuration]',
  host: {
    'data-slot': 'video-player-start-duration',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerStartDuration {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute end-3 bottom-3 z-20 rounded-md bg-black/70 px-1.5 py-0.5 text-white',
      'group-data-started/video:hidden',
      this.classInput(),
    ),
  );
}
