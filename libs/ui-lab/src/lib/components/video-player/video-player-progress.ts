import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScSlider, cn } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'div[scVideoPlayerProgress]',
  imports: [ScSlider],
  template: `
    <!-- Buffered -->
    <div
      class="pointer-events-none absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-white/50 transition-[height] group-hover:h-1.5"
      [style.width.%]="player.bufferedPercent()"
    ></div>
    <!-- Seek slider -->
    <input
      scSlider
      class="absolute inset-0 h-full [&::-moz-range-progress]:transition-[height] group-hover:[&::-moz-range-progress]:h-1.5 [&::-moz-range-track]:transition-[height] group-hover:[&::-moz-range-track]:h-1.5 [&::-webkit-slider-runnable-track]:transition-[height] group-hover:[&::-webkit-slider-runnable-track]:h-1.5"
      min="0"
      max="100"
      step="0.1"
      [value]="player.progressPercent()"
      [style.--fill-percent]="player.progressPercent() + '%'"
      (input)="onSeek($event)"
    />
  `,
  host: {
    '[class]': 'class()',
    '[style.--primary]': '"oklch(1 0 0)"',
    '[style.--muted]': '"oklch(1 0 0 / 0.3)"',
    '[style.--ring]': '"oklch(1 0 0 / 0.5)"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerProgress {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('group relative mb-2 block h-3', this.classInput()),
  );

  protected onSeek(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.player.seek(value);
  }
}
