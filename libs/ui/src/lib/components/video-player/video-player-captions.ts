import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScVideoPlayer } from './video-player';

/** Captions on or off, pressed while on; disabled without a track. Write its icon and name it ("Captions"). */
@Directive({
  selector: 'button[scVideoPlayerCaptions]',
  host: {
    type: 'button',
    'data-slot': 'video-player-captions',
    '[attr.aria-pressed]': 'player.captions() !== null',
    '[disabled]': '!player.tracks().length',
    '[class]': 'class()',
    '(click)': 'player.toggleCaptions()',
  },
})
export class ScVideoPlayerCaptions {
  private readonly buttonStyles = injectPreset().button;

  protected readonly player = inject(ScVideoPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      // Over the video: white.
      'text-white hover:bg-white/15 hover:text-white dark:hover:bg-white/15 aria-pressed:bg-white/20',
      // On a small player with a top bar, its place is the top bar, not the bar.
      'in-data-[slot=video-player-bar]:group-has-[[data-slot=video-player-top]]/video:@max-xl/video:hidden',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerCaptions');
  }
}
