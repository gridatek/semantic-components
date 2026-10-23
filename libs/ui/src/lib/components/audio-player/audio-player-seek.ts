import { Directive, computed, effect, inject, untracked } from '@angular/core';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { bindInput } from '../../utils/bind-input/bind-input';
import { ScSlider } from '../slider/slider';
import { ScAudioPlayer } from './audio-player';

/**
 * Seeks: your `input`, a slider over the track's seconds. Name it, and write
 * its `aria-valuetext` (`player.formatTime()` writes a time).
 */
@Directive({
  selector: 'input[scAudioPlayerSeek]',
  hostDirectives: [{ directive: ScSlider, inputs: ['class'] }],
  host: {
    'data-slot': 'audio-player-seek',
  },
})
export class ScAudioPlayerSeek {
  private readonly player = inject(ScAudioPlayer);
  private readonly slider = inject(ScSlider);

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerSeek');
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
