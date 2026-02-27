import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import {
  SiVolume1Icon,
  SiVolume2Icon,
  SiVolumeXIcon,
} from '@semantic-icons/lucide-icons';
import { buttonVariants, cn, ScSlider } from '@semantic-components/ui';
import { SC_AUDIO_PLAYER } from './audio-player';

@Component({
  selector: 'div[scAudioPlayerVolume]',
  imports: [SiVolumeXIcon, SiVolume1Icon, SiVolume2Icon, ScSlider],
  template: `
    <button
      type="button"
      (click)="player.toggleMute()"
      [class]="muteButtonClass"
      [attr.aria-label]="player.isMuted() ? 'Unmute' : 'Mute'"
    >
      @if (player.isMuted() || player.volume() === 0) {
        <svg siVolumeXIcon class="pointer-events-none size-4"></svg>
      } @else if (player.volume() < 0.5) {
        <svg siVolume1Icon class="pointer-events-none size-4"></svg>
      } @else {
        <svg siVolume2Icon class="pointer-events-none size-4"></svg>
      }
    </button>
    <input
      scSlider
      class="w-24"
      min="0"
      max="1"
      step="0.01"
      aria-label="Volume"
      [value]="player.volume()"
      [style.--fill-percent]="player.volume() * 100 + '%'"
      (input)="onVolumeChange($event)"
    />
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

  protected readonly muteButtonClass = cn(
    buttonVariants({ variant: 'ghost', size: 'icon' }),
    'rounded-full',
  );

  protected readonly class = computed(() =>
    cn('flex items-center justify-center gap-2', this.classInput()),
  );

  protected onVolumeChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.player.setVolume(value);
  }
}
