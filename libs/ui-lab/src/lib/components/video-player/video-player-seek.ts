import { Directive, computed, effect, inject, untracked } from '@angular/core';
import { ScSlider, bindInput, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScVideoPlayer } from './video-player';

/**
 * Seeks: your `input`, a slider over the video's seconds. Name it, and write
 * its `aria-valuetext` (`player.formatTime()` writes a time). Hovering or
 * dragging, `player.preview()` is the time under the pointer.
 */
@Directive({
  selector: 'input[scVideoPlayerSeek]',
  hostDirectives: [ScSlider],
  host: {
    'data-slot': 'video-player-seek',
    class: 'relative z-10 w-full',
    // Over the video: white, its track see-through (what has loaded shows).
    style: '--primary: white; --muted: transparent',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'player.preview.set(null)',
  },
})
export class ScVideoPlayerSeek {
  protected readonly player = inject(ScVideoPlayer);
  private readonly slider = inject(ScSlider);

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerSeek');
    bindInput(this.slider.min, 0);
    bindInput(this.slider.step, 0.1);
    bindInput(
      this.slider.max,
      computed(() => this.player.duration() || 0),
    );
    // The player's time, into the slider; the slider's, back.
    effect(() => {
      const time = this.player.currentTime();
      untracked(() => this.slider.value.set(time));
    });
    this.slider.value.subscribe((value) => {
      if (Math.abs(value - this.player.currentTime()) > 0.2) {
        this.player.seekTo(value);
      }
    });
  }

  protected onPointerMove(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const at = Math.min(
      1,
      Math.max(0, (event.clientX - rect.left) / rect.width),
    );
    this.player.preview.set({
      time: at * this.player.duration(),
      at: at * 100,
    });
  }
}
