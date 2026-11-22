import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScMediaPlayer } from './media-player';

/**
 * The captions, shown by the player (the browser's own are off): over the
 * video, above the controls — never hidden by them. A polite live region.
 */
@Component({
  selector: 'div[scMediaPlayerCaptionsDisplay]',
  template: `
    @for (line of player.cues(); track $index) {
      <span
        class="rounded bg-black/75 px-2 py-0.5 text-base leading-snug text-white @xl/media:text-lg"
        >{{ line }}</span
      >
    }
  `,
  host: {
    'data-slot': 'media-player-captions-display',
    'aria-live': 'polite',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScMediaPlayerCaptionsDisplay {
  private readonly player = inject(ScMediaPlayer);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-x-0 z-10 flex flex-col items-center gap-1 px-4 text-center transition-[bottom] duration-200',
      this.player.idle() || !this.player.started() ? 'bottom-4' : 'bottom-24',
      this.classInput(),
    ),
  );
}
