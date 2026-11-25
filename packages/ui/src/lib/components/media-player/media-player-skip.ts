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
 * Jumps by its seconds: `[scMediaPlayerSkip]="-10"` back, `10` forward. Your icon and its name ("Back 10 seconds"). Steps aside on a small player.
 */
@Directive({
  selector: 'button[scMediaPlayerSkip]',
  host: {
    type: 'button',
    'data-slot': 'media-player-skip',
    '(click)': 'player.seekBy(seconds())',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerSkip {
  private readonly buttonStyles = injectStyle().button;
  private readonly player = inject(ScMediaPlayer);

  readonly seconds = input.required<number>({ alias: 'scMediaPlayerSkip' });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      scMediaPlayerButtonClass(this.player.kind()),
      scMediaPlayerSmall(this.player.kind()),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerSkip');
  }
}
