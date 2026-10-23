import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScVideoPlayer } from './video-player';

/** Plays at its speed (`[scVideoPlayerRate]="1.5"`), pressed while it is the one. Write its text ("1.5×"). */
@Directive({
  selector: 'button[scVideoPlayerRate]',
  host: {
    type: 'button',
    'data-slot': 'video-player-rate',
    '[attr.aria-pressed]': 'player.playbackRate() === rate()',
    '[class]': 'class()',
    '(click)': 'player.playbackRate.set(rate())',
  },
})
export class ScVideoPlayerRate {
  private readonly buttonStyles = injectPreset().button;

  protected readonly player = inject(ScVideoPlayer);

  readonly rate = input.required<number>({ alias: 'scVideoPlayerRate' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // Over the video: white.
      'text-white hover:bg-white/15 hover:text-white dark:hover:bg-white/15 aria-pressed:bg-white/20',
      // Not on a small player, as in other players.
      '@max-xl/video:hidden',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerRate');
  }
}
