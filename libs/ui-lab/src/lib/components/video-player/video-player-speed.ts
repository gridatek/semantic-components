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
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'div[scVideoPlayerSpeed]',
  imports: [
    ScButton,
    ScMenuProvider,
    ScMenuTrigger,
    ScMenuPortal,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
  ],
  template: `
    <div scMenuProvider>
      <button
        scButton
        scMenuTrigger
        variant="ghost"
        size="icon"
        type="button"
        class="text-foreground"
        aria-label="Playback speed"
      >
        <span class="text-xs font-medium">{{ player.playbackRate() }}x</span>
      </button>

      <ng-template scMenuPortal>
        <div scMenu class="w-auto min-w-20" (itemSelected)="setSpeed($event)">
          <ng-template scMenuContent>
            @for (speed of speeds(); track speed) {
              <div
                scMenuItem
                [value]="speed"
                [class]="getSpeedItemClass(speed)"
              >
                {{ speed }}x
              </div>
            }
          </ng-template>
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
    return cn(this.player.playbackRate() === speed && 'bg-accent');
  }

  protected setSpeed(speed: number): void {
    this.player.setPlaybackRate(speed);
  }
}
