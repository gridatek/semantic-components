import { Directive, effect, inject, untracked } from '@angular/core';
import { ScSlider, bindInput, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

/** The volume, from 0 to 1. Name it (`aria-label`). */
@Directive({
  selector: 'input[scVideoPlayerVolumeSlider]',
  hostDirectives: [ScSlider],
  host: {
    'data-slot': 'video-player-volume-slider',
  },
})
export class ScVideoPlayerVolumeSlider {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  private readonly slider = inject(ScSlider);

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerVolumeSlider');
    bindInput(this.slider.min, 0);
    bindInput(this.slider.max, 1);
    bindInput(this.slider.step, 0.01);
    // The player's value, into the slider; the slider's, back.
    effect(() => {
      const value = this.player.volume();
      untracked(() => this.slider.value.set(value));
    });
    this.slider.value.subscribe((value) => {
      if (value !== this.player.volume()) this.player.setVolume(value);
    });
  }
}
