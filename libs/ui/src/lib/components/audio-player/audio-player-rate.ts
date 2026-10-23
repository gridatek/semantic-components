import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { cn } from '../../utils/cn/cn';
import { type ScButtonVariants } from '../button/button';
import { ScAudioPlayer } from './audio-player';

/** Plays at its speed (`[scAudioPlayerRate]="1.5"`), pressed while it is the one. Write its text ("1.5×"). */
@Directive({
  selector: 'button[scAudioPlayerRate]',
  host: {
    type: 'button',
    'data-slot': 'audio-player-rate',
    '[attr.aria-pressed]': 'player.playbackRate() === rate()',
    '[class]': 'class()',
    '(click)': 'player.playbackRate.set(rate())',
  },
})
export class ScAudioPlayerRate {
  private readonly buttonStyles = injectPreset().button;

  protected readonly player = inject(ScAudioPlayer);

  readonly rate = input.required<number>({
    alias: 'scAudioPlayerRate',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scAudioPlayerRate');
  }
}
