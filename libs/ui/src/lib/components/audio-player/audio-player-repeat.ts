import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScAudioPlayer } from './audio-player';

/**
 * Repeat: off, all, one — in turn. Three states, not a toggle button
 * (`aria-pressed` has two): write its icon and its name from `player.repeat()`
 * ("Repeat: all"); `data-state` is the mode, for styling.
 */
@Directive({
  selector: 'button[scAudioPlayerRepeat]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-repeat',
    '[attr.data-state]': 'player.repeat()',
    '[class]': 'class()',
    '(click)': 'cycle()',
  },
})
export class ScAudioPlayerRepeat {
  private readonly buttonStyles = injectPreset().button;

  protected readonly player = inject(ScAudioPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'data-[state=all]:bg-accent data-[state=all]:text-accent-foreground data-[state=one]:bg-accent data-[state=one]:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerRepeat');
  }

  protected cycle(): void {
    const order = ['off', 'all', 'one'] as const;
    const at = order.indexOf(this.player.repeat());
    this.player.repeat.set(order[(at + 1) % order.length]);
  }
}
