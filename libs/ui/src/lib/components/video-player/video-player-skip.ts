import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScVideoPlayer } from './video-player';

/** Skips by its seconds (`[scVideoPlayerSkip]="-10"`). Write its icon and name it ("Back 10 seconds"). */
@Directive({
  selector: 'button[scVideoPlayerSkip]',
  host: {
    type: 'button',
    'data-slot': 'video-player-skip',
    '[class]': 'class()',
    '(click)': 'player.seekBy(seconds())',
  },
})
export class ScVideoPlayerSkip {
  private readonly buttonStyles = injectPreset().button;

  protected readonly player = inject(ScVideoPlayer);

  readonly seconds = input.required<number>({ alias: 'scVideoPlayerSkip' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // Over the video: white.
      'text-white hover:bg-white/15 hover:text-white dark:hover:bg-white/15 aria-pressed:bg-white/20',
      // On a small player with a center, its place is the center, not the
      // bar; on a wide one, the bar, not the center.
      'in-data-[slot=video-player-bar]:group-has-[[data-slot=video-player-center]]/video:@max-xl/video:hidden in-data-[slot=video-player-center]:@xl/video:hidden',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerSkip');
  }
}
