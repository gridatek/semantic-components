import { Directive, computed, effect, inject, untracked } from '@angular/core';
import { ScSlider, bindInput, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScVideoPlayerNext } from './video-player-next';

/** The volume: your `input`, a slider from 0 to 1 (0 while muted). Name it. */
@Directive({
  selector: 'input[scVideoPlayerNextVolume]',
  hostDirectives: [ScSlider],
  host: {
    'data-slot': 'video-player-volume',
    // Over the video: white, on a faint track.
    style: '--primary: white; --muted: rgb(255 255 255 / 0.3)',
  },
})
export class ScVideoPlayerNextVolume {
  private readonly player = inject(ScVideoPlayerNext);
  private readonly slider = inject(ScSlider);

  private readonly shown = computed(() =>
    this.player.muted() ? 0 : this.player.volume(),
  );

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerNextVolume');
    bindInput(this.slider.min, 0);
    bindInput(this.slider.max, 1);
    bindInput(this.slider.step, 0.05);
    effect(() => {
      const value = this.shown();
      untracked(() => this.slider.value.set(value));
    });
    this.slider.value.subscribe((value) => {
      if (value === this.shown()) return;
      this.player.volume.set(value);
      this.player.muted.set(value === 0);
    });
  }
}
