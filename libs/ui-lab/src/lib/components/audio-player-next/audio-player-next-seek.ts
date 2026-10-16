import { Directive, computed, effect, inject, untracked } from '@angular/core';
import { ScSlider, bindInput, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScAudioPlayerNext } from './audio-player-next';

/**
 * Seeks: your `input`, a slider over the track's seconds. Name it, and write
 * its `aria-valuetext` (`player.formatTime()` writes a time).
 */
@Directive({
  selector: 'input[scAudioPlayerNextSeek]',
  hostDirectives: [{ directive: ScSlider, inputs: ['class'] }],
  host: {
    'data-slot': 'audio-player-seek',
  },
})
export class ScAudioPlayerNextSeek {
  private readonly player = inject(ScAudioPlayerNext);
  private readonly slider = inject(ScSlider);

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerNextSeek');
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
}
