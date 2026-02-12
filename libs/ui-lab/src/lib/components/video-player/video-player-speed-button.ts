import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'div[sc-video-player-speed]',
  template: `
    <button
      type="button"
      (click)="showMenu.set(!showMenu())"
      [class]="buttonClass()"
      aria-label="Playback speed"
    >
      <span class="text-xs font-medium">{{ player.playbackRate() }}x</span>
    </button>
    @if (showMenu()) {
      <div
        class="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg py-2 min-w-[80px]"
      >
        @for (speed of speeds(); track speed) {
          <button
            type="button"
            (click)="setSpeed(speed)"
            [class]="getSpeedItemClass(speed)"
          >
            {{ speed }}x
          </button>
        }
      </div>
    }
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerSpeedButton {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly speeds = input<number[]>([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly showMenu = signal(false);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  protected readonly buttonClass = computed(() =>
    cn(
      'size-8 rounded flex items-center justify-center',
      'text-white hover:bg-white/20 transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-white/50',
    ),
  );

  protected getSpeedItemClass(speed: number): string {
    return cn(
      'w-full px-4 py-1 text-sm text-white hover:bg-white/20 text-left',
      this.player.playbackRate() === speed && 'bg-white/10',
    );
  }

  protected setSpeed(speed: number): void {
    this.player.setPlaybackRate(speed);
    this.showMenu.set(false);
  }
}
