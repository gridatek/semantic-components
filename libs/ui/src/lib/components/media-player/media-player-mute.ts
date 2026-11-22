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
 * Mutes and unmutes (pressed while muted). Your icon (`player.muted()`) and its name ("Mute"). Over a small video, it steps aside — the device's buttons are there.
 */
@Directive({
  selector: 'button[scMediaPlayerMute]',
  host: {
    type: 'button',
    'data-slot': 'media-player-mute',
    '[attr.aria-pressed]': 'player.muted()',
    '(click)': 'player.muted.set(!player.muted())',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerMute {
  private readonly buttonStyles = injectStyle().button;
  private readonly player = inject(ScMediaPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      scMediaPlayerButtonClass(this.player.kind()),
      this.player.kind() === 'video' && scMediaPlayerSmall(this.player.kind()),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerMute');
  }
}
