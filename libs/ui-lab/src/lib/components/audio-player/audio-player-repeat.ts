import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { ScAudioPlayer } from './audio-player';

/** Repeat: off, all, one — in turn; pressed while on. Write its icon and its name from `player.repeat()` ("Repeat: all"). */
@Directive({
  selector: 'button[scAudioPlayerRepeat]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-repeat',
    '[attr.aria-pressed]': "player.repeat() !== 'off'",
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
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
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
