import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScVideoPlayer } from './video-player';

/** Picture-in-picture, pressed while in it. Write its icon and name it ("Picture in picture"). */
@Directive({
  selector: 'button[scVideoPlayerPictureInPicture]',
  host: {
    type: 'button',
    'data-slot': 'video-player-picture-in-picture',
    '[attr.aria-pressed]': 'player.pictureInPicture()',
    '[class]': 'class()',
    '(click)': 'player.togglePictureInPicture()',
  },
})
export class ScVideoPlayerPictureInPicture {
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
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scVideoPlayerPictureInPicture');
  }
}
