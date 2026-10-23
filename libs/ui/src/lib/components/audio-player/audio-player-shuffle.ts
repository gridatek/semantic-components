import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScAudioPlayer } from './audio-player';

/** Shuffles the playlist, pressed while shuffled. Write its icon and name it ("Shuffle"). */
@Directive({
  selector: 'button[scAudioPlayerShuffle]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-shuffle',
    '[attr.aria-pressed]': 'player.shuffle()',
    '[class]': 'class()',
    '(click)': 'player.shuffle.set(!player.shuffle())',
  },
})
export class ScAudioPlayerShuffle {
  private readonly buttonStyles = injectPreset().button;

  protected readonly player = inject(ScAudioPlayer);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerShuffle');
  }
}
