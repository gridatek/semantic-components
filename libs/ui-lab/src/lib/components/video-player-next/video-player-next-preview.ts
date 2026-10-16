import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScVideoPlayerNext } from './video-player-next';

/**
 * Above the seek bar, where the pointer is: your content — the time
 * (`player.formatTime(player.preview()!.time)`), its chapter. Shown while
 * hovering or dragging; hidden from screen readers (the slider says it).
 */
@Directive({
  selector: '[scVideoPlayerNextPreview]',
  host: {
    'data-slot': 'video-player-preview',
    'aria-hidden': 'true',
    '[hidden]': '!player.preview()',
    '[style.left.%]': 'player.preview()?.at',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerNextPreview {
  protected readonly player = inject(ScVideoPlayerNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute bottom-full mb-2 -translate-x-1/2 rounded-md bg-black/85 px-2 py-1 text-center text-xs whitespace-nowrap text-white tabular-nums',
      this.classInput(),
    ),
  );
}
