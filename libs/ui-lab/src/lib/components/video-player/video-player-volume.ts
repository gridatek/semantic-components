import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_VIDEO_PLAYER } from './video-player';

@Component({
  selector: 'div[sc-video-player-volume]',
  template: `
    <button
      type="button"
      (click)="player.toggleMute()"
      [class]="buttonClass()"
      [attr.aria-label]="player.isMuted() ? 'Unmute' : 'Mute'"
    >
      <ng-content select="[volume-icon]" />
    </button>
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      [value]="player.volume()"
      (input)="onVolumeInput($event)"
      class="w-0 group-hover:w-20 transition-all duration-200 h-1 accent-white cursor-pointer"
      aria-label="Volume"
    />
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScVideoPlayerVolume {
  protected readonly player = inject(SC_VIDEO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-1 group', this.classInput()),
  );

  protected readonly buttonClass = computed(() =>
    cn(
      'size-8 rounded flex items-center justify-center',
      'text-white hover:bg-white/20 transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-white/50',
      '[&_svg]:size-5',
    ),
  );

  protected onVolumeInput(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.player.setVolume(value);
  }
}
