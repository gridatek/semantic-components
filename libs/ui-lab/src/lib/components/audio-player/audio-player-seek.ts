import { Directive, effect, inject, untracked } from '@angular/core';
import { ScSlider, bindInput, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

/** Seeks in the track, in a `scAudioPlayerSeekBar`. Name it (`aria-label`). */
@Directive({
  selector: 'input[scAudioPlayerSeek]',
  hostDirectives: [ScSlider],
  host: {
    'data-slot': 'audio-player-seek',
  },
})
export class ScAudioPlayerSeek {
  protected readonly player = inject(SC_AUDIO_PLAYER);
  private readonly slider = inject(ScSlider);

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerSeek');
    bindInput(this.slider.min, 0);
    bindInput(this.slider.max, 100);
    bindInput(this.slider.step, 0.1);
    // The player's value, into the slider; the slider's, back.
    effect(() => {
      const value = this.player.progressPercent();
      untracked(() => this.slider.value.set(value));
    });
    this.slider.value.subscribe((value) => {
      if (value !== this.player.progressPercent())
        this.player.seek((value / 100) * this.player.duration());
    });
  }
}
