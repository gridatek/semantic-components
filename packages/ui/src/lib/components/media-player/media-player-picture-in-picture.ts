import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { ScMediaPlayer } from './media-player';
import {
  scMediaPlayerButtonClass,
  scMediaPlayerSmall,
} from './media-player-button';

/**
 * The video in a window of its own, over the others (pressed while there). Your icon and its name ("Picture in picture"). Steps aside on a small player; none for audio.
 */
@Directive({
  selector: 'button[scMediaPlayerPictureInPicture]',
  host: {
    type: 'button',
    'data-slot': 'media-player-picture-in-picture',
    '[attr.aria-pressed]': 'player.pictureInPicture()',
    '(click)': 'player.togglePictureInPicture()',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerPictureInPicture {
  private readonly buttonStyles = injectStyle().button;
  private readonly player = inject(ScMediaPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      scMediaPlayerButtonClass(this.player.kind()),
      this.player.kind() === 'audio'
        ? 'hidden'
        : scMediaPlayerSmall(this.player.kind()),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerPictureInPicture');
  }
}
