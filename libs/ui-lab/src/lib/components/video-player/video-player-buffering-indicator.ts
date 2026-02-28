import { Directive, computed, input, inject } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

@Directive({
  selector: 'svg[scVideoPlayerBufferingIndicator]',
  host: {
    '[class]': 'class()',
  },
})
export class ScVideoPlayerBufferingIndicator {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 m-auto size-12 text-white animate-spin pointer-events-none',
      !this.player.isBuffering() && 'hidden',
      this.classInput(),
    ),
  );
}
