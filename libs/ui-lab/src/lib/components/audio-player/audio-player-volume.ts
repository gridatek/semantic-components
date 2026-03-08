import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ScSlider, buttonVariants, cn } from '@semantic-components/ui';
import {
  SiVolume1Icon,
  SiVolume2Icon,
  SiVolumeOffIcon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'div[scAudioPlayerVolume]',
  imports: [
    SiVolumeOffIcon,
    SiVolumeXIcon,
    SiVolume1Icon,
    SiVolume2Icon,
    ScSlider,
  ],
  template: `
    <button
      type="button"
      (click)="player.toggleMute()"
      [class]="iconButtonClass"
      [attr.aria-label]="player.isMuted() ? 'Unmute' : 'Mute'"
    >
      @if (player.isMuted()) {
        <svg siVolumeOffIcon class="pointer-events-none size-3.5"></svg>
      } @else if (player.volume() === 0) {
        <svg siVolumeXIcon class="pointer-events-none size-3.5"></svg>
      } @else if (player.volume() < 0.5) {
        <svg siVolume1Icon class="pointer-events-none size-3.5"></svg>
      } @else {
        <svg siVolume2Icon class="pointer-events-none size-3.5"></svg>
      }
    </button>

    <input
      scSlider
      class="w-24"
      [max]="1"
      [step]="0.01"
      aria-label="Volume"
      [disabled]="player.isMuted()"
      [value]="player.volume()"
      (valueChange)="player.setVolume($event)"
    />

    <button
      type="button"
      (click)="onMaxVolume()"
      [class]="iconButtonClass"
      aria-label="Max volume"
    >
      <svg siVolume2Icon class="pointer-events-none size-3.5"></svg>
    </button>
  `,
  host: {
    'data-slot': 'audio-player-volume',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScAudioPlayerVolume {
  readonly player = inject(SC_AUDIO_PLAYER);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly iconButtonClass = cn(
    buttonVariants({ variant: 'ghost', size: 'sm' }),
    'size-7 rounded-full',
  );

  protected readonly class = computed(() =>
    cn('flex items-center justify-center gap-2', this.classInput()),
  );

  protected onMaxVolume(): void {
    this.player.setVolume(1);
  }
}
