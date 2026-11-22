import {
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { bindInput } from '../../utils/bind-input/bind-input';
import { ScSlider } from '../slider/slider';
import { ScMediaPlayer } from './media-player';
import { scMediaPlayerSmall } from './media-player-button';

/**
 * The volume: your `input`, a slider from 0 to 1 (0 while muted; moved,
 * it unmutes). Steps aside on a small player — and on iPhone and iPad Safari
 * lets the device's buttons set it, not a page. Name it ("Volume").
 */
@Directive({
  selector: 'input[scMediaPlayerVolume]',
  hostDirectives: [ScSlider],
  host: {
    'data-slot': 'media-player-volume',
    '[style.--primary]': "player.kind() === 'video' ? 'white' : null",
    '[style.--muted]':
      "player.kind() === 'video' ? 'rgb(255 255 255 / 0.3)' : null",
  },
})
export class ScMediaPlayerVolume {
  private readonly player = inject(ScMediaPlayer);
  private readonly slider = inject(ScSlider);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly shown = computed(() =>
    this.player.muted() ? 0 : this.player.volume(),
  );

  private readonly class = computed(() =>
    cn(
      'w-20 shrink-0',
      scMediaPlayerSmall(this.player.kind()),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerVolume');
    bindInput(this.slider.min, 0);
    bindInput(this.slider.max, 1);
    bindInput(this.slider.step, 0.05);
    bindInput(this.slider.classInput, this.class);
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
