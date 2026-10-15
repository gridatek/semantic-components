import { Directive, effect, inject, untracked } from '@angular/core';
import { ScSlider, bindInput, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

/** Seeks in the video, in a `scVideoPlayerProgress`. Name it (`aria-label`). */
@Directive({
  selector: 'input[scVideoPlayerSeek]',
  hostDirectives: [ScSlider],
  host: {
    'data-slot': 'video-player-seek',
  },
})
export class ScVideoPlayerSeek {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  private readonly slider = inject(ScSlider);

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerSeek');
    bindInput(this.slider.min, 0);
    bindInput(this.slider.max, 100);
    bindInput(this.slider.step, 0.1);
    // The player's value, into the slider; the slider's, back.
    effect(() => {
      const value = this.player.progressPercent();
      untracked(() => this.slider.value.set(value));
    });
    this.slider.value.subscribe((value) => {
      if (value !== this.player.progressPercent()) this.player.seek(value);
    });
  }
}
