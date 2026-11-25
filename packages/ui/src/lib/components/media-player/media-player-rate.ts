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
 * A speed: `[scMediaPlayerRate]="1.5"`, pressed while it plays at it. Your text ("1.5×"); a row of them in a group named "Speed". Steps aside on a small player.
 */
@Directive({
  selector: 'button[scMediaPlayerRate]',
  host: {
    type: 'button',
    'data-slot': 'media-player-rate',
    '[attr.aria-pressed]': 'player.playbackRate() === rate()',
    '(click)': 'player.playbackRate.set(rate())',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerRate {
  private readonly buttonStyles = injectStyle().button;
  private readonly player = inject(ScMediaPlayer);

  readonly rate = input.required<number>({ alias: 'scMediaPlayerRate' });
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
    ɵwarnIfUnnamed('scMediaPlayerRate');
  }
}
