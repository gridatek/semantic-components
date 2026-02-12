import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'div[sc-audio-player-progress]',
  template: `
    <span class="text-xs text-muted-foreground w-10 text-right">
      {{ player.formatTime(player.currentTime()) }}
    </span>
    <div
      class="flex-1 h-1.5 bg-muted rounded-full cursor-pointer relative group"
      (click)="onProgressClick($event)"
      role="slider"
      [attr.aria-label]="'Seek'"
      [attr.aria-valuenow]="player.currentTime()"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="player.duration()"
      tabindex="0"
      (keydown)="onProgressKeydown($event)"
    >
      <div
        class="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
        [style.width.%]="player.progressPercent()"
      ></div>
      <div
        class="absolute top-1/2 -translate-y-1/2 size-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        [style.left.%]="player.progressPercent()"
        [style.transform]="'translate(-50%, -50%)'"
      ></div>
    </div>
    <span class="text-xs text-muted-foreground w-10">
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

  protected onProgressClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    this.player.seek(percent * this.player.duration());
  }

  protected onProgressKeydown(event: KeyboardEvent): void {
    const step = event.shiftKey ? 10 : 5;
    if (event.key === 'ArrowLeft') {
      this.player.seek(Math.max(0, this.player.currentTime() - step));
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.player.seek(
        Math.min(this.player.duration(), this.player.currentTime() + step),
      );
      event.preventDefault();
    }
  }
}
