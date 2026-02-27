import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'div[scVideoPlayerSpeed]',
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
        class="absolute right-0 bottom-full mb-2 min-w-[80px] rounded-lg bg-black/90 py-2"
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
export class ScVideoPlayerSpeed {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly speeds = input<number[]>([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly showMenu = signal(false);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  protected readonly buttonClass = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'text-foreground'),
  );

  protected getSpeedItemClass(speed: number): string {
    return cn(
      'w-full px-4 py-1 text-sm text-foreground hover:bg-muted text-left',
      this.player.playbackRate() === speed && 'bg-muted/50',
    );
  }

  protected setSpeed(speed: number): void {
    this.player.setPlaybackRate(speed);
    this.showMenu.set(false);
  }
}
