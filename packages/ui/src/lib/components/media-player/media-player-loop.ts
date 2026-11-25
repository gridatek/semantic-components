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
 * Plays again from the start when it ends (pressed while on). Your icon and its name ("Loop"). Steps aside on a small player.
 */
@Directive({
  selector: 'button[scMediaPlayerLoop]',
  host: {
    type: 'button',
    'data-slot': 'media-player-loop',
    '[attr.aria-pressed]': 'player.loop()',
    '(click)': 'player.loop.set(!player.loop())',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerLoop {
  private readonly buttonStyles = injectStyle().button;
  private readonly player = inject(ScMediaPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      scMediaPlayerButtonClass(this.player.kind()),
      scMediaPlayerSmall(this.player.kind(), 'medium'),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerLoop');
  }
}
