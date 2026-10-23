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
 * Around the seek slider: what has loaded, the chapters' marks, and your
 * preview (`scVideoPlayerPreview`) above it.
 */
@Component({
  selector: 'div[scVideoPlayerProgress]',
  template: `
    <div
      class="pointer-events-none absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/20"
      aria-hidden="true"
    >
      <div
        class="h-full rounded-full bg-white/30"
        [style.width.%]="loaded()"
      ></div>
    </div>
    <ng-content />
    @for (mark of marks(); track mark) {
      <span
        class="pointer-events-none absolute top-1/2 h-2 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-black/70"
        [style.left.%]="mark"
        aria-hidden="true"
      ></span>
    }
  `,
  host: {
    'data-slot': 'video-player-progress',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScVideoPlayerProgress {
  private readonly player = inject(ScVideoPlayer);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly loaded = computed(() => {
    const duration = this.player.duration();
    return duration ? (this.player.buffered() / duration) * 100 : 0;
  });

  /** Where each chapter after the first starts, in percent. */
  protected readonly marks = computed(() => {
    const duration = this.player.duration();
    if (!duration) return [];
    return this.player
      .chapters()
      .slice(1)
      .map((chapter) => (chapter.start / duration) * 100);
  });

  protected readonly class = computed(() =>
    cn('relative flex h-5 items-center', this.classInput()),
  );
}
