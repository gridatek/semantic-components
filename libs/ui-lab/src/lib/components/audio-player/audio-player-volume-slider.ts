import { Directive, effect, inject, untracked } from '@angular/core';
import { ScSlider, bindInput, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

/** The volume, from 0 to 1 (disabled while muted). Name it (`aria-label`). */
@Directive({
  selector: 'input[scAudioPlayerVolumeSlider]',
  hostDirectives: [ScSlider],
  host: {
    'data-slot': 'audio-player-volume-slider',
    '[disabled]': 'player.isMuted()',
  },
})
export class ScAudioPlayerVolumeSlider {
  protected readonly player = inject(SC_AUDIO_PLAYER);
  private readonly slider = inject(ScSlider);

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerVolumeSlider');
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
