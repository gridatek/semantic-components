import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn, ScSlider } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'div[scAudioPlayerProgress]',
  imports: [ScSlider],
  template: `
    <span class="text-muted-foreground w-10 text-right text-xs">
      {{ player.formatTime(player.currentTime()) }}
    </span>
    <div class="group relative h-3 flex-1">
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
    </div>
    <span class="text-muted-foreground w-10 text-xs">
      {{ player.formatTime(player.duration()) }}
    </span>
  `,
  host: {
    'data-slot': 'audio-player-progress',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerProgress {
  readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-2', this.classInput()),
  );

  protected onSeek(event: Event): void {
    const percent = +(event.target as HTMLInputElement).value;
    this.player.seek((percent / 100) * this.player.duration());
  }
}
