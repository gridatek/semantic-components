import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { ScMediaPlayer } from './media-player';
import { scMediaPlayerButtonClass } from './media-player-button';

/**
 * Captions on (the last ones shown, or the first) or off — pressed while shown; disabled without any. Your icon and its name ("Captions").
 */
@Directive({
  selector: 'button[scMediaPlayerCaptions]',
  host: {
    type: 'button',
    'data-slot': 'media-player-captions',
    '[attr.aria-pressed]': 'player.captions() !== null',
    '[disabled]': '!player.tracks().length',
    '(click)': 'player.toggleCaptions()',
    '[class]': 'class()',
  },
})
export class ScMediaPlayerCaptions {
  private readonly buttonStyles = injectStyle().button;
  private readonly player = inject(ScMediaPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      scMediaPlayerButtonClass(this.player.kind()),
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scMediaPlayerCaptions');
  }
}
