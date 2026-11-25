import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { ScMediaPlayer } from './media-player';
import { scMediaPlayerButtonClass } from './media-player-button';

/**
 * The player full screen (pressed while it is). Your icon (`player.fullscreen()`) and its name ("Fullscreen"). None for audio.
 */
@Directive({
  selector: 'button[scMediaPlayerFullscreen]',
  host: {
    type: 'button',
    'data-slot': 'media-player-fullscreen',
    '[attr.aria-pressed]': 'player.fullscreen()',
    '(click)': 'player.toggleFullscreen()',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerFullscreen {
  private readonly buttonStyles = injectStyle().button;
  private readonly player = inject(ScMediaPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      scMediaPlayerButtonClass(this.player.kind()),
      this.player.kind() === 'audio' && 'hidden',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerFullscreen');
  }
}
