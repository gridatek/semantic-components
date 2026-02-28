import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  cn,
  ScButton,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScPopoverTrigger,
} from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'div[scVideoPlayerSpeed]',
  imports: [
    ScButton,
    ScPopoverProvider,
    ScPopoverTrigger,
    ScPopoverPortal,
    ScPopover,
  ],
  template: `
    <div scPopoverProvider side="top" align="center">
      <button
        scButton
        scPopoverTrigger
        variant="ghost"
        size="icon"
        type="button"
        class="text-foreground"
        aria-label="Playback speed"
      >
        <span class="text-xs font-medium">{{ player.playbackRate() }}x</span>
      </button>

      <ng-template scPopoverPortal>
        <div scPopover class="w-auto min-w-20 gap-0 p-1">
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
      </ng-template>
    </div>
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

  protected readonly class = computed(() => cn('relative', this.classInput()));

  protected getSpeedItemClass(speed: number): string {
    return cn(
      'w-full cursor-default rounded-md px-3 py-1 text-left text-sm hover:bg-accent',
      this.player.playbackRate() === speed && 'bg-accent',
    );
  }

  protected setSpeed(speed: number): void {
    this.player.setPlaybackRate(speed);
  }
}
