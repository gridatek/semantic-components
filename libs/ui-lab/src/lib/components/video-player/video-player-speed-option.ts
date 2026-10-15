import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_VIDEO_PLAYER } from './video-player';

/**
 * A playback speed (`[scVideoPlayerSpeedOption]="1.5"`), in your speed menu:
 * sets it (`aria-pressed` when it is the player's). Write its text ("1.5×").
 */
@Directive({
  selector: 'button[scVideoPlayerSpeedOption]',
  host: {
    type: 'button',
    'data-slot': 'video-player-speed-option',
    '[attr.aria-pressed]': 'pressed()',
    '(click)': 'player.setPlaybackRate(speed())',
    '[class]': 'class()',
  },
})
export class ScVideoPlayerSpeedOption {
  protected readonly player = inject(SC_VIDEO_PLAYER);

  readonly speed = input.required<number>({
    alias: 'scVideoPlayerSpeedOption',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly pressed = computed(
    () => this.player.playbackRate() === this.speed(),
  );

  protected readonly class = computed(() =>
    cn(
      'hover:bg-accent focus-visible:ring-ring/50 w-full rounded-md px-3 py-1 text-start text-sm outline-none focus-visible:ring-3 aria-pressed:bg-accent',
      this.classInput(),
    ),
  );
}
