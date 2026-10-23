import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScVideoPlayer } from './video-player';

/**
 * Where the captions show, over the video: above the controls while they
 * show. A live region, so they are read as they come.
 */
@Component({
  selector: 'div[scVideoPlayerCaptionsDisplay]',
  template: `
    @for (line of player.cues(); track $index) {
      <span
        class="rounded bg-black/75 px-2 py-0.5 text-base leading-snug text-white sm:text-lg"
        >{{ line }}</span
      >
    }
  `,
  host: {
    'data-slot': 'video-player-captions-display',
    'aria-live': 'polite',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScVideoPlayerCaptionsDisplay {
  protected readonly player = inject(ScVideoPlayer);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-x-0 z-10 flex flex-col items-center gap-1 px-4 text-center transition-[bottom] duration-200',
      // Above the controls while they show.
      this.player.idle() ? 'bottom-4' : 'bottom-20',
      this.classInput(),
    ),
  );
}
